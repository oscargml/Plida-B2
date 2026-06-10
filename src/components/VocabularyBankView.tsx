/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { VocabularyWord } from '../types';
import { 
  BookMarked, Plus, Search, Trash2, Edit3, Check, X, HelpCircle, 
  RefreshCw, RotateCw, Sparkles, Volume2, Calendar, BookOpen, 
  ArrowLeft, Info, CheckCircle2, Star, PlusCircle, ChevronRight,
  Download, UploadCloud, History, TrendingUp
} from 'lucide-react';
import AdPlaceholder from './AdPlaceholder';

// Premium B2 starter words so the quiz is playable immediately and provides value even if the user starts empty
const B2_STARTER_WORDS: VocabularyWord[] = [
  {
    id: 's1',
    word: 'Atavico',
    translation: 'Ancestrale, antico, tramandato dagli antenati',
    context: 'Fa da freno l\'atavica ignoranza musicale dei nostri politici.',
    notes: 'Aggettivo molto colto per indicare qualcosa di profondamente radicato nel passato o nella biologia.',
    dateAdded: new Date().toISOString()
  },
  {
    id: 's2',
    word: 'Saltimbanco',
    translation: 'Ciarlatano, acrobata da strada, persona poco seria',
    context: 'Ormai fa più colpo il saltimbanco di turno di chi cerca di lavorare in profondità.',
    notes: 'Usato da Riccardo Muti in senso spregiativo per definire musicisti superficiali che cercano solo l\'esibizionismo.',
    dateAdded: new Date().toISOString()
  },
  {
    id: 's3',
    word: 'Fatiscente',
    translation: 'Cadente, in rovina, che sta per crollare',
    context: 'Giovani famiglie disposte a ristrutturare immobili fatiscenti a un euro.',
    notes: 'Aggettivo essenziale per descrivere l\'edilizia o strutture storiche degradate.',
    dateAdded: new Date().toISOString()
  },
  {
    id: 's4',
    word: 'Antropizzazione',
    translation: 'Modifica dell\'ambiente naturale da parte dell\'uomo',
    context: 'Purtroppo l\'intensa antropizzazione costiera rischia di compromettere il Mar Mediterraneo.',
    notes: 'Termine tecnico/scientifico B2-C1 utile per saggi brevi sull\'ambiente.',
    dateAdded: new Date().toISOString()
  },
  {
    id: 's5',
    word: 'Sventare',
    translation: 'Impedire, mandare a monte (un piano, un furto)',
    context: 'L\'investigatore è riuscito a sventare la fuga del sospettato all\'ultimo secondo.',
    notes: 'Verbo ideale per la scrittura di gialli o cronache.',
    dateAdded: new Date().toISOString()
  }
];

interface VocabularyBankViewProps {
  onBack: () => void;
  savedWords: VocabularyWord[];
  onAddWord: (word: Omit<VocabularyWord, 'id' | 'dateAdded'>) => void;
  onDeleteWord: (id: string) => void;
  onUpdateWord: (word: VocabularyWord) => void;
  onImportWords: (words: VocabularyWord[]) => void;
}

export default function VocabularyBankView({ 
  onBack, 
  savedWords, 
  onAddWord, 
  onDeleteWord, 
  onUpdateWord,
  onImportWords
}: VocabularyBankViewProps) {
  // Combine user's words and starter words if user has none, to make the interactive list engaging
  const displayWords = savedWords.length > 0 ? savedWords : B2_STARTER_WORDS;

  // Search, input, editing states
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingWordId, setEditingWordId] = useState<string | null>(null);

  // Selector state for Quiz Mode banner
  const [selectedQuizType, setSelectedQuizType] = useState<'flashcard' | 'multiple-choice'>('flashcard');
  const [selectedQuizOrientation, setSelectedQuizOrientation] = useState<'word-to-def' | 'def-to-word'>('word-to-def');

  // New Word Form State
  const [newWord, setNewWord] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [newContext, setNewContext] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Editing Word Form State
  const [editWordText, setEditWordText] = useState('');
  const [editTranslationText, setEditTranslationText] = useState('');
  const [editContextText, setEditContextText] = useState('');
  const [editNotesText, setEditNotesText] = useState('');

  // Quiz State
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [quizType, setQuizType] = useState<'flashcard' | 'multiple-choice'>('flashcard');
  const [quizOrientation, setQuizOrientation] = useState<'word-to-def' | 'def-to-word'>('word-to-def');
  const [quizPool, setQuizPool] = useState<VocabularyWord[]>([]);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  
  // MCQ specifics
  const [mcqOptions, setMcqOptions] = useState<string[]>([]);
  const [mcqSelected, setMcqSelected] = useState<string | null>(null);
  const [mcqResult, setMcqResult] = useState<'correct' | 'wrong' | null>(null);
  const [quizStats, setQuizStats] = useState({ correct: 0, checked: 0 });

  // Quiz attempts logging history
  const [quizHistory, setQuizHistory] = useState(() => {
    const saved = localStorage.getItem('plida_vocab_quiz_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse quiz history', e);
      }
    }
    return {
      totalAttempts: 0,
      totalCorrect: 0,
      totalChecked: 0,
      attempts: []
    };
  });

  const [importStatus, setImportStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Clear toast status notifications
  useEffect(() => {
    if (importStatus.type) {
      const timer = setTimeout(() => {
        setImportStatus({ type: null, message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [importStatus.type]);

  // Log active quiz results to history
  const saveCompletedQuiz = (pool?: VocabularyWord[]) => {
    const activePool = pool || quizPool;
    const total = activePool.length;
    // For flashcards, correct behaves as completed reviews
    const correct = quizType === 'flashcard' ? total : quizStats.correct;
    const checked = quizType === 'flashcard' ? total : quizStats.checked;

    const newAttempt = {
      id: 'attempt_' + Date.now(),
      date: new Date().toISOString(),
      quizType,
      orientation: quizOrientation,
      correct,
      total: checked || total
    };

    setQuizHistory((prev: any) => {
      const prevAttempts = Array.isArray(prev?.attempts) ? prev.attempts : [];
      const updatedAttempts = [newAttempt, ...prevAttempts].slice(0, 30);
      const nextStats = {
        totalAttempts: (prev?.totalAttempts || 0) + 1,
        totalCorrect: (prev?.totalCorrect || 0) + correct,
        totalChecked: (prev?.totalChecked || 0) + (checked || total),
        attempts: updatedAttempts
      };
      localStorage.setItem('plida_vocab_quiz_history', JSON.stringify(nextStats));
      return nextStats;
    });
  };

  const handleExportBackup = () => {
    const backupData = {
      backupVersion: "1.2",
      backupDate: new Date().toISOString(),
      savedWords: savedWords,
      quizHistory: quizHistory
    };

    try {
      const jsonString = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = url;
      downloadAnchor.download = `plida_b2_vocabolario_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      
      document.body.removeChild(downloadAnchor);
      URL.revokeObjectURL(url);

      setImportStatus({
        type: 'success',
        message: 'Esportazione completata con successo! File salvato sul tuo dispositivo.'
      });
    } catch (err: any) {
      setImportStatus({
        type: 'error',
        message: `Impossibile completare l'esportazione: ${err.message}`
      });
    }
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed) {
          throw new Error('Il file JSON è vuoto o non leggibile.');
        }

        const importedWords = parsed.savedWords || [];
        const importedStats = parsed.quizHistory || {
          totalAttempts: 0,
          totalCorrect: 0,
          totalChecked: 0,
          attempts: []
        };

        if (!Array.isArray(importedWords)) {
          throw new Error('Il formato dei vocaboli salvati nel backup non è valido (necessario array).');
        }

        onImportWords(importedWords);

        setQuizHistory(importedStats);
        localStorage.setItem('plida_vocab_quiz_history', JSON.stringify(importedStats));

        setImportStatus({
          type: 'success',
          message: `Backup ripristinato con successo! Importati ${importedWords.length} vocaboli e sincronizzati i dati storici.`
        });
      } catch (err: any) {
        setImportStatus({
          type: 'error',
          message: `Errore durante il caricamento: ${err.message || 'Formato JSON non valido.'}`
        });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Text-To-Speech Pronunciation Audio helper
  const handlePronounce = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech first
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'it-IT';
      utterance.rate = 0.85; // slightly slower for language learners

      // Explicitly try to match Italian voice if available
      try {
        const voices = window.speechSynthesis.getVoices();
        const italianVoice = voices.find(voice => voice.lang.toLowerCase().startsWith('it-') || voice.lang.toLowerCase() === 'it_it');
        if (italianVoice) {
          utterance.voice = italianVoice;
        }
      } catch (e) {
        console.warn("Could not load distinct voice profiles, using standard system fallback.", e);
      }

      window.speechSynthesis.speak(utterance);
    } else {
      console.log("Speech synthesis not supported in this browser.");
    }
  };

  // Filter words based on search term
  const filteredWords = displayWords.filter(item => 
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.translation.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle saving new word manually
  const handleSubmitNewWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !newTranslation.trim()) return;

    onAddWord({
      word: newWord.trim(),
      translation: newTranslation.trim(),
      context: newContext.trim() || 'Nessun contesto inserito.',
      notes: newNotes.trim()
    });

    // Reset Form
    setNewWord('');
    setNewTranslation('');
    setNewContext('');
    setNewNotes('');
    setIsAddingNew(false);
  };

  // Turn on edit mode for a word
  const startEditing = (word: VocabularyWord) => {
    setEditingWordId(word.id);
    setEditWordText(word.word);
    setEditTranslationText(word.translation);
    setEditContextText(word.context);
    setEditNotesText(word.notes || '');
  };

  // Save edited word
  const handleSaveEdit = (wordId: string) => {
    if (!editWordText.trim() || !editTranslationText.trim()) return;

    onUpdateWord({
      id: wordId,
      word: editWordText.trim(),
      translation: editTranslationText.trim(),
      context: editContextText.trim(),
      notes: editNotesText.trim(),
      dateAdded: new Date().toISOString()
    });

    setEditingWordId(null);
  };

  // Start the Quiz Session with direction support
  const startQuiz = (type: 'flashcard' | 'multiple-choice', orientation: 'word-to-def' | 'def-to-word' = 'word-to-def') => {
    // We shuffle the displayWords pool
    const pool = [...displayWords].sort(() => 0.5 - Math.random());
    setQuizPool(pool);
    setQuizType(type);
    setQuizOrientation(orientation);
    setCurrentQuizIdx(0);
    setIsCardFlipped(false);
    setQuizMode(true);
    setMcqSelected(null);
    setMcqResult(null);
    setQuizStats({ correct: 0, checked: 0 });

    if (type === 'multiple-choice') {
      generateMCQOptions(pool[0], displayWords, orientation);
    }
  };

  // Generate options for Multiple-Choice Question quiz
  const generateMCQOptions = (correctWord: VocabularyWord, fullPool: VocabularyWord[], orientation: 'word-to-def' | 'def-to-word' = 'word-to-def') => {
    const isWordToDef = orientation === 'word-to-def';
    const optionsSet = new Set<string>();
    optionsSet.add(isWordToDef ? correctWord.translation : correctWord.word);

    const otherWords = fullPool.filter(w => w.id !== correctWord.id);
    const shuffledOthers = [...otherWords].sort(() => 0.5 - Math.random());
    
    shuffledOthers.forEach(w => {
      if (optionsSet.size < 4) {
        optionsSet.add(isWordToDef ? w.translation : w.word);
      }
    });

    // If we still don't have 4 options because pool is very small, pad with general generic ones
    const fallbacks = isWordToDef ? [
      'Preoccupazione improvvisa e immotivata',
      'Atteggiamento di sfiducia sistematica',
      'Sostenere fermamente le proprie tesi',
      'Insieme di regole strutturate della grammatica',
      'Capacità di esprimersi fluidamente'
    ] : [
      'Atavico',
      'Saltimbanco',
      'Fatiscente',
      'Antropizzazione',
      'Sventare'
    ];
    let fallbackIdx = 0;
    while (optionsSet.size < Math.min(4, fullPool.length)) {
      if (fallbackIdx < fallbacks.length) {
        optionsSet.add(fallbacks[fallbackIdx++]);
      } else {
        optionsSet.add(`Alternativa generica ${optionsSet.size + 1}`);
      }
    }

    setMcqOptions([...optionsSet].sort(() => 0.5 - Math.random()));
  };

  // Handle MCQ Answer selection
  const handleSelectMCQ = (selected: string) => {
    if (mcqResult !== null) return; // already answered
    setMcqSelected(selected);
    const correct = quizOrientation === 'word-to-def' 
      ? quizPool[currentQuizIdx].translation 
      : quizPool[currentQuizIdx].word;
    const isCorrect = selected === correct;
    
    setMcqResult(isCorrect ? 'correct' : 'wrong');
    setQuizStats(prev => ({
      checked: prev.checked + 1,
      correct: isCorrect ? prev.correct + 1 : prev.correct
    }));
  };

  // Move to next quiz word
  const handleNextQuizWord = () => {
    const nextIdx = currentQuizIdx + 1;
    if (nextIdx < quizPool.length) {
      setCurrentQuizIdx(nextIdx);
      setIsCardFlipped(false);
      setMcqSelected(null);
      setMcqResult(null);
      if (quizType === 'multiple-choice') {
        generateMCQOptions(quizPool[nextIdx], displayWords, quizOrientation);
      }
    } else {
      // Completed the quiz pool
      setIsCardFlipped(false);
      saveCompletedQuiz();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in" id="vocabulary-view-container">
      
      {/* Quiz Modal overlay when Active */}
      {quizMode && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in" id="quiz-modal-box">
            
            {/* Modal Header */}
            <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-extrabold text-sm tracking-tight">
                  Allenamento Vocaboli ({quizType === 'flashcard' ? 'Flashcards' : 'Quiz Scelta Multipla'})
                </h3>
              </div>
              <button 
                onClick={() => setQuizMode(false)}
                className="hover:bg-indigo-700 p-1.5 rounded-lg transition-colors cursor-pointer"
                id="quit-quiz-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              
              {/* Progress and score */}
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span>Parola {currentQuizIdx + 1} di {quizPool.length}</span>
                {quizType === 'multiple-choice' && (
                  <span className="text-indigo-600">Punteggio: {quizStats.correct} / {quizStats.checked}</span>
                )}
              </div>

              {currentQuizIdx < quizPool.length ? (
                <div className="space-y-4" id="quiz-question-wrapper">
                  
                  {/* FLASHCARD MODE LAYOUT */}
                  {quizType === 'flashcard' && (
                    <div className="perspective-1000 min-h-[220px] flex items-center justify-center">
                      <div 
                        onClick={() => setIsCardFlipped(!isCardFlipped)}
                        className={`relative w-full h-full min-h-[200px] rounded-2xl border-2 transition-all duration-500 transform cursor-pointer p-6 flex flex-col justify-between select-none ${
                          isCardFlipped 
                            ? 'bg-indigo-50/70 border-indigo-400 rotate-y-180' 
                            : 'bg-slate-50 border-slate-200 hover:border-indigo-200'
                        }`}
                        id="flashcard-element"
                      >
                        {!isCardFlipped ? (
                          /* Front Side */
                          <div className="text-center space-y-3 my-auto">
                            <span className="text-[10px] text-indigo-600 font-extrabold tracking-widest uppercase bg-indigo-50 border border-indigo-100/50 px-2.5 py-0.5 rounded-md">
                              {quizOrientation === 'word-to-def' ? 'PAROLA ITALIANA' : 'SIGNIFICATO / TRADUZIONE'}
                            </span>
                            <h4 className={`font-extrabold text-slate-900 tracking-tight ${quizOrientation === 'word-to-def' ? 'text-3xl' : 'text-xl px-4'}`}>
                              {quizOrientation === 'word-to-def' ? quizPool[currentQuizIdx].word : quizPool[currentQuizIdx].translation}
                            </h4>
                            <p className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1">
                              <RotateCw className="w-3 h-3 animate-spin-slow" /> Clicca per girare e vedere {quizOrientation === 'word-to-def' ? 'la definizione' : 'la parola'}
                            </p>
                          </div>
                        ) : (
                          /* Back Side */
                          <div className="text-center space-y-4 my-auto [transform:rotateY(180deg)]">
                            <div className="space-y-1.5">
                              <span className="text-[10px] text-emerald-750 font-extrabold tracking-widest uppercase bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-md">
                                {quizOrientation === 'word-to-def' ? 'SIGNIFICATO / TRADUZIONE' : 'PAROLA ITALIANA'}
                              </span>
                              <h4 className={`font-extrabold text-slate-900 ${quizOrientation === 'word-to-def' ? 'text-lg' : 'text-2xl tracking-tight'}`}>
                                {quizOrientation === 'word-to-def' ? quizPool[currentQuizIdx].translation : quizPool[currentQuizIdx].word}
                              </h4>
                            </div>
                            
                            {quizPool[currentQuizIdx].context && (
                              <div className="p-3 bg-white border border-slate-150 rounded-xl text-left">
                                <span className="text-[8px] font-extrabold text-slate-400 block uppercase mb-1">Contesto d'uso</span>
                                <p className="text-xs text-slate-600 italic leading-normal">
                                  "{quizPool[currentQuizIdx].context}"
                                </p>
                              </div>
                            )}

                            {quizPool[currentQuizIdx].notes && (
                              <p className="text-[10px] text-slate-500 italic">
                                Note: {quizPool[currentQuizIdx].notes}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* MULTIPLE-CHOICE MODE LAYOUT */}
                  {quizType === 'multiple-choice' && (
                    <div className="space-y-5" id="mcq-interaction-block">
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center space-y-2">
                        <span className="text-[9px] font-extrabold text-indigo-600 uppercase tracking-widest block">
                          {quizOrientation === 'word-to-def' ? 'Qual è il significato di:' : 'Quale termine si riferisce a:'}
                        </span>
                        <h4 className={`font-extrabold text-slate-900 ${quizOrientation === 'word-to-def' ? 'text-2xl' : 'text-base leading-snug px-2'}`}>
                          {quizOrientation === 'word-to-def' ? quizPool[currentQuizIdx].word : quizPool[currentQuizIdx].translation}
                        </h4>
                        
                        {quizOrientation === 'word-to-def' && (
                          <button 
                            onClick={() => handlePronounce(quizPool[currentQuizIdx].word)}
                            className="p-1 px-2.5 bg-white hover:bg-slate-100 text-slate-500 rounded-lg border border-slate-200 text-[10px] font-bold flex items-center gap-1 mx-auto transition-colors align-center cursor-pointer"
                          >
                            <Volume2 className="w-3 h-3" /> Pronuncia
                          </button>
                        )}
                      </div>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 gap-2.5">
                        {mcqOptions.map((opt, oIdx) => {
                          const isSelected = mcqSelected === opt;
                          const isCorrectOpt = quizOrientation === 'word-to-def'
                            ? opt === quizPool[currentQuizIdx].translation
                            : opt === quizPool[currentQuizIdx].word;
                          
                          let btnClass = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70';
                          if (mcqResult !== null) {
                            if (isCorrectOpt) {
                              btnClass = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                            } else if (isSelected) {
                              btnClass = 'bg-rose-100 border-rose-400 text-rose-950';
                            } else {
                              btnClass = 'bg-slate-50/50 border-slate-200/60 text-slate-400';
                            }
                          }

                          return (
                            <button
                              key={opt}
                              disabled={mcqResult !== null}
                              onClick={() => handleSelectMCQ(opt)}
                              className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${btnClass}`}
                            >
                              <span className="font-extrabold text-indigo-500 mr-2">{String.fromCharCode(65 + oIdx)})</span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanatory context sentence shown after answering */}
                      {mcqResult !== null && (
                        <div className="p-3.5 bg-indigo-50/50 border border-indigo-100/70 rounded-xl text-xs space-y-1 animate-slide-down">
                          <span className="font-bold text-indigo-900 block flex items-center gap-1">
                            <Info className="w-3.5 h-3.5" /> Contesto grammaticale:
                          </span>
                          <p className="italic text-slate-600 leading-normal">
                            "{quizPool[currentQuizIdx].context}"
                          </p>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              ) : (
                /* Completed Screen */
                <div className="py-6 text-center space-y-4" id="quiz-completion-panel">
                  <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-indigo-900">Allenamento Terminato!</h4>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                      Hai esaminato tutte le parole nel pool del tuo vocabolario. Ripeti l'allenamento regolarmente per scolpire i concetti nella tua memoria di lungo termine.
                    </p>
                  </div>

                  {quizType === 'multiple-choice' && (
                    <div className="inline-block p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                      Punteggio Finale:{' '}
                      <strong className="text-indigo-600 text-base">
                        {quizStats.correct} / {quizStats.checked}
                      </strong>{' '}
                      ({Math.round((quizStats.correct / (quizStats.checked || 1)) * 100)}%)
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const recents = [...displayWords].sort(() => 0.5 - Math.random());
                        setQuizPool(recents);
                        setCurrentQuizIdx(0);
                        setIsCardFlipped(false);
                        setMcqSelected(null);
                        setMcqResult(null);
                        setQuizStats({ correct: 0, checked: 0 });
                        if (quizType === 'multiple-choice') {
                          generateMCQOptions(recents[0], displayWords);
                        }
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
                    >
                      Nuova sessione
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-150 flex items-center justify-between" id="quiz-modal-footer">
              <button
                onClick={() => handlePronounce(quizPool[currentQuizIdx]?.word)}
                disabled={currentQuizIdx >= quizPool.length}
                className="p-2 border border-slate-200 hover:bg-slate-100 rounded-xl text-slate-600 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <Volume2 className="w-3.5 h-3.5" /> Pronuncia Parola
              </button>

              {currentQuizIdx < quizPool.length && (quizType === 'flashcard' || mcqResult !== null) && (
                <button
                  onClick={handleNextQuizWord}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1 cursor-pointer"
                  id="quiz-next-word-btn"
                >
                  Prossima parola <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Main Page Layout */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-200 pb-5" id="vocab-header-panel">
        <div className="space-y-1.5">
          <button 
            onClick={onBack}
            className="text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer transition-colors uppercase tracking-wider"
            id="back-from-vocab-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Torna alla Home
          </button>
          
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl">
              <BookMarked className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight" id="vocab-main-title">
              Vocabolario Personale B2
            </h2>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
            Il tuo archivio di termini ed espressioni difficili. Salva i vocaboli che incontri nelle simulazioni di lettura o grammatica e mettiti alla prova con i quiz personalizzati!
          </p>
        </div>
      </div>

      {/* QUIZ MODE INTEGRATED DASHBOARD BANNER */}
      <div className="bg-gradient-to-r from-indigo-50/75 via-slate-50/50 to-indigo-50/55 border border-indigo-100 rounded-2xl p-5 md:p-6 shadow-3xs animate-fade-in flex flex-col lg:flex-row lg:items-center justify-between gap-6" id="integrated-quiz-dashboard">
        {/* Info Left */}
        <div className="space-y-2 lg:max-w-[40%] text-left">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-indigo-100 border border-indigo-200 text-indigo-700 text-[9px] font-extrabold tracking-widest uppercase rounded">
              🧠 PALESTRA ATTIVA
            </span>
            <span className="text-[10px] text-indigo-600 font-extrabold tracking-wider uppercase">• MODALITÀ QUIZ</span>
          </div>
          <h3 className="text-base font-extrabold text-indigo-950 tracking-tight">
            Allenamento &amp; Assessment Vocaboli
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Genera una sessione di studio interattiva per consolidare il significato, la traduzione e l'uso contestuale dei tuoi vocaboli salvati (o il kit starter B2).
          </p>
        </div>

        {/* Configuration Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 shrink-0 lg:max-w-[45%] w-full lg:w-auto">
          {/* Methodology selection */}
          <div className="space-y-1.5 text-left">
            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">Metodologia</span>
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setSelectedQuizType('flashcard')}
                className={`flex-1 py-1.5 rounded-md font-bold text-2xs cursor-pointer transition-all flex items-center justify-center gap-1 ${
                  selectedQuizType === 'flashcard' 
                    ? 'bg-white text-indigo-700 shadow-3xs border border-slate-200/55 font-extrabold' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <RotateCw className="w-3 h-3" /> Flashcards
              </button>
              <button
                onClick={() => setSelectedQuizType('multiple-choice')}
                className={`flex-1 py-1.5 rounded-md font-bold text-2xs cursor-pointer transition-all flex items-center justify-center gap-1 ${
                  selectedQuizType === 'multiple-choice' 
                    ? 'bg-white text-indigo-700 shadow-3xs border border-slate-200/55 font-extrabold' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Sparkles className="w-3 h-3" /> Scelta Multipla
              </button>
            </div>
          </div>

          {/* Orientation selection */}
          <div className="space-y-1.5 text-left">
            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">Direzione della Prova</span>
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setSelectedQuizOrientation('word-to-def')}
                className={`flex-1 py-1.5 rounded-md font-bold text-2xs cursor-pointer transition-all flex items-center justify-center gap-1 ${
                  selectedQuizOrientation === 'word-to-def' 
                    ? 'bg-white text-indigo-700 shadow-3xs border border-slate-200/55 font-extrabold' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                🇮🇹 Termine &rarr; Def
              </button>
              <button
                onClick={() => setSelectedQuizOrientation('def-to-word')}
                className={`flex-1 py-1.5 rounded-md font-bold text-2xs cursor-pointer transition-all flex items-center justify-center gap-1 ${
                  selectedQuizOrientation === 'def-to-word' 
                    ? 'bg-white text-indigo-700 shadow-3xs border border-slate-200/55 font-extrabold' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                📚 Def &rarr; Termine
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0 pt-2 lg:pt-0 w-full lg:w-auto">
          <button
            onClick={() => startQuiz(selectedQuizType, selectedQuizOrientation)}
            className="w-full lg:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-2xs flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-100 cursor-pointer active:scale-95"
            id="start-configuration-quiz-btn"
          >
            <Sparkles className="w-4 h-4 text-indigo-200 animate-pulse" /> Avvia Quiz Mode
          </button>
        </div>
      </div>

      {/* Grid container: manual adding form + search / list of words */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="vocab-body-grid">
        
        {/* Left Side: Add Form / Info */}
        <div className="space-y-5 lg:col-span-1">
          
          {/* Quick Stats */}
          <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl shadow-3xs space-y-4">
            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">Stato del Vocabolario</span>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white border border-slate-150 rounded-xl text-center">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Parole Totali</span>
                <strong className="text-2xl text-indigo-600 font-extrabold">{savedWords.length}</strong>
              </div>
              <div className="p-3 bg-white border border-slate-150 rounded-xl text-center">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Starter Pack</span>
                <strong className="text-2xl text-slate-700 font-extrabold">{B2_STARTER_WORDS.length}</strong>
              </div>
            </div>

            <div className="text-xs text-slate-500 leading-normal flex items-start gap-2 bg-indigo-50/20 border border-indigo-100/40 p-3 rounded-xl">
              <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <span>
                {savedWords.length === 0 
                  ? "Attualmente stai visualizzando il pacchetto starter B2 pre-caricato per allenarti fin da subito." 
                  : "Ottimo! Hai iniziato ad arricchire il tuo dizionario personale con vocaboli raccolti dalle prove d'esame."}
              </span>
            </div>
          </div>

          {/* STATS & BACKUP DASHBOARD */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                📊 Statistiche &amp; Backup
              </span>
              <span className="p-1 px-1.5 bg-indigo-50 border border-indigo-100/50 text-indigo-700 text-[9px] font-extrabold tracking-widest uppercase rounded">
                Dati
              </span>
            </div>

            {/* Performance analysis metrics */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3" id="performance-analysis-grid">
                <div className="p-2.5 bg-slate-50/50 border border-slate-150 rounded-xl">
                  <span className="text-slate-450 text-[9px] font-extrabold uppercase tracking-wide block leading-tight">Quiz Svolti</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <strong className="text-lg text-slate-800 font-extrabold">{quizHistory?.totalAttempts || 0}</strong>
                    <span className="text-[10px] text-slate-400 font-bold">sessioni</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50/50 border border-slate-150 rounded-xl">
                  <span className="text-slate-450 text-[9px] font-extrabold uppercase tracking-wide block leading-tight">Precisione</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <strong className="text-lg text-emerald-600 font-extrabold">
                      {quizHistory?.totalChecked > 0 
                        ? `${Math.round((quizHistory.totalCorrect / quizHistory.totalChecked) * 100)}%`
                        : '0%'
                      }
                    </strong>
                    <span className="text-[9px] text-slate-400 font-bold">overall</span>
                  </div>
                </div>
              </div>

              {/* Progress bar accuracy */}
              {quizHistory?.totalChecked > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400 font-bold uppercase">Accuratezza risposte</span>
                    <span className="text-indigo-600 font-bold font-mono">
                      {quizHistory.totalCorrect} / {quizHistory.totalChecked}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-150">
                    <div 
                      className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, Math.round((quizHistory.totalCorrect / quizHistory.totalChecked) * 100))}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Notification alert for backup imports */}
            {importStatus.type && (
              <div className={`p-3 rounded-xl border text-2xs leading-relaxed animate-fade-in flex items-start gap-1.5 ${
                importStatus.type === 'success' 
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                  : 'bg-rose-50 border-rose-100 text-rose-800'
              }`}>
                {importStatus.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-extrabold block uppercase tracking-wide text-[9px]">
                    {importStatus.type === 'success' ? 'Backup Caricato' : 'Errore Backup'}
                  </span>
                  <span>{importStatus.message}</span>
                </div>
              </div>
            )}

            {/* Export and Import Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-100/60 flex flex-col">
              <button
                onClick={handleExportBackup}
                className="w-full py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-extrabold text-2xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-3xs cursor-pointer active:scale-98"
                id="export-vocab-backup-btn"
                title="Esporta un archivio JSON di backup"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                Esporta Backup JSON
              </button>

              <label 
                className="w-full py-2 bg-indigo-50 hover:bg-indigo-100/80 text-indigo-700 border border-indigo-100/40 font-extrabold text-2xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center select-none active:scale-98"
                id="import-vocab-backup-label"
                title="Seleziona un backup JSON per ripristinare i dati"
              >
                <UploadCloud className="w-3.5 h-3.5 text-indigo-600" />
                Ripristina Backup JSON
                <input 
                  type="file" 
                  accept=".json"
                  className="hidden" 
                  onChange={handleImportBackup}
                />
              </label>
            </div>
            
            {/* Show sessions history */}
            {quizHistory?.attempts?.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-slate-100/60">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block flex items-center gap-1">
                  <History className="w-3 h-3 text-slate-400" /> Ultime Sessioni
                </span>
                <div className="space-y-1.5 text-[10px]">
                  {quizHistory.attempts.slice(0, 3).map((att: any, index: number) => (
                    <div key={att.id || index} className="flex justify-between items-center text-slate-500 bg-slate-50/50 p-1.5 rounded-lg border border-slate-100">
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-slate-700 uppercase text-[8px] tracking-wide">
                          {att.quizType === 'flashcard' ? '🎴 Flashcard' : '📝 Quiz Scelta Multipla'}
                        </span>
                        <span className="text-slate-400 text-[9px]">
                          {new Date(att.date).toLocaleDateString('it-IT', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <span className="font-bold text-slate-800 bg-white border border-slate-150 px-1.5 py-0.5 rounded-md text-[9px] font-mono">
                        {att.correct}/{att.total}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Add Word Toggle & Form Card */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div 
              onClick={() => setIsAddingNew(!isAddingNew)}
              className="p-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-55 transition-colors"
            >
              <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                <PlusCircle className="w-4 h-4 text-indigo-500" /> Aggiungi Parola Manualmente
              </h4>
              <button className="text-indigo-600 hover:text-indigo-700 text-xs font-bold">
                {isAddingNew ? 'Nascondi' : 'Mostra'}
              </button>
            </div>

            {isAddingNew && (
              <form onSubmit={handleSubmitNewWord} className="p-5 space-y-4 animate-slide-down">
                
                {/* Word string */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Parola o Frase in Italiano *</label>
                  <input
                    type="text"
                    required
                    placeholder="Esempio: Atavico"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400"
                  />
                </div>

                {/* Translation string */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Definizione / Traduzione *</label>
                  <input
                    type="text"
                    required
                    placeholder="Esempio: Antico, ancestrale, radicato"
                    value={newTranslation}
                    onChange={(e) => setNewTranslation(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400"
                  />
                </div>

                {/* Context sentence */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Frase o Contesto d'Incontro d'Esempio</label>
                  <textarea
                    placeholder="Fa da freno l'atavica ignoranza dei politici..."
                    rows={2}
                    value={newContext}
                    onChange={(e) => setNewContext(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 resize-none"
                  />
                </div>

                {/* Optional description notes */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Note dell'esaminando e note d'uso (Opzionale)</label>
                  <input
                    type="text"
                    placeholder="E.g., Usato come insulto colto o attributo lirico."
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-sm shadow-indigo-100 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Ristruttura e Salva Vocabolo
                </button>
              </form>
            )}
          </div>

          <AdPlaceholder type="sidebar" preferredId="amazon-book-quaderno" />

        </div>

        {/* Right Side: Search filter and Vocabulary List */}
        <div className="space-y-5 lg:col-span-2">
          
          {/* Search bar inside header */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 shadow-3xs" id="vocab-search-container">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Cerca parole, traduzioni o note nel tuo dizionario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs focus:outline-none bg-transparent"
              id="vocab-search-input"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="text-slate-400 hover:text-slate-650 cursor-pointer text-xs font-bold shrink-0"
              >
                Pulisci
              </button>
            )}
          </div>

          {/* List items */}
          <div className="space-y-4" id="vocabulary-items-listing">
            {filteredWords.length > 0 ? (
              filteredWords.map((item) => {
                const isEditing = editingWordId === item.id;
                
                return (
                  <div 
                    key={item.id}
                    className="bg-white p-5 border border-slate-200 rounded-2xl shadow-3xs hover:border-slate-300 transition-all space-y-3 relative group"
                    id={`vocab-row-${item.id}`}
                  >
                    {/* Header: Title Word + Action Buttons */}
                    <div className="flex items-start justify-between gap-4">
                      {isEditing ? (
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={editWordText}
                            onChange={(e) => setEditWordText(e.target.value)}
                            className="text-base font-bold bg-slate-50 border border-slate-200 p-1 px-2.5 rounded-lg focus:outline-none w-full"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <h4 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                            {item.word}
                          </h4>
                          <button
                            onClick={() => handlePronounce(item.word)}
                            className="bg-indigo-50/50 hover:bg-indigo-100/70 text-indigo-700 text-2xs font-extrabold px-3 py-1 rounded-lg border border-indigo-100/50 transition-colors cursor-pointer flex items-center gap-1"
                            title="Ascolta la pronuncia corretta in Italiano"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Ascolta Pronuncia</span>
                          </button>
                        </div>
                      )}

                      {/* Edit context actions */}
                      <div className="flex items-center gap-1.5">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSaveEdit(item.id)}
                              className="p-1 px-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-250 text-emerald-800 rounded-lg text-2xs font-bold flex items-center gap-0.5 cursor-pointer"
                            >
                              <Check className="w-3 h-3 text-emerald-600" /> Salva
                            </button>
                            <button
                              onClick={() => setEditingWordId(null)}
                              className="p-1 px-2 bg-slate-50 hover:bg-slate-100 border border-slate-250 text-slate-800 rounded-lg text-2xs font-bold flex items-center gap-0.5 cursor-pointer"
                            >
                              <X className="w-3 h-3 text-slate-500" /> Annulla
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditing(item)}
                              className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 rounded-lg hover:text-indigo-600 transition-colors cursor-pointer"
                              title="Modifica vocabolo"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            {/* Prohibit deleting starter words for layout safety, but can delete others */}
                            {(!item.id.toString().startsWith('s') || savedWords.length > 0) && (
                              <button
                                onClick={() => onDeleteWord(item.id)}
                                className="p-1.5 bg-slate-50 hover:bg-rose-50 border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer"
                                title="Elimina dal vocabolario"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Word translation description */}
                    <div className="text-sm">
                      {isEditing ? (
                        <div className="space-y-1.5 mt-2">
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Traduzione / Definizione</label>
                          <input
                            type="text"
                            value={editTranslationText}
                            onChange={(e) => setEditTranslationText(e.target.value)}
                            className="text-xs font-semibold bg-slate-50 border border-slate-200 p-1.5 px-2.5 rounded-lg focus:outline-none w-full"
                          />
                        </div>
                      ) : (
                        <p className="font-semibold text-indigo-950 flex items-center gap-1.5 bg-indigo-50/30 p-2 py-1.5 rounded-xl border border-indigo-100/30">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0"></span>
                          {item.translation}
                        </p>
                      )}
                    </div>

                    {/* Context and Notes */}
                    <div className="text-xs space-y-1.5">
                      {isEditing ? (
                        <>
                          <div className="space-y-1 mt-2">
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Frase Contesto</label>
                            <input
                              type="text"
                              value={editContextText}
                              onChange={(e) => setEditContextText(e.target.value)}
                              className="text-xs bg-slate-50 border border-slate-200 p-1.5 px-2.5 rounded-lg focus:outline-none w-full"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Note ed Eccezioni</label>
                            <input
                              type="text"
                              value={editNotesText}
                              onChange={(e) => setEditNotesText(e.target.value)}
                              className="text-xs bg-slate-50 border border-slate-200 p-1.5 px-2.5 rounded-lg focus:outline-none w-full"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          {item.context && (
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 leading-relaxed text-slate-600" id={`context-box-${item.id}`}>
                              <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Esempio del contesto d'uso</span>
                              <p className="italic">
                                "{item.context}"
                              </p>
                            </div>
                          )}

                          {item.notes && (
                            <div className="text-[11px] text-slate-500 flex items-start gap-1">
                              <span className="font-extrabold text-indigo-500 uppercase tracking-wider text-[9px] mt-0.5 shrink-0 bg-indigo-50 px-1 py-0.5 rounded-md">NOTE:</span>
                              <p className="leading-normal">{item.notes}</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Date badge */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-50 text-[9px] text-slate-400 font-bold" id={`vocab-row-footer-${item.id}`}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-350" />
                        Aggiunta il: {new Date(item.dateAdded).toLocaleDateString('it-IT', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      {item.id.toString().startsWith('s') && (
                        <span className="text-amber-600 font-extrabold tracking-wider uppercase bg-amber-50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Parola Starter
                        </span>
                      )}
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="bg-slate-50/50 p-12 text-center rounded-2xl border-2 border-dashed border-slate-250 font-medium space-y-3">
                <p className="text-sm text-slate-500 leading-relaxed">
                  Nessun vocabolo salvato corrisponde al filtro di ricerca.
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Pulisci ricerca
                </button>
              </div>
            )}
          </div>

          {/* Inline Treccani Partner promotion */}
          <AdPlaceholder type="inline" preferredId="treccani-dictionary" />

        </div>

      </div>

    </div>
  );
}
