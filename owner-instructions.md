# Инструкция для владельца сайта

## Общие сведения

Сайт «Профессиональный центр Сан Марко» — полностью статический. Весь контент управляется через простые файлы данных. Ниже описано, как добавлять товары, менять тексты, загружать фото и обновлять контакты.

---

## 1. Добавление/редактирование товара

Файл: `src/data/catalog.json`

Каждый товар — объект в массиве JSON. Пример:

```json
{
  "id": 11,
  "name": "Название товара",
  "brand": "San Marco",
  "category": "Декоративная штукатурка",
  "description": "Краткое описание для карточки",
  "fullDescription": "Подробное описание для модального окна",
  "price": "от 3 000 ₽/м²",
  "inStock": true,
  "images": ["/assets/products/product-11-1.jpg", "/assets/products/product-11-2.jpg"],
  "features": ["Основа: акриловая", "Расход: 1 кг/м²"]
}
```

**Шаги:**
1. Откройте файл `src/data/catalog.json`
2. Добавьте новый объект в массив (не забудьте уникальный `id`)
3. Если есть фото — сохраните их в `public/assets/products/` и укажите пути в `images`
4. Если фото нет — оставьте `images: []`, покажется красивая заглушка
5. Пересоберите сайт: `npm run build`

---

## 2. Загрузка фотографий

### Фото товаров
Папка: `public/assets/products/`

Рекомендации:
- Формат: JPG или WebP
- Размер: 800×600 px или крупнее
- Названия: латиницей, без пробелов (например `marmorino-1.jpg`)

### Фото до/после
Путь указывается в `src/lib/data.ts` → массив `beforeAfter`.

### Баннер главной страницы
Файл: `src/assets/hero-banner.jpg`
Замените файл на свой (рекомендуемый размер: 1920×1080 px или крупнее).

---

## 3. Изменение текстов и контактов

Файл: `src/lib/data.ts`

### Контакты
```typescript
export const contacts = {
  phone: '+74951092977',              // телефон (для ссылки tel:)
  phoneFormatted: '+7 (495) 109-29-77', // телефон (отображаемый)
  email: 'info@sanmarco-center.ru',
  telegram: 'https://t.me/sanmarco_center',
  whatsapp: 'https://wa.me/74951092977',
  address: 'Москва, Нижняя Сыромятническая улица, 10, стр. 9',
  // ...
};
```

### Реквизиты
```typescript
export const legal = {
  fullName: 'ИП Иванов Иван Иванович',
  inn: '770000000000',
  ogrnip: '300000000000000',
  legalAddress: 'г. Москва, ...',
};
```

### Информация о компании
```typescript
export const company = {
  name: 'Профессиональный центр Сан Марко',
  yearsOnMarket: 12,
  completedProjects: 850,
  warrantyYears: 5,
};
```

---

## 4. Объекты до/после

Файл: `src/lib/data.ts` → массив `beforeAfter`

```typescript
export const beforeAfter = [
  {
    id: 1,
    title: 'Гостиная в стиле лофт',
    before: '/assets/services/project-1-before.jpg',  // путь к фото «до»
    after: '/assets/services/project-1-after.jpg',    // путь к фото «после»
  },
  // ...
];
```

Если путь пустой (`''`), показывается градиентная заглушка.

---

## 5. Фоновое изображение сайта

Файл: `src/lib/data.ts` → объект `siteBackground`

```typescript
export const siteBackground = {
  backgroundImagePath: '/assets/background-texture.jpg', // путь к файлу или '' для выключения
  opacity: 0.06, // прозрачность (0–1)
};
```

Изображение нужно сохранить в `public/assets/`.

---

## 6. Политика конфиденциальности

Файл: `src/lib/privacy.ts`

Замените текст в переменной `privacyText`. Поддерживается простая разметка:
- `## Заголовок` — заголовок раздела
- `- Пункт` — элемент списка
- `---` — горизонтальная линия
- `*курсив*` — курсивный текст
- Обычный текст — параграф

---

## 7. Яндекс.Метрика

Файл: `src/lib/data.ts` → объект `analytics`

```typescript
export const analytics = {
  yandexMetrikaId: '12345678', // номер счётчика
};
```

---

## 8. Пересборка сайта

После любых изменений выполните:

```bash
npm run build
```

Готовый сайт будет в папке `dist/`. Загрузите содержимое этой папки на хостинг.

---

## Структура файлов

```
src/
  data/catalog.json     ← товары
  lib/data.ts           ← тексты, контакты, реквизиты, до/после
  lib/privacy.ts        ← политика конфиденциальности
  assets/hero-banner.jpg ← баннер главной страницы
public/
  assets/products/      ← фото товаров
  assets/services/      ← фото до/после
```
