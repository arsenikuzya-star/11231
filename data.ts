import { images } from './images';

export const company = {
  name: 'Профессиональный центр Сан Марко',
  shortName: 'Сан Марко',
  tagline: 'Декоративные покрытия премиум-класса',
  description: 'Официальный дистрибьютор декоративных покрытий San Marco и «Краски Бриз» в Москве.',
  yearsOnMarket: 12,
  completedProjects: 850,
  warrantyYears: 1,
};

export const contacts = {
  phone: '+74951092977',
  phoneFormatted: '+7 (495) 109-29-77',
  email: 'info@sanmarco-center.ru',
  telegram: 'https://t.me/sanmarco_center',
  whatsapp: 'https://wa.me/74951092977',
  address: 'Москва, Нижняя Сыромятническая улица, 10, стр. 9',
  addressShort: 'Центр дизайна Artplay',
  workHours: 'Пн–Сб: 10:00–20:00, Вс: выходной',
  mapEmbedUrl: 'https://yandex.ru/map-widget/v1/?um=constructor%3A44f5e5c5e0f3f4e4a5b6c7d8e9f0a1b2&source=constructor',
  directions: {
    metro: 'Курская / Чкаловская (5 минут пешком)',
    landmarks: 'Центр дизайна Artplay, строение 9',
    details: 'Нижняя Сыромятническая ул., дом 10, строение 9.',
  },
};

export const legal = {
  fullName: 'ИП Иванов Иван Иванович',
  inn: '770000000000',
  ogrnip: '300000000000000',
  legalAddress: 'г. Москва, Нижняя Сыромятническая ул., д. 10, стр. 9',
};

export const advantages = [
  { icon: 'ruler', title: 'Бесплатный замер', description: 'Выезд мастера на объект — бесплатно' },
  { icon: 'palette', title: 'Подбор покрытия', description: 'Индивидуальный подбор фактуры под интерьер' },
  { icon: 'shield', title: 'Гарантия 1 год', description: 'Гарантия на материалы и работы' },
  { icon: 'award', title: 'Мастера', description: 'Сертифицированные специалисты' },
  { icon: 'clock', title: 'Сроки', description: 'Фиксируем сроки в договоре' },
  { icon: 'handshake', title: 'Под ключ', description: 'От замера до сдачи объекта' },
];

export const services = [
  { step: 1, title: 'Замер', description: 'Мастер приезжает, делает замеры и фотофиксацию.', icon: 'measuring', image: images.steps[0] },
  { step: 2, title: 'Подбор', description: 'Подбираем цвет и фактуру, делаем выкрасы.', icon: 'swatch', image: images.steps[1] },
  { step: 3, title: 'Смета', description: 'Подробный расчет без скрытых платежей.', icon: 'calculator', image: images.steps[2] },
  { step: 4, title: 'Договор', description: 'Фиксируем сроки, стоимость и гарантию.', icon: 'document', image: images.steps[3] },
  { step: 5, title: 'Нанесение', description: 'Профессиональное нанесение с контролем качества.', icon: 'brush', image: images.steps[4] },
  { step: 6, title: 'Сдача', description: 'Принимаете работу по акту.', icon: 'checkmark', image: images.steps[5] },
];

export const brands = {
  sanMarco: { name: 'San Marco', country: 'Италия', description: 'Итальянский бренд премиум-класса.', features: ['50 лет истории', 'Итальянское качество'] },
  kraskiBriz: { name: 'Краски Бриз', country: 'Россия', description: 'Российский производитель высокого качества.', features: ['Доступные цены', 'Наличие на складе'] },
};

export const beforeAfter = [
  { id: 1, title: 'Гостиная в стиле лофт', before: images.steps[0], after: images.steps[5] },
  { id: 2, title: 'Премиальный шоурум', before: images.steps[1], after: images.showroom },
  { id: 3, title: 'Венецианская отделка', before: images.steps[4], after: images.steps[5] },
];
