import { services, contacts } from '../lib/data';
import { useInView } from '../hooks/useInView';
import { getServiceIcon, PhoneIcon } from '../components/Icons';

export default function ServicesPage() {
  const { ref: hR, isVisible: hV } = useInView();
  const { ref: sR, isVisible: sV } = useInView(.03);
  const { ref: cR, isVisible: cV } = useInView();
  return (
    <main className="pt-20">
      <div className="border-b border-brand-800/40 py-16 sm:py-20">
        <div ref={hR} className={`max-w-3xl mx-auto px-5 text-center transition-all duration-700 ${hV ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="text-[10px] tracking-[.3em] text-brand-500 uppercase block mb-4">Как мы работаем</span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-brand-100 mb-4">Услуги под ключ</h1>
          <p className="text-brand-500 max-w-md mx-auto text-sm leading-relaxed">От первого звонка до сдачи объекта — вы получаете результат, а не хлопоты</p>
        </div>
      </div>
      <div ref={sR} className="max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-18">
        {services.map((s, i) => (
          <div key={s.step} className={`flex flex-col md:flex-row items-stretch gap-6 md:gap-10 py-10 border-b border-brand-800/30 last:border-b-0 transition-all duration-700 ${sV ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${i % 2 ? 'md:flex-row-reverse' : ''}`} style={{ transitionDelay: sV ? `${i * 80}ms` : '0ms' }}>
            <div className="md:w-2/5 rounded-xl overflow-hidden h-48 md:h-auto bg-brand-800 border border-brand-800/50">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className={`flex-1 flex flex-col justify-center ${i % 2 ? 'md:text-right md:items-end' : ''}`}>
              <div className="flex items-center gap-3 mb-3"><span className="font-heading text-3xl text-brand-700">0{s.step}</span>
                <div className="w-9 h-9 rounded-lg bg-brand-800 flex items-center justify-center text-brand-400">{getServiceIcon(s.icon, 'w-4 h-4')}</div>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl text-brand-100 mb-2">{s.title}</h3>
              <p className="text-brand-400 text-sm leading-relaxed max-w-sm">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
      <section ref={cR} className="border-t border-brand-800/40 py-16">
        <div className={`max-w-xl mx-auto px-5 text-center transition-all duration-700 ${cV ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="font-heading text-2xl sm:text-3xl text-brand-100 mb-3">Начнём?</h2>
          <p className="text-brand-500 text-sm mb-6">Позвоните — приедем на замер бесплатно</p>
          <a href={`tel:${contacts.phone}`} target="_top" className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-100 text-brand-950 rounded-xl hover:bg-white transition-all text-sm font-medium shadow-lg"><PhoneIcon className="w-4 h-4" />Позвонить</a>
        </div>
      </section>
    </main>
  );
}
