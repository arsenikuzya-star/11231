import { useRef, useState, useCallback, useEffect } from 'react';
import { beforeAfter } from '../lib/data';
import { useInView } from '../hooks/useInView';

interface BAItem { id: number; title: string; before: string; after: string; }

function SplitCard({ item }: { item: BAItem }) {
  const [bE, setBE] = useState(false);
  const [aE, setAE] = useState(false);
  return (
    <div className="relative flex-shrink-0 w-[86vw] sm:w-[560px] lg:w-[680px] aspect-[16/9] rounded-2xl overflow-hidden border border-brand-800/50 group">
      <div className="absolute left-0 top-0 bottom-0 w-1/2 overflow-hidden bg-brand-800">
        {item.before && !bE
          ? <img src={item.before} alt="До" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" onError={() => setBE(true)} />
          : <div className="w-full h-full bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center"><span className="text-brand-500 font-heading text-lg">До</span></div>}
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/30 to-transparent" />
        <span className="absolute bottom-3 left-3 text-[10px] text-white/80 font-semibold tracking-[.25em] uppercase drop-shadow-lg">До</span>
      </div>
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/60 z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/90 shadow-xl flex items-center justify-center">
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 4H13M1 4L3.5 1.5M1 4L3.5 6.5M13 4L10.5 1.5M13 4L10.5 6.5" stroke="#333" strokeWidth="1.4" strokeLinecap="round"/></svg>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden bg-brand-700">
        {item.after && !aE
          ? <img src={item.after} alt="После" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" onError={() => setAE(true)} />
          : <div className="w-full h-full bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center"><span className="text-brand-400 font-heading text-lg">После</span></div>}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/30 to-transparent" />
        <span className="absolute bottom-3 right-3 text-[10px] text-white/80 font-semibold tracking-[.25em] uppercase drop-shadow-lg">После</span>
      </div>
      <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-black/50 to-transparent z-10 flex items-start px-4 pt-3">
        <span className="text-white/80 text-xs font-medium tracking-wide drop-shadow">{item.title}</span>
      </div>
    </div>
  );
}

export default function BeforeAfterCarousel() {
  const { ref: secRef, isVisible: v } = useInView(.05);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDrag = useRef(false);
  const drag = useRef({ x: 0, sl: 0 });
  const anim = useRef(0);
  const acc = useRef(0);
  const items: BAItem[] = beforeAfter;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !items.length) return;
    acc.current = el.scrollLeft;
    const tick = () => {
      if (!isDrag.current && el) {
        acc.current += 0.52;
        if (acc.current >= el.scrollWidth / 2) acc.current -= el.scrollWidth / 2;
        el.scrollLeft = acc.current;
      } else if (el) acc.current = el.scrollLeft;
      anim.current = requestAnimationFrame(tick);
    };
    anim.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(anim.current);
  }, [items.length]);

  const dn = useCallback((x: number) => { isDrag.current = true; drag.current = { x, sl: scrollRef.current?.scrollLeft ?? 0 }; }, []);
  const mv = useCallback((x: number) => { if (!isDrag.current || !scrollRef.current) return; scrollRef.current.scrollLeft = drag.current.sl - (x - drag.current.x); acc.current = scrollRef.current.scrollLeft; }, []);
  const up = useCallback(() => { isDrag.current = false; }, []);

  if (!items.length) return (
    <section className="py-14"><div className="max-w-7xl mx-auto px-5 text-center"><h2 className="font-heading text-2xl text-brand-100">Портфолио</h2><p className="text-brand-500 text-sm mt-2">Скоро здесь появятся примеры работ</p></div></section>
  );

  return (
    <section ref={secRef} className="py-14 sm:py-18 overflow-hidden border-t border-brand-800/40">
      <div className={`max-w-7xl mx-auto px-5 sm:px-8 mb-8 text-center transition-all duration-700 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <span className="text-[10px] tracking-[.3em] text-brand-500 uppercase block mb-2">Портфолио</span>
        <h2 className="font-heading text-2xl sm:text-3xl text-brand-100 mb-2">До и после</h2>
        <p className="text-brand-500 text-sm max-w-xs mx-auto">Реальные объекты — результат нашей работы</p>
      </div>
      <div ref={scrollRef} className="flex gap-5 px-5 no-scrollbar overflow-x-auto cursor-grab active:cursor-grabbing select-none"
        onMouseDown={e => dn(e.clientX)} onMouseMove={e => mv(e.clientX)} onMouseUp={up} onMouseLeave={up}
        onTouchStart={e => dn(e.touches[0].clientX)} onTouchMove={e => mv(e.touches[0].clientX)} onTouchEnd={up}>
        {[...items, ...items].map((item, i) => <SplitCard key={`${item.id}-${i}`} item={item} />)}
      </div>
    </section>
  );
}
