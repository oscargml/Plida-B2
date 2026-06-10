/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Headphones, PenTool, Mic, Award, CheckCircle, Flame, Bookmark } from 'lucide-react';
import AdPlaceholder from './AdPlaceholder';

interface IntroScreenProps {
  onStartSection: (section: 'ascoltare' | 'leggere' | 'scrivere' | 'parlare' | 'grammatica' | 'vocabolario') => void;
  streak: number;
  grammarCorrect: number;
  grammarTotal: number;
}

export default function IntroScreen({ onStartSection, streak, grammarCorrect, grammarTotal }: IntroScreenProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in" id="intro-screen">
      {/* Hero Welcome */}
      <div className="text-center space-y-3" id="welcome-hero">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wider shadow-xs" id="level-badge">
          <Award className="w-4 h-4 text-indigo-600" />
          Livello Certificazione B2 (PLIDA)
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-sans" id="app-title">
          PLIDA<span className="text-indigo-600">B2</span> Italian Prep
        </h1>
        <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed" id="app-desc">
          Supera l'esame della Società Dante Alighieri con simulazioni reali ed esercizi di grammatica mirati con correzioni guidate dall'Intelligenza Artificiale.
        </p>
      </div>

      {/* User Performance Badge */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs" id="performance-summary">
        <div className="flex items-center gap-3.5" id="streak-indicator">
          <div className="p-3.5 bg-rose-50 rounded-xl text-rose-600 border border-rose-100">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Striscia di studio (Streak)</div>
            <div className="text-xl font-bold text-slate-900">{streak} {streak === 1 ? 'giorno' : 'giorni'} di fila</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5" id="drills-indicator">
          <div className="p-3.5 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Drill di Grammatica</div>
            <div className="text-xl font-bold text-slate-900">
              {grammarTotal > 0 ? `${grammarCorrect}/${grammarTotal} (${Math.round((grammarCorrect / grammarTotal) * 100)}%)` : 'Nessuno completato'}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Sponsoring Banner */}
      <AdPlaceholder type="banner" preferredId="italki-tutoring" />

      {/* Test Sections Grid */}
      <div className="space-y-4" id="sections-container">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight border-b border-slate-200 pb-2 flex items-center justify-between">
          <span>Abilità d'Esame &amp; Pratica B2</span>
          <span className="text-xs font-medium text-slate-400">Seleziona una sezione</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="skills-grid">
          
          {/* LINGUA & GRAMM */}
          <div 
            onClick={() => onStartSection('grammatica')}
            className="flex flex-col justify-between p-6 bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-indigo-400/80 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-md group shadow-xs"
            id="menu-card-grammatica"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center border border-amber-100 font-bold text-lg select-none">🏋️‍♂️</div>
                <span className="text-xs font-extrabold text-amber-800 bg-amber-100/70 border border-amber-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Pratica Infinita</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Palestra di Grammatica B2</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Esercitati con pronomi combinati, espressione coniugata del congiuntivo, passivo e periodi ipotetici con correzione e spiegazione istantanee delle regole.
              </p>
            </div>
            <div className="mt-5 text-xs font-bold text-indigo-600 flex items-center gap-1">
              Inizia gli esercizi &rarr;
            </div>
          </div>

          {/* LEGGERE */}
          <div 
            onClick={() => onStartSection('leggere')}
            className="flex flex-col justify-between p-6 bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-indigo-400/80 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-md group shadow-xs"
            id="menu-card-leggere"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="p-2.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl group-hover:bg-indigo-100 transition-colors">
                  <BookOpen className="w-5 h-5" />
                </span>
                <span className="text-xs text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100 font-semibold">4 parti • 15 punti</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Leggere (Reading)</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Cultura e attualità. Quattro compiti reali di ricostruzione, abbinamento domande-paragrafi e comprensione con risposte chiuse.
              </p>
            </div>
            <div className="mt-5 text-xs font-bold text-indigo-600 flex items-center gap-1">
              Inizia la prova &rarr;
            </div>
          </div>

          {/* ASCOLTARE */}
          <div 
            onClick={() => onStartSection('ascoltare')}
            className="flex flex-col justify-between p-6 bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-indigo-400/80 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-md group shadow-xs"
            id="menu-card-ascoltare"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="p-2.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl group-hover:bg-indigo-100 transition-colors">
                  <Headphones className="w-5 h-5" />
                </span>
                <span className="text-xs text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100 font-semibold">4 parti • 15 punti</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Ascoltare (Listening)</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Interviste e dialoghi. Esegui la simulazione dei brani audio con il lettore integrato a sintesi vocale e connettiti con gli argomenti d'esame.
              </p>
            </div>
            <div className="mt-5 text-xs font-bold text-indigo-600 flex items-center gap-1">
              Inizia la prova &rarr;
            </div>
          </div>

          {/* SCRIVERE */}
          <div 
            onClick={() => onStartSection('scrivere')}
            className="flex flex-col justify-between p-6 bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-indigo-400/80 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-md group shadow-xs"
            id="menu-card-scrivere"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="p-2.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl group-hover:bg-indigo-100 transition-colors">
                  <PenTool className="w-5 h-5" />
                </span>
                <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-150 font-semibold">Correzione AI PLIDA</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Scrivere (Writing)</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Redigi un articolo espositivo basato su grafici e statistiche o un post per blog. Ricevi un report dettagliato e voti di grammatica e sintassi con l'AI.
              </p>
            </div>
            <div className="mt-5 text-xs font-bold text-indigo-600 flex items-center gap-1">
              Inizia la prova &rarr;
            </div>
          </div>

          {/* PARLARE */}
          <div 
            onClick={() => onStartSection('parlare')}
            className="flex flex-col justify-between p-6 bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-indigo-400/80 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-md group shadow-xs"
            id="menu-card-parlare"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="p-2.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl group-hover:bg-indigo-100 transition-colors">
                  <Mic className="w-5 h-5" />
                </span>
                <span className="text-xs text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100 font-semibold">Parlato Interattivo</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Parlare (Speaking Practice)</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Prepara monologhi e discussioni commerciali. Registra la tua voce in italiano, convertila in testo e ottieni preziosi feedback di fluidità verbale.
              </p>
            </div>
            <div className="mt-5 text-xs font-bold text-indigo-600 flex items-center gap-1">
              Inizia la prova &rarr;
            </div>
          </div>

          {/* VOCABOLARIO */}
          <div 
            onClick={() => onStartSection('vocabolario')}
            className="flex flex-col justify-between p-6 bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-indigo-400/80 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-md group shadow-xs"
            id="menu-card-vocabolario"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="p-2.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl group-hover:bg-indigo-100 transition-colors">
                  <Bookmark className="w-5 h-5 text-indigo-600" />
                </span>
                <span className="text-xs text-violet-800 bg-violet-50 px-2.5 py-0.5 rounded-md border border-violet-100 font-semibold">Salvadanaio • Flashcards</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Vocabolario Bank B2</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Salva i termini difficili incontrati durante la lettura o la grammatica. Mettiti alla prova con flashcard interattive e domande a scelta multipla.
              </p>
            </div>
            <div className="mt-5 text-xs font-bold text-indigo-600 flex items-center gap-1">
              Apri il vocabolario &rarr;
            </div>
          </div>

        </div>
      </div>

      {/* PLIDA B2 general guide info & sponsored book */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="bottom-tips-ads-grid">
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 text-sm space-y-4 shadow-3xs" id="plida-exam-tips">
          <h4 className="font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <span className="text-indigo-600 font-bold">📌</span> Consigli Chiave per l'Esame PLIDA B2
          </h4>
          <ul className="list-none space-y-3 text-slate-600 leading-relaxed text-xs">
            <li className="flex gap-2 items-start">
              <span className="text-indigo-500 font-bold mt-0.5">•</span>
              <span><strong>B2 Autonomia:</strong> Devi saper sostenere le tue opinioni in conversazioni, spiegare e difendere i tuoi punti di vista con precisione grammaticale e coerenza testuale.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-indigo-500 font-bold mt-0.5">•</span>
              <span><strong>Gestione del tempo:</strong> 50 minuti per la prova di Ascolto, 70 minuti per la prova di Lettura, 60 minuti per lo Scritto. Allena la tua sveltezza cognitiva!</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-indigo-500 font-bold mt-0.5">•</span>
              <span><strong>La palestra grammaticale:</strong> Molti errori derivano dall'accordo scorretto del participio passato e dalla confusione tra indicativo imperfetto e congiuntivo nella subordinazione. Ripassa bene prima di fare lo scritto.</span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-1 flex flex-col justify-between" id="intro-sidebar-ad">
          <AdPlaceholder type="sidebar" preferredId="amazon-book-quaderno" />
        </div>
      </div>

    </div>
  );
}
