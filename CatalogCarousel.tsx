import { useRef, useState, useEffect, useCallback } from 'react';
import { catalogData } from '../lib/catalogImages';
import { useInView } from '../hooks/useInView';
import ProductModal, { type Product } from './ProductModal';

const G = ['from-brand-700 to-brand-800', 'from-brand-600 to-brand-800', 'from-brand-700 to-brand-900', 'from-brand-500 to-brand-700'];

function Card({ product: p, onClick }: { product: Product; onClick: () => void }) {
  const [err, setErr] = useState(false);
  const img = p.images[0] && !err;
  return (
    <button onClick={onClick} className="w-[210px] sm:w-[250px] flex-shrink-0 bg-brand-900/60 rounded-xl overflow-hidden border border-brand-800/50 hover:border-brand-600/60 transition-all duration-400 text-left group cursor-pointer">
      <div className="relative h-[140px] sm:h-[160px] overflow-hidden bg-brand-800">
        {img ? <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" onError={() => setErr(true)} />
          : <div className={`w-full h-full bg-gradient-to-br ${G[p.id % G.length]} flex items-center justify-center p-3`}><span className="font-heading text-sm text-brand-300 text-center">{p.name}</span></div>}
        <div className="absolute top-2 left-2"><span className="text-[8px] px-2 py-0.5 rounded-full bg-black/50 text-white/80 backdrop-blur-sm tracking-wider uppercase">{p.brand}</span></div>
      </div>
      <div className="p-3.5">
        <p className="text-[9px] text-brand-500 tracking-wider uppercase mb-1">{p.category}</p>
        <h3 className="font-heading text-sm text-brand-200 leading-snug mb-1.5 group-hover:text-brand-100 transition-colors line-clamp-2">{p.name}</h3>
        <div className="flex items-center justify-between pt-2.5 border-t border-brand-800/50">
          <span className="text-sm text-brand-200 font-medium">{p.price}</span>
          <span className="text-[9px] text-brand-500">→</span>
        </div>
      </div>
    </button>
  );
}

export default function CatalogCarousel() {
  const { ref: secRef, isVisible: v } = useInView(.1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState<Product | null>(null);
  const isDrag = useRef(false);
  const drag = useRef({ x: 0, sl: 0 });
  const anim = useRef(0);
  const acc = useRef(0);
  const products: Product[] = catalogData as Product[];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !products.length) return;
    acc.current = el.scrollLeft;
    const tick = () => {
      if (!isDrag.current && el) {
        acc.current += 0.42;
        if (acc.current >= el.scrollWidth / 2) acc.current -= el.scrollWidth / 2;
        el.scrollLeft = acc.current;
      } else if (el) acc.current = el.scrollLeft;
      anim.current = requestAnimationFrame(tick);
    };
    anim.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(anim.current);
  }, [products.length]);

  const dn = useCallback((x: number) => { isDrag.current = true; drag.current = { x, sl: scrollRef.current?.scrollLeft ?? 0 }; }, []);
  const mv = useCallback((x: number) => { if (!isDrag.current || !scrollRef.current) return; scrollRef.current.scrollLeft = drag.current.sl - (x - drag.current.x); acc.current = scrollRef.current.scrollLeft; }, []);
  const up = useCallback(() => { isDrag.current = false; }, []);

  if (!products.length) return null;

  return (
    <section ref={secRef} className="py-14 sm:py-18 overflow-hidden border-t border-brand-800/40">
      <div className={`max-w-7xl mx-auto px-5 sm:px-8 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 transition-all duration-700 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div>
          <span className="text-[10px] tracking-[.3em] text-brand-500 uppercase block mb-1">Ассортимент</span>
          <h2 className="font-heading text-2xl sm:text-3xl text-brand-100">Каталог</h2>
        </div>
        <a href="/#/catalog" className="text-xs text-brand-500 hover:text-brand-300 transition-colors group inline-flex items-center gap-1">Весь каталог <span className="group-hover:translate-x-0.5 transition-transform">→</span></a>
      </div>
      <div ref={scrollRef} className="flex gap-4 px-5 no-scrollbar overflow-x-auto cursor-grab active:cursor-grabbing select-none"
        onMouseDown={e => dn(e.clientX)} onMouseMove={e => mv(e.clientX)} onMouseUp={up} onMouseLeave={up}
        onTouchStart={e => dn(e.touches[0].clientX)} onTouchMove={e => mv(e.touches[0].clientX)} onTouchEnd={up}>
        {[...products, ...products].map((p, i) => <Card key={`${p.id}-${i}`} product={p} onClick={() => setSel(p)} />)}
      </div>
      {sel && <ProductModal product={sel} onClose={() => setSel(null)} />}
    </section>
  );
}
