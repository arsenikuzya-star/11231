import { useEffect, useState, useCallback } from 'react';
import { contacts } from '../lib/data';
import { CloseIcon, PhoneIcon, ChevronLeftIcon, ChevronRightIcon, TelegramIcon, WhatsAppIcon } from './Icons';

export interface Product { id: number; name: string; brand: string; category: string; description: string; fullDescription?: string; price: string; inStock: boolean; images: string[]; features?: string[]; }

const G = ['from-brand-600 to-brand-800', 'from-brand-500 to-brand-700', 'from-brand-700 to-brand-900'];

export default function ProductModal({ product: p, onClose }: { product: Product; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const [imgErr, setImgErr] = useState<Record<number, boolean>>({});
  const esc = useCallback((e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); }, [onClose]);
  useEffect(() => { window.addEventListener('keydown', esc); document.body.style.overflow = 'hidden'; return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = ''; }; }, [esc]);

  const img = p.images[idx] && !imgErr[idx] ? p.images[idx] : null;
  const grad = G[p.id % G.length];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative bg-brand-900 border border-brand-800/60 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl" style={{ animation: 'modalIn .3s ease' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 z-10 p-2 rounded-full bg-brand-800/80 text-brand-400 hover:text-brand-100 transition-colors" aria-label="Закрыть"><CloseIcon className="w-5 h-5" /></button>

        <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-brand-800">
          {img ? <img src={img} alt={p.name} className="w-full h-full object-cover" onError={() => setImgErr(prev => ({ ...prev, [idx]: true }))} />
            : <div className={`w-full h-full bg-gradient-to-br ${grad} flex flex-col items-center justify-center gap-2`}><span className="font-heading text-2xl text-brand-200 text-center px-6">{p.name}</span><span className="text-brand-400 text-sm">{p.category}</span></div>}
          {p.images.length > 1 && (<>
            <button onClick={() => setIdx(i => (i - 1 + p.images.length) % p.images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"><ChevronLeftIcon className="w-5 h-5" /></button>
            <button onClick={() => setIdx(i => (i + 1) % p.images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"><ChevronRightIcon className="w-5 h-5" /></button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">{p.images.map((_, i) => <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/40'}`} />)}</div>
          </>)}
          <div className="absolute top-3 left-3"><span className="text-[9px] px-2.5 py-1 rounded-full bg-black/50 text-white/90 backdrop-blur-sm tracking-wider">{p.brand}</span></div>
        </div>

        <div className="p-6 sm:p-8">
          <h2 className="font-heading text-2xl sm:text-3xl text-brand-100 leading-tight">{p.name}</h2>
          <div className="flex flex-wrap gap-2 mt-2 mb-4">
            <span className="text-[10px] px-2.5 py-1 rounded-full border border-brand-700 text-brand-400">{p.category}</span>
            <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${p.inStock ? 'bg-brand-400 text-brand-950' : 'bg-brand-800 text-brand-500'}`}>{p.inStock ? '● В наличии' : '○ Под заказ'}</span>
          </div>
          <p className="text-brand-400 leading-relaxed text-sm mb-4">{p.fullDescription || p.description}</p>
          <div className="text-3xl font-heading text-brand-100 mb-6 pb-6 border-b border-brand-800/50">{p.price}</div>
          {p.features?.length ? (
            <div className="mb-6">
              <h3 className="text-[10px] font-medium uppercase tracking-[.2em] text-brand-500 mb-3">Характеристики</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{p.features.map((f, i) => <div key={i} className="flex items-start gap-2 text-sm text-brand-400"><div className="w-px h-4 bg-brand-600 shrink-0 mt-0.5" />{f}</div>)}</div>
            </div>
          ) : null}
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`tel:${contacts.phone}`} target="_top" className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-brand-100 text-brand-950 rounded-xl hover:bg-white transition-all text-sm font-medium"><PhoneIcon className="w-4 h-4" />Позвонить</a>
            <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-5 py-3 border border-brand-700 text-brand-300 rounded-xl hover:border-brand-500 transition-all text-sm"><WhatsAppIcon className="w-4 h-4" />WhatsApp</a>
            <a href={contacts.telegram} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-5 py-3 border border-brand-700 text-brand-300 rounded-xl hover:border-brand-500 transition-all text-sm"><TelegramIcon className="w-4 h-4" />Telegram</a>
          </div>
        </div>
      </div>
      <style>{`@keyframes modalIn{from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </div>
  );
}
