import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { contacts } from '../lib/data';
import { MenuIcon, CloseIcon, PhoneIcon } from './Icons';

const nav = [
  { to: '/', label: 'Главная' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/services', label: 'Услуги' },
  { to: '/brands', label: 'Бренды' },
  { to: '/contacts', label: 'Контакты' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  const isHome = loc.pathname === '/';
  const solid = !isHome || scrolled;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, [loc.pathname]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${solid ? 'bg-brand-950/95 backdrop-blur-md border-b border-brand-800/60' : ''}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-[72px]">
          <Link to="/" className="flex flex-col">
            <span className="font-heading text-[15px] sm:text-base tracking-[.14em] text-brand-100 font-medium leading-tight">САН МАРКО</span>
            <span className="text-[8px] sm:text-[9px] tracking-[.28em] text-brand-400 uppercase">декоративные покрытия</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-7">
            {nav.map(l => (
              <Link key={l.to} to={l.to} className={`text-[13px] tracking-wide transition-colors relative ${loc.pathname === l.to ? 'text-brand-100' : 'text-brand-400 hover:text-brand-200'}`}>
                {l.label}
                {loc.pathname === l.to && <span className="absolute -bottom-1 left-0 right-0 h-px bg-brand-400/60" />}
              </Link>
            ))}
          </nav>
          <a href={`tel:${contacts.phone}`} target="_top" className="hidden lg:flex items-center gap-2 text-[13px] text-brand-300 hover:text-brand-100 border border-brand-700 hover:border-brand-500 rounded-lg px-4 py-2 transition-all">
            <PhoneIcon className="w-3.5 h-3.5" />{contacts.phoneFormatted}
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-brand-300" aria-label="Меню">
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>
      {/* mobile */}
      <div className={`fixed inset-0 z-40 bg-brand-950 flex flex-col items-center justify-center gap-2 transition-all duration-500 lg:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {nav.map((l, i) => (
          <Link key={l.to} to={l.to} className={`font-heading text-2xl py-3 transition-all duration-500 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'} ${loc.pathname === l.to ? 'text-brand-100' : 'text-brand-500'}`} style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}>{l.label}</Link>
        ))}
        <a href={`tel:${contacts.phone}`} target="_top" className={`mt-6 flex items-center gap-2 px-6 py-3 bg-brand-100 text-brand-950 rounded-xl font-medium transition-all duration-500 ${open ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: open ? '350ms' : '0ms' }}>
          <PhoneIcon className="w-4 h-4" />{contacts.phoneFormatted}
        </a>
      </div>
    </>
  );
}
