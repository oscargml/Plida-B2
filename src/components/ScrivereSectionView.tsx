/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { scriverePrompts } from '../data';
import { AIPeedback } from '../types';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { PenTool, AlertTriangle, ArrowLeft, Send, Sparkles, Check, CheckCircle2, ChevronRight, BookOpen, Save } from 'lucide-react';
import AdPlaceholder from './AdPlaceholder';

interface ScrivereSectionViewProps {
  onBack: () => void;
  savedFeedback: { [key: string]: AIPeedback };
  onSaveFeedback: (promptId: string, feedback: AIPeedback) => void;
}

export default function ScrivereSectionView({ onBack, savedFeedback, onSaveFeedback }: ScrivereSectionViewProps) {
  const [activePromptIdx, setActivePromptIdx] = useState<number>(0);
  const [userText, setUserText] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evalError, setEvalError] = useState<string | null>(null);
  const [draftSaved, setDraftSaved] = useState<boolean>(false);

  const prompt = scriverePrompts[activePromptIdx];

  // Load draft from LocalStorage on mount/active prompt change
  useEffect(() => {
    const savedDraft = localStorage.getItem(`scrivere_draft_${prompt.id}`);
    if (savedDraft) {
      setUserText(savedDraft);
    } else {
      setUserText('');
    }
  }, [activePromptIdx, prompt.id]);

  // Handle word count calculations
  const getWordCount = (text: string) => {
    const trimmed = text.trim();
    if (trimmed === '') return 0;
    return trimmed.split(/\s+/).length;
  };

  const wordCount = getWordCount(userText);
  const isWordCountValid = wordCount >= prompt.minWords && wordCount <= prompt.maxWords;

  const saveDraft = () => {
    localStorage.setItem(`scrivere_draft_${prompt.id}`, userText);
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const currentFeedback = savedFeedback[prompt.id];

  const handleEvaluate = async () => {
    if (!userText || userText.trim().length < 20) {
      setEvalError('Il testo fornito è troppo corto per essere analizzato dall\'AI.');
      return;
    }
    setEvalError(null);
    setIsEvaluating(true);

    try {
      const response = await fetch('/api/gemini/evaluate-writing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promptTitle: prompt.title,
          instructions: prompt.instructions,
          userText: userText,
          minWords: prompt.minWords,
          maxWords: prompt.maxWords,
          sourcePromptText: prompt.sourcePromptText,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Si è verificato un errore durante la chiamata al backend.');
      }

      const feedbackData: AIPeedback = await response.json();
      onSaveFeedback(prompt.id, feedbackData);
      
    } catch (err: any) {
      console.error(err);
      setEvalError(err.message || 'Errore di connessione. Assicurati che la chiave GEMINI_API_KEY sia configurata.');
    } finally {
      setIsEvaluating(false);
    }
  };  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in" id="scrivere-view-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 pb-4" id="scrivere-header">
        <div className="space-y-1.5">
          <button 
            onClick={onBack}
            className="text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer transition-colors uppercase tracking-wider"
            id="back-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Torna al menu principale
          </button>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight" id="scrivere-title">
            Sezione: Scrivere (Produzione e Interazione Scritta)
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl self-start border border-slate-200" id="prompt-tabs">
          {scriverePrompts.map((p, idx) => (
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
              Traccia {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main content grid split (Instructions vs Essay Space) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="scrivere-grid">
        
        {/* INSTRUCTIONS COLUMN */}
        <div className="lg:col-span-5 space-y-4" id="instructions-sidebar">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4" id="scrivere-prompt-info">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs border-b border-slate-100 pb-2">
              <PenTool className="w-5 h-5 text-indigo-600" />
              <span>TESTO DI CONSEGNA</span>
            </div>
            
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {prompt.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              {prompt.instructions}
            </p>

            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 bg-indigo-50 p-3.5 rounded-xl border border-indigo-100">
              <span>Limiti ufficiali PLIDA B2:</span>
              <span className="font-extrabold text-indigo-800">{prompt.minWords} - {prompt.maxWords} parole</span>
            </div>

            {/* MILLENNIAL SURVEY CHART FOR PART 1 */}
            {prompt.id === 's1' && prompt.charts && (
              <div className="space-y-2 pt-2" id="recharts-chart-block">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5 mb-2 block">
                  Grafico: Opinioni dei Millennial (%)
                </div>
                <div className="h-[210px] w-full" id="survey-chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={prompt.charts}
                      margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} />
                      <YAxis tick={{ fontSize: 9, fill: '#64748b' }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 9, fontWeight: 'bold' }} />
                      <Bar dataKey="d_accordo" name="D'accordo" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="disaccordo" name="Disaccordo" fill="#e11d48" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-[10px] text-slate-400 italic text-center leading-normal">
                  Usa questi dati per evidenziare i fattori di crisi nel tuo articolo.
                </div>
              </div>
            )}
          </div>

          {/* Sidebar sponsor course */}
          <AdPlaceholder type="sidebar" preferredId="vhs-video-course" />
        </div>

        {/* EDITOR COLUMN */}
        <div className="lg:col-span-7 space-y-4" id="writing-main-space">
          {/* Writing Board */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4" id="essay-editor-wrapper">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Redazione Prova
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={saveDraft}
                  className="flex items-center gap-1 px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-205 cursor-pointer transition-colors"
                  id="save-draft-btn"
                >
                  <Save className="w-3.5 h-3.5 text-slate-500" />
                  {draftSaved ? 'Bozza Salvata!' : 'Salva Bozza'}
                </button>
              </div>
            </div>

            <textarea
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="Scrivi qui il tuo articolo o commento in italiano. Utilizza pronomi articolati, condizionali ed un tono costruttivo..."
              className="w-full h-80 p-4 border border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm leading-relaxed outline-none transition-all resize-none font-sans"
              id="essay-textarea-input"
            />

            {/* Counters and Alerts */}
            <div className="flex items-center justify-between text-xs sm:px-1" id="editor-counters-line">
              <div className="flex items-center gap-1.5" id="word-count-badge">
                <span className="font-medium text-slate-500">Conteggio parole:</span>
                <span className={`font-bold px-2 py-0.5 rounded-full ${
                  isWordCountValid 
                    ? 'bg-indigo-50 text-indigo-805 border border-indigo-100' 
                    : wordCount > 0 
                      ? 'bg-amber-50 text-amber-800 border border-amber-100' 
                      : 'bg-slate-100 text-slate-600'
                }`}>
                  {wordCount} parole
                </span>
              </div>

              {!isWordCountValid && wordCount > 0 && (
                <div className="flex items-center gap-1 text-amber-700 font-semibold text-[11px]" id="counter-warning">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  PLIDA B2 consigliato: {prompt.minWords} - {prompt.maxWords} parole.
                </div>
              )}
            </div>

            {/* Error notifications */}
            {evalError && (
              <div className="p-3 bg-rose-50 border border-rose-250 rounded-xl text-xs text-rose-700 flex items-start gap-2" id="evaluate-error-indicator">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{evalError}</span>
              </div>
            )}

            {/* Submit Evaluate button */}
            <button
              disabled={isEvaluating || userText.trim().length < 20}
              onClick={handleEvaluate}
              className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                userText.trim().length >= 20 && !isEvaluating
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100 hover:scale-[1.01] active:scale-[0.99]'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
              id="scrivere-evaluate-btn"
            >
              {isEvaluating ? (
                <>
                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-white rounded-full animate-spin" />
                  Correzione AI in corso...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Invia per correzione AI PLIDA B2
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* AI VALUTAZIONE (Only if evaluated) */}
      {currentFeedback && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-fade-in" id="writing-performance-board">
          <div className="flex items-center gap-2 text-indigo-805 border-b border-slate-100 pb-3" id="writing-feedback-header">
            <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Risultati di Valutazione AI PLIDA B2
            </h3>
          </div>

          {/* Core Scoreboard Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="critical-scores-layout">
            
            {/* Absolute overall circle */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2.5" id="absolute-circle-box">
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">PUNTEGGIO PLIDA</span>
              <div className="w-24 h-24 rounded-full border-4 border-indigo-500 flex flex-col items-center justify-center bg-white shadow-xs" id="circular-gauge">
                <span className="text-3xl font-extrabold text-slate-900 leading-none">{currentFeedback.score}</span>
                <span className="text-[10px] text-slate-400 font-bold border-t border-slate-100 mt-1 pt-1.5 px-2">su 30</span>
              </div>
              <div className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${
                currentFeedback.score >= 18 
                  ? 'bg-indigo-50 text-indigo-800 border-indigo-150' 
                  : 'bg-rose-50 text-rose-800 border-rose-150'
              }`}>
                {currentFeedback.score >= 18 ? 'PROVA SUPERATA!' : 'INSUFFICIENTE (< 18)'}
              </div>
            </div>

            {/* Individual criteria sliders */}
            <div className="md:col-span-8 space-y-4" id="criteria-sliders-box">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Punteggio per Criterio</div>
              
              {/* Ortografia */}
              <div className="space-y-1.5" id="criterion-morfosintassi">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Ortografia e Morfosintassi</span>
                  <span className="font-extrabold text-slate-900">{currentFeedback.criteriaScores.ortografiaMorfosintassi} / 7</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: `${(currentFeedback.criteriaScores.ortografiaMorfosintassi / 7) * 100}%` }} />
                </div>
              </div>

              {/* Lessico */}
              <div className="space-y-1.5" id="criterion-lessico">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Lessico e Varietà</span>
                  <span className="font-extrabold text-slate-900">{currentFeedback.criteriaScores.lessico} / 7</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: `${(currentFeedback.criteriaScores.lessico / 7) * 100}%` }} />
                </div>
              </div>

              {/* Coerenza */}
              <div className="space-y-1.5" id="criterion-coerenza">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Coerenza e Coesione (Connettivi)</span>
                  <span className="font-extrabold text-slate-900">{currentFeedback.criteriaScores.coerenzaCoesione} / 7</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: `${(currentFeedback.criteriaScores.coerenzaCoesione / 7) * 100}%` }} />
                </div>
              </div>

              {/* Efficacia */}
              <div className="space-y-1.5" id="criterion-efficacia">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Efficacia Comunicativa (Task)</span>
                  <span className="font-extrabold text-slate-900">{currentFeedback.criteriaScores.efficaciaComunicativa} / 9</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: `${(currentFeedback.criteriaScores.efficaciaComunicativa / 9) * 100}%` }} />
                </div>
              </div>

            </div>
          </div>

          {/* Critique and overall review text */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-205 text-sm space-y-2 text-slate-700 leading-relaxed" id="critique-overall-box">
            <h4 className="font-bold text-slate-900">Critica dell'Esaminatore AI:</h4>
            <p>{currentFeedback.overallEvaluation}</p>
          </div>

          {/* TABLE OF CORRECTIONS */}
          {currentFeedback.sentenceCorrections && currentFeedback.sentenceCorrections.length > 0 && (
            <div className="space-y-3" id="spelling-corrections-block">
              <h4 className="text-sm font-bold text-slate-800">Spiegazione delle correzioni identificate:</h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs divide-y divide-slate-100" id="corrections-table">
                {currentFeedback.sentenceCorrections.map((corr, cIdx) => (
                  <div key={cIdx} className="p-4 grid grid-cols-1 md:grid-cols-12 gap-3 bg-white" id={`corrections-row-${cIdx}`}>
                    <div className="md:col-span-5 space-y-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">La tua frase originale:</div>
                      <p className="text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-2 rounded-lg border border-rose-100 break-words leading-relaxed">
                        {corr.original}
                      </p>
                    </div>
                    <div className="md:col-span-1 flex items-center justify-center text-slate-400 font-bold" id="arrow-spacer-icon">
                      <ChevronRight className="w-4 h-4 hidden md:block" />
                    </div>
                    <div className="md:col-span-6 space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Versione corretta d'esame:</div>
                      <p className="text-xs font-semibold text-emerald-850 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 break-words leading-relaxed">
                        {corr.correction}
                      </p>
                      <p className="text-[11px] text-slate-550 italic mt-1 leading-normal">
                        💡 {corr.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* POLISHED OVERALL REWRITE */}
          <div className="space-y-3 p-5 bg-indigo-50/30 rounded-2xl border border-indigo-100" id="polished-rewrite-container">
            <h4 className="text-sm font-bold text-indigo-900 flex items-center gap-1.5">
              <BookOpen className="w-4.5 h-4.5 text-indigo-600 font-bold" />
              Versione riscritta ideale (Livello B2/C1 di riferimento):
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-serif whitespace-pre-wrap italic bg-white p-4 rounded-xl border border-indigo-100 shadow-3xs">
              "{currentFeedback.polishedVersion}"
            </p>
            <p className="text-[10px] text-slate-450 italic">
              Confronta questo testo con la tua bozza originale per assimilare parole d'accordo formali ed una coesione coerente.
            </p>
          </div>

        </div>
      )}

    </div>
  );
}
