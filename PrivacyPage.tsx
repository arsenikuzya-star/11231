import React from 'react';
import { privacyTitle, privacyText } from '../lib/privacy';

function render(text: string) {
  const lines = text.trim().split('\n');
  const els: React.JSX.Element[] = [];
  let list: string[] = [];
  const flush = () => { if (list.length) { els.push(<ul key={`l${els.length}`} className="list-disc list-inside space-y-1 mb-4 text-brand-400">{list.map((t, i) => <li key={i} className="text-sm leading-relaxed">{t}</li>)}</ul>); list = []; } };
  for (const l of lines) {
    const t = l.trim();
    if (t.startsWith('## ')) { flush(); els.push(<h2 key={`h${els.length}`} className="font-heading text-lg text-brand-100 mt-8 mb-3">{t.slice(3)}</h2>); }
    else if (t.startsWith('- ')) { list.push(t.slice(2)); }
    else if (t.startsWith('---')) { flush(); els.push(<hr key={`r${els.length}`} className="my-6 border-brand-800" />); }
    else if (t.startsWith('*') && t.endsWith('*')) { flush(); els.push(<p key={`e${els.length}`} className="text-sm text-brand-600 italic">{t.replace(/\*/g, '')}</p>); }
    else if (t) { flush(); els.push(<p key={`p${els.length}`} className="text-sm text-brand-400 leading-relaxed mb-3">{t}</p>); }
  }
  flush();
  return els;
}

export default function PrivacyPage() {
  return (
    <main className="pt-24 sm:pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <h1 className="font-heading text-3xl sm:text-4xl text-brand-100 mb-8 text-center">{privacyTitle}</h1>
        <div className="bg-brand-900/60 border border-brand-800/50 rounded-2xl p-6 sm:p-10">{render(privacyText)}</div>
      </div>
    </main>
  );
}
