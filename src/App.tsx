/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import IntroScreen from './components/IntroScreen';
import LeggereSectionView from './components/LeggereSectionView';
import AscoltareSectionView from './components/AscoltareSectionView';
import ScrivereSectionView from './components/ScrivereSectionView';
import ParlareSectionView from './components/ParlareSectionView';
import GrammaticaSectionView from './components/GrammaticaSectionView';
import VocabularyBankView from './components/VocabularyBankView';

import { AIPeedback, AISpeakingFeedback, VocabularyWord } from './types';
import { Award, BookOpen, Headphones, PenTool, Mic, Home, Sparkles, Trophy, AlignLeft, GraduationCap, BookMarked } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'ascoltare' | 'leggere' | 'scrivere' | 'parlare' | 'grammatica' | 'vocabolario'>('home');
  const [streak, setStreak] = useState<number>(1);
  const [grammarCorrect, setGrammarCorrect] = useState<number>(0);
  const [grammarTotal, setGrammarTotal] = useState<number>(0);

  // Scores state for PLIDA sections
  const [readingScores, setReadingScores] = useState<{ [key: string]: number }>({});
  const [listeningScores, setListeningScores] = useState<{ [key: string]: number }>({});
  
  // AI essay evaluations state
  const [writingFeedbacks, setWritingFeedbacks] = useState<{ [key: string]: AIPeedback }>({});
  const [speakingFeedbacks, setSpeakingFeedbacks] = useState<{ [key: string]: AISpeakingFeedback }>({});

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Vocabulary bank state
  const [savedWords, setSavedWords] = useState<VocabularyWord[]>([]);

  // Load user data on startup from LocalStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem('plida_streak');
    if (savedStreak) setStreak(Number(savedStreak));

    const savedGCorrect = localStorage.getItem('plida_grammar_correct');
    const savedGTotal = localStorage.getItem('plida_grammar_total');
    if (savedGCorrect) setGrammarCorrect(Number(savedGCorrect));
    if (savedGTotal) setGrammarTotal(Number(savedGTotal));

    const savedReading = localStorage.getItem('plida_reading_scores');
    const savedListening = localStorage.getItem('plida_listening_scores');
    if (savedReading) setReadingScores(JSON.parse(savedReading));
    if (savedListening) setListeningScores(JSON.parse(savedListening));

    const savedWriting = localStorage.getItem('plida_writing_feedbacks');
    const savedSpeaking = localStorage.getItem('plida_speaking_feedbacks');
    if (savedWriting) setWritingFeedbacks(JSON.parse(savedWriting));
    if (savedSpeaking) setSpeakingFeedbacks(JSON.parse(savedSpeaking));

    const savedVocab = localStorage.getItem('plida_vocabulary_words');
    if (savedVocab) setSavedWords(JSON.parse(savedVocab));
  }, []);

  const handleUpdateStreak = (newStreak: number) => {
    setStreak(newStreak);
    localStorage.setItem('plida_streak', String(newStreak));
  };

  const handleAddWord = (wordData: Omit<VocabularyWord, 'id' | 'dateAdded'>) => {
    const newWordItem: VocabularyWord = {
      ...wordData,
      id: 'vocab_' + Date.now(),
      dateAdded: new Date().toISOString()
    };
    const updated = [newWordItem, ...savedWords];
    setSavedWords(updated);
    localStorage.setItem('plida_vocabulary_words', JSON.stringify(updated));
  };

  const handleDeleteWord = (id: string) => {
    const updated = savedWords.filter(item => item.id !== id);
    setSavedWords(updated);
    localStorage.setItem('plida_vocabulary_words', JSON.stringify(updated));
  };

  const handleUpdateWord = (updatedWord: VocabularyWord) => {
    const updated = savedWords.map(item => item.id === updatedWord.id ? updatedWord : item);
    setSavedWords(updated);
    localStorage.setItem('plida_vocabulary_words', JSON.stringify(updated));
  };

  const handleImportWords = (words: VocabularyWord[]) => {
    setSavedWords(words);
    localStorage.setItem('plida_vocabulary_words', JSON.stringify(words));
  };

  const handleDrillResult = (isCorrect: boolean) => {
    const nextTotal = grammarTotal + 1;
    const nextCorrect = isCorrect ? grammarCorrect + 1 : grammarCorrect;
    
    setGrammarTotal(nextTotal);
    setGrammarCorrect(nextCorrect);
    
    localStorage.setItem('plida_grammar_correct', String(nextCorrect));
    localStorage.setItem('plida_grammar_total', String(nextTotal));
  };

  const handleUpdateReadingScore = (sectionId: string, score: number) => {
    const next = { ...readingScores, [sectionId]: score };
    setReadingScores(next);
    localStorage.setItem('plida_reading_scores', JSON.stringify(next));
  };

  const handleUpdateListeningScore = (sectionId: string, score: number) => {
    const next = { ...listeningScores, [sectionId]: score };
    setListeningScores(next);
    localStorage.setItem('plida_listening_scores', JSON.stringify(next));
  };

  const handleSaveWritingFeedback = (promptId: string, feedback: AIPeedback) => {
    const next = { ...writingFeedbacks, [promptId]: feedback };
    setWritingFeedbacks(next);
    localStorage.setItem('plida_writing_feedbacks', JSON.stringify(next));
  };

  const handleSaveSpeakingFeedback = (promptId: string, feedback: AISpeakingFeedback) => {
    const next = { ...speakingFeedbacks, [promptId]: feedback };
    setSpeakingFeedbacks(next);
    localStorage.setItem('plida_speaking_feedbacks', JSON.stringify(next));
  };

  // Switch sections helper
  const navigateTo = (tab: typeof activeTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Compute overall total score percentage
  const totalCorrectReading = (Object.values(readingScores) as number[]).reduce((a, b) => a + b, 0);
  const totalCorrectListening = (Object.values(listeningScores) as number[]).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased" id="plida-app-root">
      
      {/* Top Banner Navigation */}
      <header className="sticky top-0 bg-white border-b border-slate-200/80 z-40 shadow-xs backdrop-blur-md" id="main-navigation-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo brand */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer hover:opacity-95 transition-opacity" 
            id="brand-logo-action"
          >
            <div className="w-10 h-10 bg-indigo-600 flex items-center justify-center rounded-xl text-white font-bold text-lg select-none shadow-sm shadow-indigo-100">
              P
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-sm tracking-tight block">PLIDA<span className="text-indigo-600 font-bold">B2</span></span>
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Dante Alighieri Prep</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5" id="nav-desktop-tabs">
            <button
              onClick={() => navigateTo('home')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'home' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Home className="w-3.5 h-3.5" /> Home
            </button>
            <button
              onClick={() => navigateTo('grammatica')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'grammatica' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" /> Grammatica
            </button>
            <button
              onClick={() => navigateTo('leggere')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'leggere' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Leggere
            </button>
            <button
              onClick={() => navigateTo('ascoltare')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'ascoltare' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" /> Ascoltare
            </button>
            <button
              onClick={() => navigateTo('scrivere')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'scrivere' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" /> Scrivere
            </button>
            <button
              onClick={() => navigateTo('parlare')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'parlare' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Mic className="w-3.5 h-3.5" /> Parlare
            </button>
            <button
              onClick={() => navigateTo('vocabolario')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'vocabolario' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-605 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" /> Vocabolario
            </button>
          </nav>

          {/* User Score status */}
          <div className="hidden sm:flex items-center gap-3 text-xs bg-slate-50 border border-slate-200 p-2 rounded-xl" id="scores-display-badge">
            <div className="text-right" id="ascolto-tot-stats">
              <span className="text-[10px] text-slate-400 font-bold block leading-none">LETTURA / ASCOLTO</span>
              <span className="font-bold text-slate-800 text-xs">
                {totalCorrectReading + totalCorrectListening} risposte esatte
              </span>
            </div>
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100" id="trophy-indicator-badge">
              <Trophy className="w-4 h-4" />
            </div>
          </div>

          {/* Hamburger toggle */}
          <div className="md:hidden" id="hamburger-bars-container">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
              id="hamburger-bars-btn"
            >
              <AlignLeft className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-2.5 animate-slide-down" id="nav-mobile-menu">
          <button
            onClick={() => navigateTo('home')}
            className={`w-full text-left flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg ${
              activeTab === 'home' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Home className="w-4 h-4" /> Home
          </button>
          <button
            onClick={() => navigateTo('grammatica')}
            className={`w-full text-left flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg ${
              activeTab === 'grammatica' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Grammatica B2
          </button>
          <button
            onClick={() => navigateTo('leggere')}
            className={`w-full text-left flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg ${
              activeTab === 'leggere' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Leggere
          </button>
          <button
            onClick={() => navigateTo('ascoltare')}
            className={`w-full text-left flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg ${
              activeTab === 'ascoltare' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Headphones className="w-4 h-4" /> Ascoltare
          </button>
          <button
            onClick={() => navigateTo('scrivere')}
            className={`w-full text-left flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg ${
              activeTab === 'scrivere' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <PenTool className="w-4 h-4" /> Scrivere
          </button>
          <button
            onClick={() => navigateTo('parlare')}
            className={`w-full text-left flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg ${
              activeTab === 'parlare' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Mic className="w-4 h-4" /> Parlare
          </button>
          <button
            onClick={() => navigateTo('vocabolario')}
            className={`w-full text-left flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg ${
              activeTab === 'vocabolario' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <BookMarked className="w-4 h-4" /> Vocabolario Bank
          </button>
        </div>
      )}

      {/* Core Screen Router Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8" id="core-screen-outlet">
        {activeTab === 'home' && (
          <IntroScreen 
            onStartSection={navigateTo}
            streak={streak}
            grammarCorrect={grammarCorrect}
            grammarTotal={grammarTotal}
          />
        )}

        {activeTab === 'leggere' && (
          <LeggereSectionView 
            onBack={() => navigateTo('home')}
            onUpdateScore={handleUpdateReadingScore}
            onAddWord={handleAddWord}
          />
        )}

        {activeTab === 'ascoltare' && (
          <AscoltareSectionView 
            onBack={() => navigateTo('home')}
            onUpdateScore={handleUpdateListeningScore}
          />
        )}

        {activeTab === 'scrivere' && (
          <ScrivereSectionView 
            onBack={() => navigateTo('home')}
            savedFeedback={writingFeedbacks}
            onSaveFeedback={handleSaveWritingFeedback}
          />
        )}

        {activeTab === 'parlare' && (
          <ParlareSectionView 
            onBack={() => navigateTo('home')}
            savedFeedback={speakingFeedbacks}
            onSaveFeedback={handleSaveSpeakingFeedback}
          />
        )}

        {activeTab === 'grammatica' && (
          <GrammaticaSectionView 
            onBack={() => navigateTo('home')}
            streak={streak}
            onUpdateStreak={handleUpdateStreak}
            onDrillResult={handleDrillResult}
            onAddWord={handleAddWord}
          />
        )}

        {activeTab === 'vocabolario' && (
          <VocabularyBankView 
            onBack={() => navigateTo('home')}
            savedWords={savedWords}
            onAddWord={handleAddWord}
            onDeleteWord={handleDeleteWord}
            onUpdateWord={handleUpdateWord}
            onImportWords={handleImportWords}
          />
        )}
      </main>

      {/* Styled Footer containing credits */}
      <footer className="bg-white border-t border-neutral-200 mt-12 py-6 text-center text-xs text-neutral-400 font-medium" id="plida-app-footer">
        <p>&copy; {new Date().getFullYear()} PLIDA B2 Italian Practice Hub. Sviluppato per la preparazione autonoma all'esame.</p>
        <p className="mt-1">Punteggi e saggi corretti tramite l'AI d'avanguardia.</p>
      </footer>

    </div>
  );
}
