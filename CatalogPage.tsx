import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { catalogData } from '../lib/catalogImages';
import ProductModal, { type Product } from '../components/ProductModal';
import { useInView } from '../hooks/useInView';
import { PhoneIcon } from '../components/Icons';
import { contacts } from '../lib/data';

const G = ['from-brand-600 to-brand-800', 'from-brand-500 to-brand-700', 'from-brand-700 to-brand-900', 'from-brand-600 to-brand-900'];

function Card({ product: p, onClick, index: i, isVisible: v }: { product: Product; onClick: () => void; index: number; isVisible: boolean }) {
  const [err, setErr] = useState(false);
  const img = p.images[0] && !err;
  return (
    <button onClick={onClick} className={`group bg-brand-900/60 rounded-xl overflow-hidden text-left border border-brand-800/50 hover:border-brand-600/60 transition-all duration-500 cursor-pointer ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: v ? `${(i % 6) * 60}ms` : '0ms' }}>
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-800">
        {img ? <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" onError={() => setErr(true)} />
          : <div className={`w-full h-full bg-gradient-to-br ${G[p.id % G.length]} flex items-center justify-center p-6`}><span className="font-heading text-lg text-brand-200 text-center">{p.name}</span></div>}
        <div className="absolute top-3 left-3"><span className="text-[9px] px-2.5 py-1 rounded-full bg-black/50 text-white/90 backdrop-blur-sm tracking-wider uppercase">{p.brand}</span></div>
        <div className={`absolute top-3 right-3 text-[9px] px-2.5 py-1 rounded-full ${p.inStock ? 'bg-brand-400/90 text-brand-950' : 'bg-brand-800/80 text-brand-400'}`}>{p.inStock ? 'В наличии' : 'Под заказ'}</div>
      </div>
      <div className="p-5">
        <p className="text-[9px] text-brand-500 tracking-wider uppercase mb-1.5">{p.category}</p>
        <h3 className="font-heading text-base text-brand-200 leading-snug mb-2 group-hover:text-brand-100 transition-colors">{p.name}</h3>
        <p className="text-xs text-brand-500 line-clamp-2 leading-relaxed mb-3">{p.description}</p>
        <div className="flex items-center justify-between pt-3 border-t border-brand-800/50">
          <span className="font-heading text-base text-brand-200">{p.price}</span>
          <span className="text-[10px] text-brand-500 group-hover:text-brand-300 transition-colors">Подробнее →</span>
        </div>
      </div>
    </button>
  );
}

export default function CatalogPage() {
  const loc = useLocation();
  const [brand, setBrand] = useState(new URLSearchParams(loc.search).get('brand') || '');
  const [cat, setCat] = useState('');
  const [stock, setStock] = useState('');
  const [sel, setSel] = useState<Product | null>(null);
  const { ref, isVisible: v } = useInView(.03);
  const products: Product[] = catalogData as Product[];
  const brands = useMemo(() => [...new Set(products.map(p => p.brand))], [products]);
  const cats = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
  const filtered = useMemo(() => products.filter(p => (!brand || p.brand === brand) && (!cat || p.category === cat) && (stock === '' || (stock === 'y' ? p.inStock : !p.inStock))), [products, brand, cat, stock]);

  return (
    <main className="pt-20">
      <div className="border-b border-brand-800/40 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row sm:items-end gap-5">
          <div className="flex-1">
            <span className="text-[10px] tracking-[.3em] text-brand-500 uppercase block mb-2">Ассортимент</span>
            <h1 className="font-heading text-3xl sm:text-4xl text-brand-100 mb-2">Каталог</h1>
            <p className="text-brand-500 text-sm max-w-md">Декоративные штукатурки, краски и покрытия от San Marco и «Краски Бриз»</p>
          </div>
          <a href={`tel:${contacts.phone}`} target="_top" className="self-start flex items-center gap-2 px-4 py-2 border border-brand-700 text-brand-400 hover:text-brand-200 hover:border-brand-500 rounded-lg text-sm transition-all"><PhoneIcon className="w-3.5 h-3.5" />Консультация</a>
        </div>
      </div>
      <div className="sticky top-16 sm:top-[72px] z-30 bg-brand-950/95 backdrop-blur-md border-b border-brand-800/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex flex-wrap items-center gap-2">
          <select value={brand} onChange={e => setBrand(e.target.value)} className="px-3 py-2 rounded-lg border border-brand-700 bg-brand-900 text-sm text-brand-300 focus:outline-none cursor-pointer"><option value="">Все бренды</option>{brands.map(b => <option key={b} value={b}>{b}</option>)}</select>
          <select value={cat} onChange={e => setCat(e.target.value)} className="px-3 py-2 rounded-lg border border-brand-700 bg-brand-900 text-sm text-brand-300 focus:outline-none cursor-pointer"><option value="">Все категории</option>{cats.map(c => <option key={c} value={c}>{c}</option>)}</select>
          <select value={stock} onChange={e => setStock(e.target.value)} className="px-3 py-2 rounded-lg border border-brand-700 bg-brand-900 text-sm text-brand-300 focus:outline-none cursor-pointer"><option value="">Наличие</option><option value="y">В наличии</option><option value="n">Под заказ</option></select>
          {(brand || cat || stock) && <button onClick={() => { setBrand(''); setCat(''); setStock(''); }} className="text-sm text-brand-500 hover:text-brand-300 transition-colors">Сбросить</button>}
          <span className="ml-auto text-xs text-brand-600">{filtered.length} позиций</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-14" ref={ref}>
        {!filtered.length ? (
          <div className="text-center py-20"><div className="font-heading text-2xl text-brand-700 mb-2">Ничего не найдено</div><p className="text-brand-500 text-sm">Измените фильтры</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{filtered.map((p, i) => <Card key={p.id} product={p} index={i} isVisible={v} onClick={() => setSel(p)} />)}</div>
        )}
      </div>
      {sel && <ProductModal product={sel} onClose={() => setSel(null)} />}
    </main>
  );
}
