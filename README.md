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
Для локальной разработки создайте `.env` по примеру `.env.example`. На Jino задайте эти же `NUXT_SMTP_*` переменные в настройках runtime-окружения Node.js приложения и перезапустите его. Деплой копирует только `.output`, поэтому локальный `.env` на сервер не переносится. SMTP-пароль храните в настройках окружения хостинга и не добавляйте в Git.

```env
NUXT_SMTP_HOST=smtp.yandex.ru
NUXT_SMTP_PORT=465
NUXT_SMTP_SECURE=true
NUXT_SMTP_USER=user@yandex.ru
NUXT_SMTP_PASS=your_app_password
NUXT_SMTP_FROM=user@yandex.ru
NUXT_SMTP_TO=remdom.22@yandex.com
```

Для совместимости обработчик также читает переменные с префиксом `SMTP_`.

## 🚢 Деплой

Проект настроен для деплоя на Jino hosting:
```bash
npm run deploy
```

## 📝 Лицензия

© 2026 Оконный Мастер Барнаул
