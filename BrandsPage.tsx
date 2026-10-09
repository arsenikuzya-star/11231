import { Link } from 'react-router-dom';
import { brands, contacts } from '../lib/data';
import { useInView } from '../hooks/useInView';
import { PhoneIcon } from '../components/Icons';

function Block({ brand, reversed }: { brand: { name: string; country: string; description: string; features: string[] }; reversed?: boolean }) {
  const { ref, isVisible: v } = useInView();
  return (
    <div ref={ref} className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-14 items-center transition-all duration-700 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="w-full lg:w-5/12">
        <div className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${reversed ? 'from-brand-700 via-brand-600 to-brand-500' : 'from-brand-500 via-brand-600 to-brand-800'} flex items-center justify-center p-8 border border-brand-700/40`}>
          <div className="text-center"><h3 className="font-heading text-4xl sm:text-5xl text-brand-100 mb-2">{brand.name}</h3><p className="text-brand-300/60 text-sm uppercase tracking-[.3em]">{brand.country}</p></div>
        </div>
      </div>
      <div className="w-full lg:w-7/12">
        <span className="text-[9px] uppercase tracking-[.2em] text-brand-500">{brand.country}</span>
        <h3 className="font-heading text-2xl sm:text-3xl text-brand-100 mt-1 mb-3">{brand.name}</h3>
        <p className="text-brand-400 leading-relaxed mb-5">{brand.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">{brand.features.map((f, i) => <div key={i} className="flex items-center gap-2 text-sm text-brand-400"><div className="w-1 h-1 rounded-full bg-brand-500 shrink-0" />{f}</div>)}</div>
        <Link to={`/catalog?brand=${encodeURIComponent(brand.name)}`} className="inline-flex items-center gap-2 px-5 py-2.5 border border-brand-700 text-brand-300 rounded-xl hover:border-brand-500 hover:text-brand-100 transition-all text-sm">Смотреть в каталоге →</Link>
      </div>
    </div>
  );
}

export default function BrandsPage() {
  const { ref: cR, isVisible: cV } = useInView();
  return (
    <main className="pt-20">
      <div className="border-b border-brand-800/40 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-brand-100 mb-3">Наши бренды</h1>
          <p className="text-brand-500 max-w-md mx-auto text-sm">Итальянский премиум и надёжное российское качество</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-18 space-y-16 sm:space-y-20">
        <Block brand={brands.sanMarco} />
        <Block brand={brands.kraskiBriz} reversed />
      </div>
      <section ref={cR} className="border-t border-brand-800/40 py-16">
        <div className={`max-w-xl mx-auto px-5 text-center transition-all duration-700 ${cV ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="font-heading text-2xl sm:text-3xl text-brand-100 mb-3">Нужна консультация?</h2>
          <p className="text-brand-500 text-sm mb-6">Поможем выбрать подходящий бренд</p>
          <a href={`tel:${contacts.phone}`} target="_top" className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-100 text-brand-950 rounded-xl hover:bg-white transition-all text-sm font-medium shadow-lg"><PhoneIcon className="w-4 h-4" />Позвонить</a>
        </div>
      </section>
    </main>
  );
}
