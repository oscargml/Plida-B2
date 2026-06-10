/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { parlarePrompts } from '../data';
import { AISpeakingFeedback } from '../types';
import { Mic, MicOff, AlertCircle, ArrowLeft, RefreshCw, Send, CheckCircle2, Award, Clipboard, Play, StopCircle, ChevronRight } from 'lucide-react';

interface ParlareSectionViewProps {
  onBack: () => void;
  savedFeedback: { [key: string]: AISpeakingFeedback };
  onSaveFeedback: (promptId: string, feedback: AISpeakingFeedback) => void;
}

export default function ParlareSectionView({ onBack, savedFeedback, onSaveFeedback }: ParlareSectionViewProps) {
  const [activePromptIdx, setActivePromptIdx] = useState<number>(0);
  const [transcript, setTranscript] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evalError, setEvalError] = useState<string | null>(null);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);

  const prompt = parlarePrompts[activePromptIdx];
  const recognitionRef = useRef<any>(null);

  // Stop recording when prompt changes
  useEffect(() => {
    stopRecording();
    setTranscript('');
    setEvalError(null);
    setRecognitionError(null);
  }, [activePromptIdx]);

  // Clean speech synthesis or recognition on unmount
  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  const startRecording = () => {
    setRecognitionError(null);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setRecognitionError(
        'Il riconoscimento vocale non è supportato su questo browser. Puoi digitare la tua bozza o il log del discorso nella casella di testo sottostante.'
      );
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'it-IT'; // Strictly listen in Italian

      rec.onstart = () => {
        setIsRecording(true);
      };

      rec.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          }
        }
        if (finalTranscript !== '') {
          setTranscript((prev) => prev + finalTranscript);
        }
      };

      rec.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setRecognitionError('Permesso del microfono negato. Concedi l\'accesso nelle impostazioni del browser.');
        } else {
          setRecognitionError(`Errore di riconoscimento vocale: ${event.error}`);
        }
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (err: any) {
      console.error(err);
      setRecognitionError('Impossibile iniziare la cattura del microfono.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  const handleEvaluateSpeaking = async () => {
    if (!transcript || transcript.trim().length < 15) {
      setEvalError('La trascrizione vocale o bozza è troppo breve per essere valutata. Di\' almeno due frasi in italiano!');
      return;
    }

    setEvalError(null);
    setIsEvaluating(true);

    try {
      const response = await fetch('/api/gemini/evaluate-speaking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskTitle: prompt.title,
          instructions: prompt.instructions,
          context: prompt.context,
          transcript: transcript,
          bullets: prompt.bullets,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Errore di risposta del server.');
      }

      const feedbackData: AISpeakingFeedback = await response.json();
      onSaveFeedback(prompt.id, feedbackData);

    } catch (err: any) {
      console.error(err);
      setEvalError(err.message || 'Errore durante la connessione con l\'esaminatore virtuale.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const currentFeedback = savedFeedback[prompt.id];  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in" id="parlare-view-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 pb-4" id="parlare-header">
        <div className="space-y-1.5">
          <button 
            onClick={onBack}
            className="text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer transition-colors uppercase tracking-wider"
            id="back-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Torna al menu principale
          </button>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight" id="parlare-title">
            Sezione: Parlare (Produzione e Interazione Orale)
          </h2>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl self-start border border-slate-200" id="parlare-tabs">
          {parlarePrompts.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePromptIdx(idx);
                setEvalError(null);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activePromptIdx === idx
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              id={`tab-select-${p.id}`}
            >
              Compito {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Intro prompt guidelines split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="speaker-grid">
        
        {/* GUIDELINES SIDEBAR */}
        <div className="lg:col-span-5 space-y-4" id="speaking-guidelines-sidebar">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4" id="speaking-task-card">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm border-b border-slate-100 pb-2">
              <Clipboard className="w-5 h-5 text-indigo-500" />
              <span>CANDIDATO &bull; CONSEGNA ORALE</span>
            </div>

            <h3 className="text-base font-bold text-slate-900 leading-snug font-sans">
              {prompt.title}
            </h3>

            <div className="space-y-2 p-3.5 bg-slate-50 border border-slate-150 rounded-xl text-xs text-slate-600" id="speaking-rules-box">
              <div className="font-extrabold text-slate-800">Contesto Comunicativo:</div>
              <p className="leading-relaxed">{prompt.context}</p>
            </div>

            {/* Bullets items requirements */}
            <div className="space-y-2.5" id="bullets-container">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cosa devi includere nel discorso:</div>
              <ul className="space-y-2">
                {prompt.bullets.map((b, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5" id={`bullet-${i}`}>
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span className="leading-normal">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 bg-indigo-50 text-[11px] text-indigo-800/95 rounded-xl border border-indigo-100 flex items-start gap-1.5">
              <AlertCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">Consiglio: Tenta di usare locuzioni formali, accordare pronomi e mostrare sottomissione educata o opposizione formale B2.</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE RECORDER AND TEXT BOX */}
        <div className="lg:col-span-7 space-y-4" id="speech-capture-main">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-5" id="speaking-recorder-card">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5 block">
              Assistente e Microfono Orale
            </div>

            {/* Mic block */}
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-350 text-center space-y-3.5" id="mic-recorder-box">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md shadow-indigo-100 hover:scale-105 active:scale-95 transition-all outline-none"
                  id="record-mic-start-btn"
                >
                  <Mic className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="w-14 h-14 bg-slate-900 hover:bg-slate-800 text-indigo-400 rounded-full flex items-center justify-center cursor-pointer shadow-lg animate-pulse outline-none"
                  id="record-mic-stop-btn"
                >
                  <StopCircle className="w-5 h-5" />
                </button>
              )}

              <div className="space-y-1">
                <div className="text-sm font-bold text-slate-800">
                  {isRecording ? 'Registratore Attivo - Parla in Italiano!' : 'Clicca per Registrare'}
                </div>
                <p className="text-xs text-slate-550 leading-normal max-w-xs mx-auto mt-1">
                  Se hai già un discorso scritto o preferisci digitarlo, puoi utilizzare la casella di testo sottostante in qualsiasi momento.
                </p>
              </div>
            </div>

            {/* Error notifications speech */}
            {recognitionError && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs italic leading-relaxed" id="rec-error-msg">
                {recognitionError}
              </div>
            )}

            {/* Live Text Area transcript representation */}
            <div className="space-y-1.5" id="transcript-editor-box">
              <label className="text-xs font-bold text-slate-605 block">
                Trascrizione Live o Bozza del Discorso:
              </label>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="La trascrizione del tuo microfono o la tua bozza inserita apparirà qui..."
                className="w-full h-44 p-3 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-xs leading-relaxed outline-none transition-all resize-none font-sans"
                id="speaking-transcript-textarea"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Lunghezza stimata: {transcript.trim().split(/\s+/).filter(Boolean).length} parole</span>
                <button 
                  onClick={() => setTranscript('')} 
                  className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-bold cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3 h-3" /> Cancella Testo
                </button>
              </div>
            </div>

            {evalError && (
              <div className="p-3 bg-rose-50 border border-rose-250 text-xs text-rose-750 rounded-xl" id="speaking-eval-error">
                {evalError}
              </div>
            )}

            {/* Evaluate oral speech prompt */}
            <button
              disabled={isEvaluating || transcript.trim().length < 15}
              onClick={handleEvaluateSpeaking}
              className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                transcript.trim().length >= 15 && !isEvaluating
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
              id="parlare-evaluate-btn"
            >
              {isEvaluating ? (
                <>
                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-white rounded-full animate-spin" />
                  Valutazione Orale AI in corso...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Invia all'esaminatore virtuale PLIDA B2
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* FEEDBACK EVALUATION */}
      {currentFeedback && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-fade-in" id="speaking-results-performance">
          <div className="flex items-center gap-2 text-indigo-805 border-b border-slate-100 pb-3" id="speaking-results-header">
            <Award className="w-6 h-6 text-indigo-600 animate-pulse" />
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Valutazione Orale d'Esame PLIDA B2
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="speaking-layout-performance">
            {/* Absolute overall slider */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2.5">
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">PUNTEGGIO PROVA PARLARE</span>
              <div className="w-24 h-24 rounded-full border-4 border-indigo-500 flex flex-col items-center justify-center bg-white shadow-xs">
                <span className="text-3xl font-extrabold text-slate-900">{currentFeedback.score}</span>
                <span className="text-[10px] text-slate-400 font-bold border-t border-slate-100 mt-1 pt-1.5 px-2">su 30</span>
              </div>
              <div className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${
                currentFeedback.score >= 18 
                  ? 'bg-indigo-50 text-indigo-800 border-indigo-150' 
                  : 'bg-rose-50 text-rose-800 border-rose-150'
              }`}>
                {currentFeedback.score >= 18 ? 'PROVA ANCHE QUESTA SUPERATA!' : 'PROVA ORALE INSUFFICIENTE (< 18)'}
              </div>
            </div>

            {/* Details metrics */}
            <div className="md:col-span-8 space-y-4" id="speaking-stats-text">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-755">
                  <span>Fluidità Vocale & Pronuncia</span>
                  <span className="font-extrabold text-slate-900">{currentFeedback.correctnessPercentage}% idoneo</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${currentFeedback.correctnessPercentage}%` }} />
                </div>
              </div>

              <div className="bg-slate-55 p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-900">Critica Linguistica Avanzata:</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {currentFeedback.linguisticCritique}
                </p>
              </div>
            </div>
          </div>

          {/* Lexical items suggestions */}
          <div className="space-y-3" id="lexical-suggestions-container">
            <h4 className="text-sm font-bold text-slate-800">Suggerimenti lessicali consigliati per il B2:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="lexical-suggestions-list">
              {currentFeedback.lexicalSuggestions?.map((sug, sIndex) => (
                <div key={sIndex} className="p-3 bg-slate-50 border border-slate-200 hover:bg-slate-100/55 rounded-xl text-xs flex items-start gap-1.5 transition-colors" id={`sug-${sIndex}`}>
                  <span className="text-indigo-500 font-extrabold shrink-0">&raquo;</span>
                  <span className="text-slate-700 font-medium">{sug}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grammatical corrections */}
          {currentFeedback.grammaticalFixes && currentFeedback.grammaticalFixes.length > 0 && (
            <div className="space-y-3" id="oral-corrections-block">
              <h4 className="text-sm font-bold text-slate-800">Consigli Grammaticali Correttivi:</h4>
              <div className="border border-slate-200 rounded-xl divide-y divide-slate-105 overflow-hidden shadow-2xs" id="oral-corrections-table">
                {currentFeedback.grammaticalFixes.map((gf, gfIdx) => (
                  <div key={gfIdx} className="p-4 grid grid-cols-1 md:grid-cols-12 gap-3 bg-white" id={`gf-row-${gfIdx}`}>
                    <div className="md:col-span-5 space-y-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Nel tuo vocale:</div>
                      <p className="text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-2 border border-rose-100 rounded-lg">
                        "{gf.original}"
                      </p>
                    </div>
                    <div className="md:col-span-1 flex items-center justify-center text-slate-400 font-bold">
                      &rarr;
                    </div>
                    <div className="md:col-span-6 space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Esaminatore consiglia:</div>
                      <p className="text-xs font-semibold text-emerald-850 bg-emerald-50 px-3 py-2 border border-emerald-100 rounded-lg">
                        "{gf.correction}"
                      </p>
                      <p className="text-[11px] text-slate-550 italic mt-1 leading-normal">
                        📖 {gf.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
