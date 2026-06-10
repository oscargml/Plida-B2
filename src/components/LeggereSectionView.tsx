/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { leggereSections } from '../data';
import { BookOpen, CheckCircle, XCircle, ArrowLeft, ArrowRight, RefreshCw, Info, Bookmark, Check, Plus, Sparkles } from 'lucide-react';
import { VocabularyWord } from '../types';

interface LeggereSectionViewProps {
  onBack: () => void;
  onUpdateScore: (sectionId: string, score: number) => void;
  onAddWord: (word: Omit<VocabularyWord, 'id' | 'dateAdded'>) => void;
}

export default function LeggereSectionView({ onBack, onUpdateScore, onAddWord }: LeggereSectionViewProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Vocabulary quick-saver states
  const [vocabWord, setVocabWord] = useState<string>('');
  const [vocabTranslation, setVocabTranslation] = useState<string>('');
  const [vocabSuccess, setVocabSuccess] = useState<boolean>(false);
  const [showVocabSaver, setShowVocabSaver] = useState<boolean>(false);

  const section = leggereSections[activeTab];

  const handleSelectAnswer = (questionId: number, value: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [`${section.id}_${questionId}`]: value,
    }));
  };

  const currentAnswersFilled = section.items.every(
    (item) => userAnswers[`${section.id}_${item.id}`] !== undefined
  );

  const handleSubmit = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    section.items.forEach((item) => {
      const ans = userAnswers[`${section.id}_${item.id}`];
      // Normalize answer comparison (only take first letter, e.g. "A" from "A (Testo A)" or "Paragrafo G")
      const userLetter = ans ? ans.trim().charAt(0) : '';
      const correctLetter = item.correctAnswer.trim().charAt(0);
      if (userLetter === correctLetter) {
        correctCount++;
      }
    });

    onUpdateScore(section.id, correctCount);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setUserAnswers((prev) => {
      const next = { ...prev };
      section.items.forEach((item) => {
        delete next[`${section.id}_${item.id}`];
      });
      return next;
    });
  };

  // Helper to compute correct score for active part
  const getSectionScore = () => {
    let score = 0;
    section.items.forEach((item) => {
      const ans = userAnswers[`${section.id}_${item.id}`];
      const userLetter = ans ? ans.trim().charAt(0) : '';
      const correctLetter = item.correctAnswer.trim().charAt(0);
      if (userLetter === correctLetter) score++;
    });
    return score;
  };

  const getSuggestedWords = () => {
    switch (section.id) {
      case 'l1':
        return [
          { word: 'Indenni', translation: 'Senza subire danni; intatti, sani e salvi' },
          { word: 'Incuria', translation: 'Mancanza di cura, trascuratezza grave' },
          { word: 'Dismettere', translation: 'Cessare l\'uso o l\'attività di qualcosa' }
        ];
      case 'l2':
        return [
          { word: 'Giacimento', translation: 'Accumulo naturale sotterraneo di minerale o fossile' },
          { word: 'Pregevole', translation: 'Di apprezzabile valore artistico, raro, lodevole' },
          { word: 'Fruizione', translation: 'Uso, godimento di un bene o servizio culturale' }
        ];
      case 'l3':
        return [
          { word: 'Glaucoma', translation: 'Malattia dell\'occhio caratterizzata da aumento di pressione' },
          { word: 'Ulcere corneali', translation: 'Lesioni aperte dello strato anteriore dell\'occhio' },
          { word: 'Antipodi', translation: 'Luoghi geografici diametralmente opposti sul globo' }
        ];
      case 'l5':
        return [
          { word: 'Borgo', translation: 'Piccolo centro abitato di antica origine, fortificato' },
          { word: 'Fatiscente', translation: 'Che minaccia rovina per vecchiaia o mancanza di cura' },
          { word: 'Divario', translation: 'Differenza, distacco, discrepanza evidente' }
        ];
      default:
        return [
          { word: 'Spopolamento', translation: 'Diminuzione progressiva del numero di abitanti' },
          { word: 'Idealizzare', translation: 'Rappresentare la realtà migliore di quanto sia' },
          { word: 'Smart working', translation: 'Lavoro agile eseguito da remoto con internet' }
        ];
    }
  };

  const handleQuickSaveVocab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vocabWord.trim() || !vocabTranslation.trim()) return;

    onAddWord({
      word: vocabWord.trim(),
      translation: vocabTranslation.trim(),
      context: `Sezione d'Esame Lettura: Parte ${activeTab + 1} (${section.title})`,
      notes: `Annotato durante la lettura della Parte ${activeTab + 1}.`
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
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in" id="leggere-view-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 pb-4" id="leggere-header">
        <div className="space-y-1.5">
          <button 
            onClick={onBack}
            className="text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer transition-colors uppercase tracking-wider"
            id="back-to-home-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Torna al menu principale
          </button>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight" id="leggere-title">
            Sezione: Leggere (Comprensione Scritta)
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl self-start border border-slate-200" id="tabs-bar">
          {leggereSections.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveTab(idx);
                setIsSubmitted(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === idx
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              id={`tab-select-${sec.id}`}
            >
              Parte {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Part details card */}
      <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl space-y-2 shadow-xs" id="reading-intro-card">
        <div className="flex items-center gap-2 text-indigo-800" id="reading-brand">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-900">
            {section.title} - {section.subtitle}
          </h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          {section.instructions}
        </p>
      </div>

      {/* Layout double column (Text vs Questions) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="leggere-interactive-grid">
        {/* TEXT COLUMN */}
        <div className="space-y-4" id="reading-text-column">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 max-h-[550px] overflow-y-auto shadow-sm space-y-4 scrollbar-thin" id="reading-scrollable-content">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5 mb-3 block">
              Testo d'Esame PLIDA
            </div>
            
            {section.id === 'l2' ? (
              // Splitted view for Double text matching
              <div className="space-y-6 text-sm leading-relaxed text-slate-800" id="text-comparison-view">
                <div className="space-y-2 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-indigo-900">RECENSIONE TESTO A</h4>
                  <p className="italic leading-relaxed">{section.text}</p>
                </div>
                <div className="space-y-2 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-indigo-900">RECENSIONE TESTO B</h4>
                  <p className="italic leading-relaxed">{section.textPart2}</p>
                </div>
              </div>
            ) : (
              // Standard continuous text
              <div className="text-sm leading-relaxed text-slate-800 whitespace-pre-wrap space-y-4" id="text-paragraph-view">
                {section.text}
              </div>
            )}
          </div>

          {/* Reading Comprehension Vocabulary Helper & Bookmarker */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-3xs space-y-4" id="reading-vocab-companion">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-indigo-600" /> Comprensione Vocaboli B2
              </h4>
              <button
                onClick={() => setShowVocabSaver(!showVocabSaver)}
                className="text-xs text-indigo-600 font-bold hover:text-indigo-800 transition-colors cursor-pointer"
                id="toggle-vocab-saver-btn"
              >
                {showVocabSaver ? 'Nascondi form' : 'Aggiungi Parola'}
              </button>
            </div>

            {/* Curated B2 suggestions based on section context */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Termini chiave consigliati in questa parte:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {getSuggestedWords().map((item) => (
                  <button
                    key={item.word}
                    onClick={() => {
                      setVocabWord(item.word);
                      setVocabTranslation(item.translation);
                      setShowVocabSaver(true);
                    }}
                    className="p-1 px-2.5 bg-indigo-50/55 hover:bg-indigo-100/70 border border-indigo-100 text-indigo-900 rounded-lg text-2xs font-semibold flex items-center gap-0.5 cursor-pointer transition-all"
                  >
                    <Plus className="w-2.5 h-2.5 text-indigo-500" /> {item.word}
                  </button>
                ))}
              </div>
            </div>

            {showVocabSaver && (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3 animate-fade-in text-xs">
                {vocabSuccess ? (
                  <div className="p-2 bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-lg text-center font-bold flex items-center justify-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Vocabolo aggiunto al tuo salvadanaio!
                  </div>
                ) : (
                  <form onSubmit={handleQuickSaveVocab} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="space-y-0.5">
                        <label className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Termine *</label>
                        <input
                          type="text"
                          required
                          value={vocabWord}
                          onChange={(e) => setVocabWord(e.target.value)}
                          placeholder="Termine in Italiano"
                          className="w-full p-2 py-1.5 border border-slate-250 rounded-lg bg-white focus:outline-none focus:border-indigo-400 text-xs font-semibold"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Traduzione *</label>
                        <input
                          type="text"
                          required
                          value={vocabTranslation}
                          onChange={(e) => setVocabTranslation(e.target.value)}
                          placeholder="Traduzione o significato"
                          className="w-full p-2 py-1.5 border border-slate-250 rounded-lg bg-white focus:outline-none focus:border-indigo-400 text-xs font-semibold"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={!vocabWord.trim() || !vocabTranslation.trim()}
                      className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-2xs rounded-lg transition-colors cursor-pointer"
                    >
                      Salva nel Vocabolario B2
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

        {/* QUESTIONS COLUMN */}
        <div className="space-y-6" id="reading-questions-column">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6" id="reading-controls-card">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5 mb-3 block">
              Esercizi e Risposte
            </div>

            <div className="space-y-5" id="questions-list">
              {section.items.map((item) => {
                const uValue = userAnswers[`${section.id}_${item.id}`];
                const isCorrect = uValue && uValue.trim().charAt(0) === item.correctAnswer.trim().charAt(0);

                return (
                  <div 
                    key={item.id} 
                    className={`p-4 rounded-xl border transition-all space-y-3.5 ${
                      isSubmitted 
                        ? isCorrect 
                          ? 'bg-emerald-50/70 border-emerald-300 shadow-xs' 
                          : 'bg-rose-50/70 border-rose-300 shadow-xs'
                        : uValue 
                          ? 'border-indigo-300 bg-indigo-50/10' 
                          : 'border-slate-200 hover:border-slate-350'
                    }`}
                    id={`question-card-${item.id}`}
                  >
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.question}
                    </h4>

                    {/* Options list as radios/cards */}
                    <div className="grid grid-cols-1 gap-2" id={`options-container-${item.id}`}>
                      {item.options?.map((opt) => {
                        const optLetter = opt.charAt(0);
                        const isSelected = uValue === opt;
                        const isCorrectOpt = optLetter === item.correctAnswer;

                        return (
                          <button
                            key={opt}
                            disabled={isSubmitted}
                            onClick={() => handleSelectAnswer(Number(item.id), opt)}
                            className={`text-left text-xs p-2.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                              isSubmitted
                                ? isCorrectOpt
                                  ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-extrabold'
                                  : isSelected
                                    ? 'bg-rose-100 border-rose-400 text-rose-900'
                                    : 'bg-slate-50/50 border-slate-200 text-slate-400'
                                : isSelected
                                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                                  : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200 text-slate-700'
                            }`}
                            id={`option-btn-${item.id}-${optLetter}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Individual Feedback and Explanation */}
                    {isSubmitted && (
                      <div className="mt-3.5 p-3.5 bg-white rounded-xl border border-slate-200/80 text-xs leading-relaxed space-y-1.5" id={`explanation-${item.id}`}>
                        <div className="flex items-center gap-1 font-bold text-slate-800">
                          {isCorrect ? (
                            <span className="text-emerald-700 flex items-center gap-0.5"><CheckCircle className="w-3.5 h-3.5" /> Esatto</span>
                          ) : (
                            <span className="text-rose-700 flex items-center gap-0.5"><XCircle className="w-3.5 h-3.5" /> Errato • Risposta corretta: {item.correctAnswer}</span>
                          )}
                        </div>
                        <p className="text-slate-550 leading-relaxed italic">
                          <Info className="w-3.5 h-3.5 inline mr-1 text-indigo-500" />
                          {item.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between" id="reading-actions">
              {!isSubmitted ? (
                <button
                  disabled={!currentAnswersFilled}
                  onClick={handleSubmit}
                  className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all text-center cursor-pointer ${
                    currentAnswersFilled
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                  id="reading-submit-btn"
                >
                  {currentAnswersFilled ? 'Invia Risposte' : 'Seleziona tutte le risposte'}
                </button>
              ) : (
                <div className="flex items-center justify-between w-full gap-4" id="section-score-summary">
                  <div className="text-sm font-bold text-slate-800" id="result-sum-lbl">
                    Punteggio della parte: <span className="text-indigo-600 text-lg font-extrabold">{getSectionScore()} / {section.items.length}</span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 px-4 py-2 border border-slate-300 text-slate-600 font-bold rounded-lg text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                    id="reading-retry-btn"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Riprova
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination arrows */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200" id="reading-pagination">
        <button
          disabled={activeTab === 0}
          onClick={() => {
            setActiveTab((prev) => prev - 1);
            setIsSubmitted(false);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-semibold transition-all ${
            activeTab === 0
              ? 'text-slate-300 border-slate-100 cursor-not-allowed'
              : 'text-slate-700 hover:bg-slate-50 border-slate-200 cursor-pointer'
          }`}
          id="prev-reading-part-btn"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Parte precedente
        </button>

        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Parte {activeTab + 1} di {leggereSections.length}
        </span>

        <button
          disabled={activeTab === leggereSections.length - 1}
          onClick={() => {
            setActiveTab((prev) => prev + 1);
            setIsSubmitted(false);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-semibold transition-all ${
            activeTab === leggereSections.length - 1
              ? 'text-slate-300 border-slate-100 cursor-not-allowed'
              : 'text-slate-700 hover:bg-slate-50 border-slate-200 cursor-pointer'
          }`}
          id="next-reading-part-btn"
        >
          Parte successiva <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
