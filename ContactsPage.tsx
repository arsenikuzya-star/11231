import { contacts, company } from '../lib/data';
import { useInView } from '../hooks/useInView';
import { PhoneIcon, MailIcon, MapPinIcon, TelegramIcon, WhatsAppIcon } from '../components/Icons';

export default function ContactsPage() {
  const { ref: iR, isVisible: iV } = useInView();
  const { ref: dR, isVisible: dV } = useInView();

  return (
    <main className="pt-20 pb-20">
      <div className="border-b border-brand-800/40 py-16 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl text-brand-100 mb-2">Контакты</h1>
          <p className="text-brand-500 text-sm max-w-md mx-auto">Ждём вас в нашем шоуруме</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 relative z-10">
        <div ref={iR} className={`lg:col-span-5 flex flex-col justify-center transition-all duration-700 ${iV ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="font-heading text-2xl text-brand-100 mb-8">{company.name}</h2>
          <div className="space-y-6">
            <a href={`tel:${contacts.phone}`} target="_top" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-brand-800/80 flex items-center justify-center text-brand-400 group-hover:bg-brand-700 transition-colors"><PhoneIcon className="w-5 h-5" /></div>
              <div><div className="text-xs text-brand-500 mb-1">Телефон</div><div className="text-brand-100 font-medium text-lg tracking-wide">{contacts.phoneFormatted}</div></div>
            </a>
            <a href={`mailto:${contacts.email}`} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-brand-800/80 flex items-center justify-center text-brand-400 group-hover:bg-brand-700 transition-colors"><MailIcon className="w-5 h-5" /></div>
              <div><div className="text-xs text-brand-500 mb-1">Email</div><div className="text-brand-200 font-medium text-base tracking-wide">{contacts.email}</div></div>
            </a>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-800/80 flex items-center justify-center text-brand-400 shrink-0"><MapPinIcon className="w-5 h-5" /></div>
              <div><div className="text-xs text-brand-500 mb-1">Адрес</div><div className="text-brand-200 font-medium text-base tracking-wide">{contacts.address}</div><div className="text-brand-500 text-sm mt-1">{contacts.addressShort}</div></div>
            </div>
            
            <div className="pt-4 pb-2 border-b border-brand-800/40" />
            <div className="text-brand-400">Режим работы: <span className="text-brand-200">{contacts.workHours}</span></div>
            
            <div className="flex gap-4 pt-2">
              <a href={contacts.telegram} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center gap-2 px-4 py-3 border border-brand-700 rounded-xl text-brand-300 hover:text-brand-100 hover:border-brand-500 transition-all text-sm font-medium"><TelegramIcon className="w-5 h-5" />Telegram</a>
              <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center gap-2 px-4 py-3 border border-brand-700 rounded-xl text-brand-300 hover:text-brand-100 hover:border-brand-500 transition-all text-sm font-medium"><WhatsAppIcon className="w-5 h-5" />WhatsApp</a>
            </div>
          </div>
        </div>

        <div ref={dR} className={`lg:col-span-7 transition-all duration-700 delay-200 ${dV ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-brand-800/60 bg-brand-800 h-[400px] lg:h-full min-h-[500px]">
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A44f5e5c5e0f3f4e4a5b6c7d8e9f0a1b2&source=constructor" width="100%" height="100%" frameBorder="0" allowFullScreen style={{ border: 0 }} title="Карта" loading="lazy" />
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 relative z-10">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-xl bg-brand-900/60 border border-brand-800/50">
              <div className="text-sm font-medium text-brand-200 mb-2">Метро</div>
              <p className="text-sm text-brand-500">{contacts.directions.metro}</p>
            </div>
            <div className="p-6 rounded-xl bg-brand-900/60 border border-brand-800/50">
              <div className="text-sm font-medium text-brand-200 mb-2">Ориентиры</div>
              <p className="text-sm text-brand-500">{contacts.directions.landmarks}</p>
            </div>
            <div className="p-6 rounded-xl bg-brand-900/60 border border-brand-800/50">
              <div className="text-sm font-medium text-brand-200 mb-2">Маршрут</div>
              <p className="text-sm text-brand-500">{contacts.directions.details}</p>
            </div>
         </div>
      </div>
    </main>
  );
}
