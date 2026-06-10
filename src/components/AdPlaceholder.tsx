/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExternalLink, Book, HelpCircle, GraduationCap, Percent, ShoppingBag } from 'lucide-react';

interface AdItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  ctaText: string;
  link: string;
  icon: React.ReactNode;
  badge: 'Sponsorizzato' | 'Consigliato Amazon' | 'Offerta Afflusso' | 'Affiliazione';
}

const ADS_DATABASE: AdItem[] = [
  {
    id: 'amazon-book-quaderno',
    title: 'Quaderno di Allenamento PLIDA B2',
    tagline: 'Il libro di preparazione ufficiale più venduto',
    description: 'Acquista su Amazon la guida completa con 10 simulazioni d’esame ufficiali per affinare la comprensione scritta ed orale.',
    ctaText: 'Vedi su Amazon',
    link: 'https://www.amazon.it/s?k=plida+b2+italiano',
    icon: <Book className="w-5 h-5 text-amber-600" />,
    badge: 'Consigliato Amazon'
  },
  {
    id: 'italki-tutoring',
    title: 'Lezioni di Conversazione su Italki',
    tagline: 'Parla come un madrelingua per la prova orale',
    description: 'Prenota un tutor certificato PLIDA. Esercitati nel "Parlato interattivo" e supera le ansie da esame con una sessione personalizzata.',
    ctaText: 'Sconto 10$ Registrazione',
    link: 'https://www.italki.com',
    icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
    badge: 'Sponsorizzato'
  },
  {
    id: 'treccani-dictionary',
    title: 'Nuovo Vocabolario Treccani Online',
    tagline: 'Arricchisci la tua scrittura e il tuo lessico',
    description: 'Usa l’abbonamento Premium scontato per trovare sinonimi, contrari ed espressioni idiomatiche indispensabili per un testo B2 di livello superiore.',
    ctaText: 'Attiva Abbonamento',
    link: 'https://www.treccani.it',
    icon: <ShoppingBag className="w-5 h-5 text-emerald-600" />,
    badge: 'Affiliazione'
  },
  {
    id: 'vhs-video-course',
    title: 'Corso Video PLIDA B2 Completo',
    tagline: 'Impara tutti i trucchi e sconfiggi la clessidra',
    description: '40 lezioni in HD dedicate a ciascuna parte dell’esame. Impara ad ascoltare, pianificare lo scritto e negoziare efficacemente nel parlato.',
    ctaText: 'Accedi al 50% di Sconto',
    link: 'https://www.udemy.com',
    icon: <Percent className="w-5 h-5 text-rose-600" />,
    badge: 'Sponsorizzato'
  }
];

interface AdPlaceholderProps {
  type: 'sidebar' | 'banner' | 'inline';
  preferredId?: string;
}

export default function AdPlaceholder({ type, preferredId }: AdPlaceholderProps) {
  // Find specific ad or take one based on layout
  const ad = preferredId 
    ? ADS_DATABASE.find(item => item.id === preferredId) || ADS_DATABASE[0]
    : type === 'banner' 
      ? ADS_DATABASE[1] 
      : type === 'sidebar' 
        ? ADS_DATABASE[0] 
        : ADS_DATABASE[2];

  const handleCtaClick = () => {
    // Elegant toast console or warning for preview
    console.log(`Simulazione reindirizzamento link ad / affiliazione sponsorizzato: ${ad.link}`);
  };

  if (type === 'banner') {
    return (
      <div 
        className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-3xs animate-fade-in"
        id={`ad-banner-${ad.id}`}
      >
        <div className="flex items-start gap-3.5" id={`ad-banner-context-${ad.id}`}>
          <div className="p-2.5 bg-white border border-slate-200 rounded-xl hidden sm:flex items-center justify-center shrink-0 shadow-3xs" id="ad-banner-icon-box">
            {ad.icon}
          </div>
          <div className="space-y-1" id="ad-banner-text-block">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[9px] font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200/50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                {ad.badge}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Offerta Partner</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">{ad.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{ad.description}</p>
          </div>
        </div>
        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCtaClick}
          className="w-full md:w-auto px-4 py-2 bg-slate-900 hover:bg-indigo-600 hover:scale-[1.01] text-xs font-bold text-white rounded-xl text-center shadow-sm flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer"
          id={`ad-banner-cta-${ad.id}`}
        >
          {ad.ctaText}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  if (type === 'sidebar') {
    return (
      <div 
        className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3.5 shadow-3xs animate-fade-in flex flex-col justify-between"
        id={`ad-sidebar-${ad.id}`}
      >
        <div className="space-y-2.5" id={`ad-sidebar-content-${ad.id}`}>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-extrabold bg-amber-50 border border-amber-200 text-amber-800 px-2 py-0.5 rounded-md uppercase tracking-wider">
              {ad.badge}
            </span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Affiliato</span>
          </div>
          
          <div className="flex items-center gap-2.5" id="ad-sidebar-header">
            <div className="p-2 bg-white border border-slate-150 rounded-lg shadow-3xs shrink-0">
              {ad.icon}
            </div>
            <h4 className="text-xs font-extrabold text-slate-900 leading-snug tracking-tight">
              {ad.title}
            </h4>
          </div>
          
          <p className="text-[11px] text-slate-500 leading-relaxed">
            {ad.tagline}. {ad.description}
          </p>
        </div>

        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCtaClick}
          className="w-full mt-2 py-2 bg-white hover:bg-slate-900 text-slate-700 hover:text-white border border-slate-200 hover:border-slate-900 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1 cursor-pointer transition-all shadow-3xs"
          id={`ad-sidebar-cta-${ad.id}`}
        >
          {ad.ctaText}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  // default to inline Card display
  return (
    <div 
      className="bg-indigo-50/40 border border-indigo-100/70 p-4 rounded-xl flex items-center justify-between gap-3 text-xs"
      id={`ad-inline-${ad.id}`}
    >
      <div className="flex items-center gap-2.5" id={`ad-inline-body-${ad.id}`}>
        <div className="text-indigo-600 bg-white p-2 border border-indigo-150 rounded-lg">
          {ad.icon}
        </div>
        <div id="ad-inline-text">
          <div className="text-[8px] font-extrabold text-indigo-700 uppercase tracking-widest">{ad.badge}</div>
          <span className="font-bold text-slate-850 leading-snug block">{ad.title}</span>
          <span className="text-[10px] text-slate-500 line-clamp-1">{ad.tagline}</span>
        </div>
      </div>
      <a
        href={ad.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCtaClick}
        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 font-bold text-white text-[10px] rounded-lg cursor-pointer transition-colors shrink-0 flex items-center gap-0.5"
        id={`ad-inline-cta-${ad.id}`}
      >
        {ad.ctaText}
        <ExternalLink className="w-2.5 h-2.5" />
      </a>
    </div>
  );
}
