/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ascoltareSections } from '../data';
import { Headphones, Play, Square, Pause, Eye, EyeOff, CheckCircle, XCircle, ArrowLeft, ArrowRight, RefreshCw, Info, Volume2 } from 'lucide-react';

interface AscoltareSectionViewProps {
  onBack: () => void;
  onUpdateScore: (sectionId: string, score: number) => void;
}

export default function AscoltareSectionView({ onBack, onUpdateScore }: AscoltareSectionViewProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  const section = ascoltareSections[activeTab];

  // Ref to track SpeechSynthesisUtterance
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Stop reading if user switches tab or leaves screen
  useEffect(() => {
    stopAudio();
    return () => {
      stopAudio();
    };
  }, [activeTab]);

  const startAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPaused && utteranceRef.current) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
        setIsPaused(false);
        return;
      }

      window.speechSynthesis.cancel(); // Stop any pending speech

      // We strip the example text from the transcript when reading or read normally
      const textToRead = section.transcript;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'it-IT';
      
      // Try to find a premium Italian voice if available
      const voices = window.speechSynthesis.getVoices();
      const italianVoice = voices.find(v => v.lang.startsWith('it'));
      if (italianVoice) {
        utterance.voice = italianVoice;
      }
      
      utterance.rate = 0.88; // Slightly slow/clear Italian B2 level pace

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        utteranceRef.current = null;
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
        utteranceRef.current = null;
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
    } else {
      alert('La sintesi vocale non è supportata dal tuo browser. Puoi comunque leggere la trascrizione.');
    }
  };

  const pauseAudio = () => {
    if ('speechSynthesis' in window && isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
    }
  };

  const handleSelectAnswer = (questionId: string | number, value: string) => {
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
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in" id="ascoltare-view-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 pb-4" id="ascoltare-header">
        <div className="space-y-1.5">
          <button 
            onClick={onBack}
            className="text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer transition-colors uppercase tracking-wider"
            id="back-home-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Torna al menu principale
          </button>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight" id="ascoltare-title">
            Sezione: Ascoltare (Comprensione Orale)
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl self-start border border-slate-200" id="tabs-bar">
          {ascoltareSections.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveTab(idx);
                setIsSubmitted(false);
                setShowTranscript(false);
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
      <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xs" id="ascolto-intro-card">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-800" id="ascolto-brand">
            <Headphones className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900">
              {section.title} - {section.subtitle}
            </h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            {section.instructions}
          </p>
        </div>
        <div className="text-xs bg-indigo-100 text-indigo-800 font-extrabold px-3 py-1.5 rounded-xl border border-indigo-200 self-start sm:self-center uppercase tracking-wider">
          Durata: {section.audioDuration}
        </div>
      </div>

      {/* PREMIUM AUDIO PLAYER */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4 text-white" id="ascoltare-audio-player">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6" id="player-layout">
          {/* Audio Controls */}
          <div className="flex items-center gap-4" id="control-buttons">
            {!isPlaying ? (
              <button 
                onClick={startAudio}
                className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 text-white outline-none shadow-md shadow-indigo-900/30"
                id="play-audio-btn"
                title="Ascolta brano"
              >
                <Play className="w-6 h-6 fill-white" />
              </button>
            ) : (
              <button
                onClick={pauseAudio}
                className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 text-white outline-none"
                id="pause-audio-btn"
                title="Sospendi brano"
              >
                <Pause className="w-6 h-6 fill-white" />
              </button>
            )}
            <button
              onClick={stopAudio}
              className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center cursor-pointer border border-slate-705 text-slate-300"
              id="stop-audio-btn"
              title="Stop audio"
            >
              <Square className="w-4 h-4 fill-slate-300" />
            </button>
          </div>

          {/* Sound wave simulation */}
          <div className="flex-1 w-full space-y-1 text-center sm:text-left" id="waveform-desc">
            <div className="text-sm font-bold text-slate-200 flex items-center justify-center sm:justify-start gap-1">
              <Volume2 className="w-4 h-4 text-indigo-400 animate-bounce" />
              {isPlaying ? 'Lettura in corso...' : 'Lettore di sintesi vocale (Voce Italiana)'}
            </div>
            <div className="h-6 flex items-center justify-center sm:justify-start gap-1" id="waveform-ribbon">
              {isPlaying ? (
                Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-indigo-500 rounded-full transition-all duration-300 animate-pulse"
                    style={{
                      height: `${Math.floor(Math.random() * 20) + 4}px`,
                      animationDelay: `${i * 30}ms`
                    }}
                  />
                ))
              ) : (
                <div className="text-xs text-slate-400">Clicca Play per iniziare l'ascolto guidato in italiano.</div>
              )}
            </div>
          </div>

          {/* Transcript toggle */}
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-700 hover:border-slate-500 rounded-lg text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-all cursor-pointer"
            id="transcript-toggle-btn"
          >
            {showTranscript ? (
              <>
                <EyeOff className="w-4 h-4" /> Nascondi testo
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" /> Vedi trascrizione
              </>
            )}
          </button>
        </div>

        {/* TRANSCRIPT AREA */}
        {showTranscript && (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-56 overflow-y-auto text-xs text-slate-300 leading-relaxed space-y-2 animate-slide-down" id="transcript-box">
            <div className="font-bold text-indigo-400 flex items-center justify-between">
              <span>TRASCRIZIONE DEL DIALOGO</span>
              <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded-full text-slate-450">Livello B2</span>
            </div>
            <p className="whitespace-pre-wrap">{section.transcript}</p>
          </div>
        )}
      </div>

      {/* QUESTIONS SECTION */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6" id="listening-exercises-container">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5 mb-3 block">
          Domande associate all'ascolto
        </div>

        <div className="space-y-5" id="listening-questions-grid">
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
                id={`listening-question-card-${item.id}`}
              >
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.question}
                </h4>

                {/* Option selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id={`options-${item.id}`}>
                  {item.options?.map((opt) => {
                    const optLetter = opt.charAt(0);
                    const isSelected = uValue === opt;
                    const isCorrectOpt = optLetter === item.correctAnswer;

                    return (
                      <button
                        key={opt}
                        disabled={isSubmitted}
                        onClick={() => handleSelectAnswer(item.id, opt)}
                        className={`text-left text-xs p-2.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                          isSubmitted
                            ? isCorrectOpt
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-extrabold'
                              : isSelected
                                ? 'bg-rose-100 border-rose-400 text-rose-900'
                                : 'bg-slate-50/50 border-slate-200 text-slate-400'
                            : isSelected
                              ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                              : 'bg-slate-55 hover:bg-slate-100/70 border-slate-200 text-slate-700'
                        }`}
                        id={`listening-opt-${item.id}-${optLetter}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Question feedback */}
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

        {/* Action Panel */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between" id="listening-actions">
          {!isSubmitted ? (
            <button
              disabled={!currentAnswersFilled}
              onClick={handleSubmit}
              className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all text-center cursor-pointer ${
                currentAnswersFilled
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
              id="listening-submit-btn"
            >
              {currentAnswersFilled ? 'Invia Risposte' : 'Seleziona tutte le risposte prima di procedere'}
            </button>
          ) : (
            <div className="flex items-center justify-between w-full gap-4" id="listening-score-summary">
              <div className="text-sm font-bold text-slate-800">
                Punteggio dell'ascolto: <span className="text-indigo-600 text-lg font-extrabold">{getSectionScore()} / {section.items.length}</span>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-4 py-2 border border-slate-300 text-slate-600 font-bold rounded-lg text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                id="listening-retry-btn"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Riprova
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200" id="listening-pagination">
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
          id="prev-listening-part-btn"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Parte precedente
        </button>

        <span className="text-xs font-bold text-slate-450 uppercase tracking-wider">
          Parte {activeTab + 1} di {ascoltareSections.length}
        </span>

        <button
          disabled={activeTab === ascoltareSections.length - 1}
          onClick={() => {
            setActiveTab((prev) => prev + 1);
            setIsSubmitted(false);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-semibold transition-all ${
            activeTab === ascoltareSections.length - 1
              ? 'text-slate-300 border-slate-100 cursor-not-allowed'
              : 'text-slate-700 hover:bg-slate-50 border-slate-200 cursor-pointer'
          }`}
          id="next-listening-part-btn"
        >
          Parte successiva <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
