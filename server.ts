/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Shared server-side initialization for Gemini SDK
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('La chiave GEMINI_API_KEY non è configurata. Per favore configurala nel pannello Secrets.');
    }
    geminiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// REST endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Evaluate essay writing endpoint
app.post('/api/gemini/evaluate-writing', async (req, res) => {
  try {
    const { promptTitle, instructions, userText, minWords, maxWords, sourcePromptText } = req.body;

    if (!userText || userText.trim().length < 10) {
      return res.status(400).json({ error: 'Il testo fornito è troppo breve per essere valutato.' });
    }

    const ai = getGeminiClient();

    const evaluationPrompt = `
Ti comporti come un esaminatore ufficiale di lingua italiana per la certificazione PLIDA B2.
La tua mansione è valutare la prova di scrittura (Scrivere) dell'utente in modo realistico, pedagogico, costruttivo e conforme ai criteri del livello B2 (Quadro comune europeo di riferimento per la conoscenza delle lingue - QCER).

**Titolo della prova**: "${promptTitle}"
**Istruzioni della prova**: "${instructions}"
**Dati/Contesto forniti**:
"${sourcePromptText}"

**Testo scritto dall'utente da valutare**:
"""
${userText}
"""

Valuta la prova assegnando un punteggio complessivo da 0 a 30 punti (il punteggio minimo per superare ciascuna abilità PLIDA è 18/30).
La valutazione deve analizzare esattamente i seguenti 4 parametri ufficiali:
1. **Ortografia e Morfosintassi** (punteggio 0-7): Correttezza delle regole grammaticali, uso corretto dei tempi e modi (passato prossimo, imperfetto, condizionale, congiuntivo) e accordi di genere/numero.
2. **Lessico** (punteggio 0-7): Ricchezza, varietà e appropriatezza delle parole, idiomi ed espressioni coerenti con il livello B2.
3. **Coerenza e Coesione** (punteggio 0-7): Sviluppo logico dei paragrafi, continuità delle frasi e uso dei connettivi testuali appropriati (tuttavia, d'altronde, a patto che, prima di tutto).
4. **Efficacia comunicativa** (punteggio 0-9): Compimento di tutte le richieste della consegna, registro appropriato e fluidità complessiva del testo scritto per un target specifico.

Fornisci la tua risposta *esclusivamente* in formato JSON valido, senza includere markdown aggiuntivi (come \`\`\`json ... \`\`\`), che abbia esattamente la seguente struttura:
{
  "score": 24,
  "criteriaScores": {
    "ortografiaMorfosintassi": 5,
    "lessico": 6,
    "coerenzaCoesione": 6,
    "efficaciaComunicativa": 7
  },
  "overallEvaluation": "Testo molto ben strutturato che risponde a tutti i requisiti della consegna. Dimostra una padronanza matura del lessico...",
  "sentenceCorrections": [
    {
      "original": "la frase scorretta scritta dal utente",
      "correction": "la frase corretta scritta correttamente",
      "explanation": "Spiegazione in italiano semplice sul perché era sbagliata e quale regola B2 si applica."
    }
  ],
  "polishedVersion": "La versione riscritta per intero in perfetto ed elegante italiano di livello B2/C1, mantenendo l'intento originale e le idee dell'utente."
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: evaluationPrompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const outputText = response.text || '';
    // Let's strip any markdown code blocks if the model accidentally outputted them
    let cleanedOutput = outputText.trim();
    if (cleanedOutput.startsWith('```')) {
      cleanedOutput = cleanedOutput.replace(/^```json\s*/i, '').replace(/```\s*$/, '');
    }

    const evaluationJSON = JSON.parse(cleanedOutput);
    res.json(evaluationJSON);

  } catch (error: any) {
    console.error('Error during writing evaluation:', error);
    res.status(500).json({ error: error.message || 'Errore durante la valutazione della scrittura con l\'AI.' });
  }
});

// Evaluate speech speaking endpoint
app.post('/api/gemini/evaluate-speaking', async (req, res) => {
  try {
    const { taskTitle, instructions, context, transcript, bullets } = req.body;

    if (!transcript || transcript.trim().length < 10) {
      return res.status(400).json({ error: 'La trascrizione vocale è assente o insufficiente per una valutazione parlata.' });
    }

    const ai = getGeminiClient();

    const evaluationPrompt = `
Ti comporti come un esaminatore ufficiale di lingua italiana per la prova orale (Parlare) del PLIDA livello B2.
L'utente ha registrato una simulazione o ha scritto la sua bozza parlata per il seguente esercizio B2:

**Titolo esercizio**: "${taskTitle}"
**Istruzioni**: "${instructions}"
**Contesto d'uso**: "${context}"
**Punti chiave richiesti**: ${JSON.stringify(bullets)}

**Trascrizione del parlato o bozza dell'utente**:
"""
${transcript}
"""

Valuta questa trascrizione orale in base agli standard PLIDA B2 per l'esame orale (punteggio complessivo da 0 a 30):
- Interazione pragmatica e fluidità di parola (B2 richiede la capacità di argomentare spontaneamente, rispondere a obiezioni e difendere punti di vista).
- Grammatica orale (concordi veloci, tempi passati, condizionali).
- Precisione di pronuncia/flusso lessicale.

Fornisci la tua risposta *esclusivamente* in formato JSON valido, senza includere markdown aggiuntivi (come \`\`\`json ... \`\`\`), che abbia esattamente la seguente struttura:
{
  "score": 22,
  "overallEvaluation": "Una buona prestazione orale. L'argomentazione a sostegno del corso è fluida e rispetta la richiesta di persuadere il capo, sebbene con lievi incertezze...",
  "correctnessPercentage": 80,
  "linguisticCritique": "Ottimo flusso e tono appropriato per l'ambiente aziendale. Cerca di arricchire l'uso di connettori avanzati per elevare ulteriormente il livello e gestire meglio le pause.",
  "lexicalSuggestions": [
    "Invece di ripetere 'buono', usa sinonimi come 'vantaggioso', 'redditizio', o 'proficuo'."
  ],
  "grammaticalFixes": [
    {
      "original": "frase con errore grammaticale o di intonazione testuale",
      "correction": "versione corretta per l'orale",
      "explanation": "Perché questa forma suona più naturale ed è grammaticalmente conforme al livello B2."
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: evaluationPrompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const outputText = response.text || '';
    let cleanedOutput = outputText.trim();
    if (cleanedOutput.startsWith('```')) {
      cleanedOutput = cleanedOutput.replace(/^```json\s*/i, '').replace(/```\s*$/, '');
    }

    const evaluationJSON = JSON.parse(cleanedOutput);
    res.json(evaluationJSON);

  } catch (error: any) {
    console.error('Error during speaking evaluation:', error);
    res.status(500).json({ error: error.message || 'Errore durante la valutazione della prova orale con l\'AI.' });
  }
});

// Support for Google Search Console HTML File Verification method natively
app.get('/google:verificationId.html', (req, res) => {
  const { verificationId } = req.params;
  res.type('html');
  res.send(`google-site-verification: google${verificationId}.html`);
});

// Vite middleware flow
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
