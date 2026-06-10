/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { grammarDrills } from '../data';
import { Award, CheckCircle, XCircle, ArrowLeft, ArrowRight, RefreshCw, Flame, HelpCircle, GraduationCap, Bookmark, Check, Plus } from 'lucide-react';
import AdPlaceholder from './AdPlaceholder';
import { VocabularyWord } from '../types';

interface GrammaticaSectionViewProps {
  onBack: () => void;
  streak: number;
  onUpdateStreak: (newStreak: number) => void;
  onDrillResult: (isCorrect: boolean) => void;
  onAddWord: (word: Omit<VocabularyWord, 'id' | 'dateAdded'>) => void;
}

export default function GrammaticaSectionView({ onBack, streak, onUpdateStreak, onDrillResult, onAddWord }: GrammaticaSectionViewProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [successStreak, setSuccessStreak] = useState<number>(streak);

  // Vocabulary quick-save states
  const [vocabWord, setVocabWord] = useState<string>('');
  const [vocabTranslation, setVocabTranslation] = useState<string>('');
  const [vocabSuccess, setVocabSuccess] = useState<boolean>(false);
  const [showVocabSaver, setShowVocabSaver] = useState<boolean>(false);

  const drill = grammarDrills[currentIndex];

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    // Auto populate the word field with the clicked option for extra convenience
    setVocabWord(opt);
  };

  const handleAnswerSubmit = () => {
    if (!selectedOption || isAnswered) return;
    setIsAnswered(true);

    const isCorrect = selectedOption === drill.correctAnswer;
    onDrillResult(isCorrect);

    if (isCorrect) {
      const nextStreak = successStreak + 1;
      setSuccessStreak(nextStreak);
      onUpdateStreak(nextStreak);
    } else {
      setSuccessStreak(0);
      onUpdateStreak(0);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    setCurrentIndex((prev) => (prev + 1) % grammarDrills.length);
    setVocabWord('');
    setVocabTranslation('');
    setVocabSuccess(false);
    setShowVocabSaver(false);
  };

  const handleQuickSaveVocab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vocabWord.trim() || !vocabTranslation.trim()) return;

    // Build sentence context by filling in the blank with the correct answer
    const completedContext = drill.sentence.replace('________', `[${drill.correctAnswer}]`);

    onAddWord({
      word: vocabWord.trim(),
      translation: vocabTranslation.trim(),
      context: completedContext,
      notes: `Trovato nella Palestra di Grammatica (Categoria: ${drill.category}).`
    });

    setVocabSuccess(true);
    setTimeout(() => {
      setVocabSuccess(false);
      setVocabWord('');
      setVocabTranslation('');
      setShowVocabSaver(false);
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in" id="grammatica-view-container">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4" id="grammatica-header">
        <div className="space-y-1.5">
          <button 
            onClick={onBack}
            className="text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer transition-colors uppercase tracking-wider"
            id="back-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Torna al menu principale
          </button>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight" id="grammatica-title">
            Palestra di Grammatica B2
          </h2>
        </div>

        {/* Streak Flame */}
        <div className="flex items-center gap-1 bg-rose-50 border border-rose-100 text-rose-600 font-bold px-3 py-1.5 rounded-xl text-xs shadow-3xs animate-slide-down" id="streak-flame">
          <Flame className="w-4 h-4 animate-bounce text-rose-500" />
          <span>{successStreak} streak</span>
        </div>
      </div>

      {/* Intro info bar */}
      <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 flex items-start gap-3.5 text-xs text-indigo-800 shadow-xs" id="gym-intro-box">
        <GraduationCap className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Benvenuto nella palestra grammaticale! Qui affronti esercizi di <strong>completamento frasi</strong> focalizzati sulle criticità tipiche del PLIDA B2 (congiuntivi, pronomi, periodo ipotetico). Rispondi correttamente per far salire la tua striscia!
        </p>
      </div>

      {/* Interactive Drill Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6" id="active-drill-card">
        
        {/* Category Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest" id="drill-meta">
          <span>Domanda {currentIndex + 1} di {grammarDrills.length}</span>
          <span className="bg-indigo-50 text-indigo-800 border border-indigo-100 px-2.5 py-0.5 rounded-md font-extrabold">
            {drill.category}
          </span>
        </div>

        {/* The interactive text prompt */}
        <div className="py-4 text-center" id="prompt-sentence-block">
          <h3 className="text-lg font-bold text-slate-900 leading-normal max-w-md mx-auto" id="sentence-prompt">
            {drill.sentence}
          </h3>
        </div>

        {/* Options list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="options-selector-grid">
          {drill.options.map((opt) => {
            const isSelected = selectedOption === opt;
            const isCorrectAnswer = opt === drill.correctAnswer;

            return (
              <button
                key={opt}
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt)}
                className={`text-left p-3.5 rounded-xl border font-semibold text-xs transition-all cursor-pointer ${
                  isAnswered
                    ? isCorrectAnswer
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold'
                      : isSelected
                        ? 'bg-rose-100 border-rose-400 text-rose-950 font-medium'
                        : 'bg-slate-50/50 border-slate-200 text-slate-400'
                    : isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100'
                      : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200 text-slate-755'
                }`}
                id={`drill-opt-${opt}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Evaluation and Correct Explanation */}
        {isAnswered && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs leading-relaxed space-y-2 animate-slide-down" id="drill-explanation-panel">
            <div className="flex items-center gap-1 font-extrabold text-sm" id="drill-outcome-indicator">
              {selectedOption === drill.correctAnswer ? (
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Esatto! Complimenti.
                </span>
              ) : (
                <span className="text-rose-700 flex items-center gap-1">
                  <XCircle className="w-4 h-4" /> Errato. Risposta corretta: {drill.correctAnswer}
                </span>
              )}
            </div>
            
            <div className="text-slate-700 font-medium space-y-1.5" id="rule-desc">
              <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-500" /> Spiegazione della regola:
              </span>
              <p className="italic text-slate-600 leading-relaxed pl-4 border-l-2 border-slate-300">
                {drill.explanation}
              </p>
            </div>
          </div>
        )}

        {/* Vocabulary Bank Quick-Save widget */}
        <div className="border-t border-slate-100 pt-4" id="drill-quick-vocab-saver">
          {!showVocabSaver ? (
            <button
              onClick={() => {
                setShowVocabSaver(true);
                if (!vocabWord) {
                  setVocabWord(drill.correctAnswer);
                }
              }}
              className="text-xs text-slate-500 hover:text-indigo-600 font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5" /> Salva un vocabolo difficile di questa frase nel tuo Vocabolario
            </button>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 animate-fade-in text-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-700 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                  <Bookmark className="w-3.5 h-3.5 text-indigo-600" /> Aggiunta Rapida Vocabolario
                </span>
                <button 
                  onClick={() => setShowVocabSaver(false)}
                  className="text-[10px] text-slate-400 font-bold hover:text-slate-650"
                >
                  Annulla
                </button>
              </div>

              {vocabSuccess ? (
                <div className="p-2 py-3 bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-lg text-center font-bold flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" /> Salvato con successo nel tuo Vocabolario!
                </div>
              ) : (
                <form onSubmit={handleQuickSaveVocab} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-0.5">
                      <label className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Parola *</label>
                      <input
                        type="text"
                        required
                        placeholder="Es: Spiacevole"
                        value={vocabWord}
                        onChange={(e) => setVocabWord(e.target.value)}
                        className="w-full p-2 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 font-semibold text-xs"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Definizione/Traduzione *</label>
                      <input
                        type="text"
                        required
                        placeholder="Es: Unpleasant, disagreeable"
                        value={vocabTranslation}
                        onChange={(e) => setVocabTranslation(e.target.value)}
                        className="w-full p-2 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 font-semibold text-xs"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[9px] text-slate-400 max-w-[70%] leading-tight italic">
                      Verrà salvato con la frase contesto originale.
                    </span>
                    <button
                      type="submit"
                      disabled={!vocabWord.trim() || !vocabTranslation.trim()}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] rounded-lg cursor-pointer transition-colors flex items-center gap-0.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Salva Vocabolo
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Submit/Next Control bar */}
        <div className="pt-2 flex justify-between gap-4" id="drill-controls">
          {!isAnswered ? (
            <button
              disabled={!selectedOption}
              onClick={handleAnswerSubmit}
              className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all text-center cursor-pointer ${
                selectedOption
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
              id="submit-drill-btn"
            >
              Invia Risposta
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all hover:scale-[1.01] shadow-sm"
              id="next-drill-btn"
            >
              Prossimo esercizio <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* Inline partner promotion */}
      <AdPlaceholder type="inline" preferredId="treccani-dictionary" />

    </div>
  );
}
