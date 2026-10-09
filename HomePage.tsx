import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { company, advantages, brands, contacts, services } from '../lib/data';
import { useInView } from '../hooks/useInView';
import { getAdvantageIcon, PhoneIcon } from '../components/Icons';
import BeforeAfterCarousel from '../components/BeforeAfterCarousel';
import CatalogCarousel from '../components/CatalogCarousel';
import heroBannerUrl from '../assets/hero-banner.jpg';
import showroomPanelsUrl from '../assets/showroom-panels.jpg';

/* ═══ HERO ═══ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [sy, setSy] = useState(0);
  useEffect(() => { const fn = () => setSy(window.scrollY); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn); }, []);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100svh', minHeight: 520, maxHeight: 1050 }}>
      <div className="absolute inset-0 bg-brand-50" />
      <div className="absolute inset-0 w-full h-[120%] -top-[10%]" style={{ transform: `translateY(${sy * .22}px)` }}>
        <img src={heroBannerUrl} alt="" className={`w-full h-full object-cover transition-opacity duration-[1.6s] ${loaded ? 'opacity-90' : 'opacity-0'}`} onLoad={() => setLoaded(true)} />
      </div>
      <div className="absolute bottom-0 inset-x-0 h-60 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent z-10" />
      
      {/* ── Logo overlay (СВЕТЛЫЙ, ПРЕМИАЛЬНЫЙ ТЕКСТ) ── */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
        <div className={`text-center transition-all duration-[1.8s] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Top line */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12 sm:w-20 bg-white/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <div className="h-px w-12 sm:w-20 bg-white/40" />
          </div>

          {/* Artplay */}
          <p
            className="tracking-[0.4em] uppercase text-white/80 mb-4 font-light drop-shadow-md"
            style={{ fontSize: 'clamp(0.6rem, 1.4vw, 0.85rem)' }}
          >
            Центр дизайна Artplay
          </p>

          {/* Main */}
          <h1
            className="font-heading font-normal text-white leading-[1.1] mb-5 drop-shadow-2xl"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
          >
            ПРОФЕССИОНАЛЬНЫЙ ЦЕНТР ДИЗАЙНА
          </h1>

          {/* Brands */}
          <div
            className="font-heading italic text-white/90 flex items-center justify-center gap-4 drop-shadow-lg"
            style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)' }}
          >
            San Marco <span className="text-brand-300 mx-1">/</span> Краски Бриз
          </div>

          {/* Bottom line */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 sm:w-20 bg-white/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <div className="h-px w-12 sm:w-20 bg-white/40" />
          </div>
        </div>
      </div>
      <div className={`absolute bottom-16 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-1000 ${loaded ? 'opacity-60' : 'opacity-0'}`} style={{ transitionDelay: '1.4s' }}>
        <div className="w-px h-12 bg-white/50 animate-pulse" />
      </div>
    </section>
  );
}

/* ═══ ABOUT ═══ */
function About() {
  const { ref, isVisible: v } = useInView();
  const { ref: mRef, isVisible: mv } = useInView();
  const facts = [
    { val: `${company.yearsOnMarket}`, unit: 'лет', lbl: 'на рынке' },
    { val: `${company.completedProjects}+`, unit: '', lbl: 'объектов' },
    { val: `${company.warrantyYears}`, unit: 'год', lbl: 'гарантия' },
  ];
  return (
    <>
      <section ref={ref} className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className="text-[10px] tracking-[.3em] text-brand-500 uppercase block mb-3">О нас</span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-brand-100 mb-4 leading-snug">{company.name}</h2>
            <p className="text-brand-400 max-w-lg mx-auto leading-relaxed text-sm sm:text-base">{company.description}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {facts.map((f, i) => (
              <div key={i} className={`text-center transition-all duration-700 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${i * 100 + 150}ms` }}>
                <div className="font-heading text-3xl sm:text-5xl text-brand-100 leading-none">{f.val}{f.unit && <span className="text-xl sm:text-2xl text-brand-500 ml-0.5">{f.unit}</span>}</div>
                <div className="text-[10px] sm:text-xs text-brand-500 mt-1.5">{f.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div ref={mRef} className="border-y border-brand-800/40 py-10 sm:py-12">
        <div className={`max-w-3xl mx-auto px-5 text-center transition-all duration-700 ${mv ? 'opacity-100' : 'opacity-0'}`}>
          <p className="font-heading italic text-brand-200/90 leading-relaxed" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>
            «Мы не продаём краску — мы создаём поверхности, которые живут десятилетиями»
          </p>
        </div>
      </div>
    </>
  );
}

/* ═══ BRANDS ═══ */
function Brands() {
  const { ref, isVisible: v } = useInView();
  return (
    <section ref={ref} className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className={`text-center mb-8 transition-all duration-700 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="text-[10px] tracking-[.3em] text-brand-500 uppercase block mb-2">Партнёры</span>
          <h2 className="font-heading text-2xl sm:text-3xl text-brand-100">Наши бренды</h2>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-700 delay-100 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {[{ b: brands.sanMarco, c: 'border-l-brand-400' }, { b: brands.kraskiBriz, c: 'border-l-brand-600' }].map(({ b, c }) => (
            <Link key={b.name} to="/brands" className={`group p-6 rounded-xl bg-brand-900/50 border border-brand-800/50 hover:border-brand-600/60 transition-all duration-400 border-l-2 ${c}`}>
              <span className="text-[9px] tracking-[.2em] text-brand-500 uppercase">{b.country}</span>
              <h3 className="font-heading text-xl text-brand-100 mt-1 mb-2 group-hover:text-brand-300 transition-colors">{b.name}</h3>
              <p className="text-brand-500 text-sm leading-relaxed line-clamp-2">{b.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ ADVANTAGES ═══ */
function Advantages() {
  const { ref, isVisible: v } = useInView(.05);
  return (
    <section ref={ref} className="py-12 sm:py-16 border-y border-brand-800/40">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className={`text-center mb-8 transition-all duration-700 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="font-heading text-2xl sm:text-3xl text-brand-100">Почему мы</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {advantages.map((a, i) => (
            <div key={i} className={`group p-4 rounded-xl bg-brand-900/40 border border-brand-800/40 hover:border-brand-600/50 transition-all duration-500 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: v ? `${i * 60}ms` : '0ms' }}>
              <div className="w-9 h-9 rounded-lg bg-brand-800/60 flex items-center justify-center text-brand-400 mb-3 group-hover:bg-brand-400 group-hover:text-brand-950 transition-all duration-300">
                {getAdvantageIcon(a.icon, 'w-4 h-4')}
              </div>
              <h3 className="font-heading text-sm text-brand-200 mb-1">{a.title}</h3>
              <p className="text-xs text-brand-500 leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ SERVICES ═══ */
function ServicesStrip() {
  const { ref, isVisible: v } = useInView(.05);
  return (
    <section ref={ref} className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 transition-all duration-700 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div>
            <span className="text-[10px] tracking-[.3em] text-brand-500 uppercase block mb-1">Как мы работаем</span>
            <h2 className="font-heading text-2xl sm:text-3xl text-brand-100">Под ключ</h2>
          </div>
          <Link to="/services" className="text-xs text-brand-500 hover:text-brand-300 transition-colors">Подробнее →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {services.map((s, i) => (
            <div key={i} className={`group rounded-xl overflow-hidden border border-brand-800/40 transition-all duration-700 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="relative h-24 sm:h-28 overflow-hidden bg-brand-800">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 to-transparent" />
                <span className="absolute top-2 left-2 text-[10px] text-brand-400/70 tracking-widest">0{s.step}</span>
              </div>
              <div className="bg-brand-900/80 p-3">
                <h3 className="font-heading text-xs sm:text-sm text-brand-200 leading-tight">{s.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ SHOWROOM BANNER ═══ */
function ShowroomBanner() {
  const { ref, isVisible: v } = useInView();
  return (
    <section ref={ref} className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden border-t border-brand-800/40">
      <div className="absolute inset-0">
         <img src={showroomPanelsUrl} alt="Шоурум" className="w-full h-full object-cover opacity-60" loading="lazy" />
         <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/30 to-brand-950/90" />
      </div>
      <div className={`relative z-10 text-center px-5 transition-all duration-1000 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
         <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-brand-100 mb-4 drop-shadow-lg">100+ оттенков и фактур</h2>
         <p className="text-brand-200 text-sm sm:text-base max-w-lg mx-auto drop-shadow-md">Посетите наш шоурум в центре Artplay, чтобы вживую оценить игру света на декоративных покрытиях.</p>
      </div>
    </section>
  );
}

/* ═══ CTA ═══ */
function CTA() {
  const { ref, isVisible: v } = useInView();
  return (
    <section ref={ref} className="py-20 sm:py-24 border-t border-brand-800/40">
      <div className={`max-w-xl mx-auto px-5 text-center transition-all duration-700 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <span className="text-[10px] tracking-[.3em] text-brand-500 uppercase block mb-4">Начните сегодня</span>
        <h2 className="font-heading text-2xl sm:text-3xl text-brand-100 mb-3 leading-snug">Готовы обсудить проект?</h2>
        <p className="text-brand-500 text-sm mb-8">Бесплатная консультация, выезд на замер и смета за 24 часа</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={`tel:${contacts.phone}`} target="_top" className="group flex items-center gap-2.5 px-7 py-3.5 bg-brand-100 text-brand-950 rounded-xl hover:bg-white transition-all text-sm font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            <PhoneIcon className="w-4 h-4" />Позвонить
          </a>
          <Link to="/contacts" className="px-7 py-3.5 border border-brand-700 text-brand-300 rounded-xl hover:border-brand-500 hover:text-brand-100 transition-all text-sm font-medium">
            Как нас найти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Brands />
      <Advantages />
      <ServicesStrip />
      <BeforeAfterCarousel />
      <ShowroomBanner />
      <CatalogCarousel />
      <CTA />
    </main>
  );
}
