# Сайт оконного мастера - okna-brn.ru

Профессиональный сайт для мастера по ремонту окон в Барнауле.

## 🚀 Запуск проекта

### Установка зависимостей
```bash
npm install
```

### Разработка
```bash
npm run dev
```
Сайт будет доступен по адресу: http://localhost:3000

### Сборка для продакшена
```bash
npm run build
```

### Предпросмотр продакшен-сборки
```bash
npm run preview
```

## 📦 Технологии

- **Nuxt 4** - фреймворк
- **Vue 3** - UI фреймворк
- **TypeScript** - типизация
- **SCSS** - стилизация

## 📁 Структура проекта

```
├── app/
│   ├── components/      # Компоненты (Logo.vue)
│   ├── pages/          # Страницы (index.vue)
│   ├── assets/scss/    # Стили
│   └── data.ts         # Данные сайта
├── server/
│   └── api/            # API endpoints
└── public/             # Статические файлы
```

## ⚙️ Настройка

### Изменение контактных данных
Отредактируйте файл `app/data.ts`:
- Телефон
- Адрес
- Режим работы
- Услуги и цены

### Email уведомления о заявках
Создайте файл `.env` по примеру `.env.example`:
```env
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=user@yandex.ru
SMTP_PASS=your_app_password
SMTP_FROM=user@yandex.ru
SMTP_TO=remdom.22@yandex.com
```

## 🚢 Деплой

Проект настроен для деплоя на Jino hosting:
```bash
npm run deploy
```

## 📝 Лицензия

© 2026 Оконный Мастер Барнаул
