import { Link } from 'react-router-dom';
import { company, contacts, legal } from '../lib/data';
import { PhoneIcon, MailIcon, MapPinIcon, TelegramIcon, WhatsAppIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="border-t border-brand-800/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          <div>
            <h3 className="font-heading text-lg text-brand-100 mb-3">{company.shortName}</h3>
            <p className="text-sm text-brand-500 leading-relaxed">{company.tagline}. Полный цикл работ под ключ.</p>
          </div>
          <div>
            <h4 className="text-xs font-medium text-brand-400 uppercase tracking-wider mb-3">Навигация</h4>
            <nav className="flex flex-col gap-1.5">
              {['/', '/catalog', '/services', '/brands', '/contacts'].map((p, i) => (
                <Link key={p} to={p} className="text-sm text-brand-500 hover:text-brand-200 transition-colors">{['Главная','Каталог','Услуги','Бренды','Контакты'][i]}</Link>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="text-xs font-medium text-brand-400 uppercase tracking-wider mb-3">Контакты</h4>
            <div className="flex flex-col gap-2.5 text-sm text-brand-500">
              <a href={`tel:${contacts.phone}`} target="_top" className="flex items-center gap-2 hover:text-brand-200 transition-colors"><PhoneIcon className="w-3.5 h-3.5 shrink-0" />{contacts.phoneFormatted}</a>
              <a href={`mailto:${contacts.email}`} className="flex items-center gap-2 hover:text-brand-200 transition-colors"><MailIcon className="w-3.5 h-3.5 shrink-0" />{contacts.email}</a>
              <div className="flex items-start gap-2"><MapPinIcon className="w-3.5 h-3.5 shrink-0 mt-0.5" />{contacts.address}</div>
              <p className="text-brand-600">{contacts.workHours}</p>
              <div className="flex gap-3 mt-1">
                <a href={contacts.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-brand-200 transition-colors"><TelegramIcon className="w-5 h-5" /></a>
                <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-brand-200 transition-colors"><WhatsAppIcon className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium text-brand-400 uppercase tracking-wider mb-3">Реквизиты</h4>
            <div className="text-sm text-brand-600 space-y-1">
              <p>{legal.fullName}</p><p>ИНН {legal.inn}</p><p>ОГРНИП {legal.ogrnip}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-brand-800/40 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-600">
          <p>© {new Date().getFullYear()} {company.name}</p>
          <Link to="/privacy" className="hover:text-brand-300 transition-colors">Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  );
}
