#!/bin/bash

# Скрипт для проверки DNS и доступности сайта okna-brn.ru

DOMAIN="okna-brn.ru"
URL="https://$DOMAIN"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 ПРОВЕРКА DNS И ДОСТУПНОСТИ: $DOMAIN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. Проверка DNS (nslookup)
echo "📍 1. ПРОВЕРКА DNS (nslookup):"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v nslookup &> /dev/null; then
    nslookup $DOMAIN | grep -A 2 "Name:"
    if [ $? -eq 0 ]; then
        echo "✅ DNS работает! IP адрес найден."
    else
        echo "❌ DNS НЕ работает! IP адрес не найден."
    fi
else
    echo "⚠️  nslookup не установлен"
fi
echo ""

# 2. Проверка DNS (dig)
echo "📍 2. ПРОВЕРКА DNS (dig):"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v dig &> /dev/null; then
    dig +short $DOMAIN
    if [ $? -eq 0 ]; then
        echo "✅ DNS резолвится!"
    else
        echo "❌ DNS НЕ резолвится!"
    fi
else
    echo "⚠️  dig не установлен"
fi
echo ""

# 3. Проверка ping
echo "📍 3. ПРОВЕРКА ДОСТУПНОСТИ (ping):"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if ping -c 3 $DOMAIN &> /dev/null; then
    echo "✅ Сервер отвечает на ping!"
    ping -c 3 $DOMAIN | grep "time="
else
    echo "❌ Сервер НЕ отвечает на ping!"
fi
echo ""

# 4. Проверка HTTP (curl)
echo "📍 4. ПРОВЕРКА HTTP (curl):"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v curl &> /dev/null; then
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 $URL)
    echo "HTTP код: $HTTP_CODE"
    
    if [ "$HTTP_CODE" == "200" ]; then
        echo "✅ Сайт работает отлично! (200 OK)"
    elif [ "$HTTP_CODE" == "301" ] || [ "$HTTP_CODE" == "302" ]; then
        echo "⚠️  Редирект ($HTTP_CODE) - возможно норма"
    elif [ "$HTTP_CODE" == "000" ]; then
        echo "❌ Не удалось подключиться к серверу!"
    else
        echo "⚠️  Нестандартный код ответа: $HTTP_CODE"
    fi
    
    # Дополнительная информация
    echo ""
    echo "Полная информация:"
    curl -I -L --max-time 10 $URL 2>&1 | head -n 10
else
    echo "⚠️  curl не установлен"
fi
echo ""

# 5. Проверка HTTPS сертификата
echo "📍 5. ПРОВЕРКА SSL СЕРТИФИКАТА:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v openssl &> /dev/null; then
    CERT_INFO=$(echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)
    if [ $? -eq 0 ]; then
        echo "$CERT_INFO"
        echo "✅ SSL сертификат валиден!"
    else
        echo "⚠️  Не удалось проверить SSL сертификат"
    fi
else
    echo "⚠️  openssl не установлен"
fi
echo ""

# 6. Проверка robots.txt
echo "📍 6. ПРОВЕРКА ROBOTS.TXT:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v curl &> /dev/null; then
    ROBOTS_CODE=$(curl -s -o /dev/null -w "%{http_code}" $URL/robots.txt)
    if [ "$ROBOTS_CODE" == "200" ]; then
        echo "✅ robots.txt доступен!"
    else
        echo "⚠️  robots.txt недоступен (код: $ROBOTS_CODE)"
    fi
else
    echo "⚠️  Не удалось проверить (curl не установлен)"
fi
echo ""

# 7. Проверка sitemap.xml
echo "📍 7. ПРОВЕРКА SITEMAP.XML:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v curl &> /dev/null; then
    SITEMAP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $URL/sitemap.xml)
    if [ "$SITEMAP_CODE" == "200" ]; then
        echo "✅ sitemap.xml доступен!"
    else
        echo "⚠️  sitemap.xml недоступен (код: $SITEMAP_CODE)"
    fi
else
    echo "⚠️  Не удалось проверить (curl не установлен)"
fi
echo ""

# 8. Проверка favicon.ico
echo "📍 8. ПРОВЕРКА FAVICON.ICO:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v curl &> /dev/null; then
    FAVICON_CODE=$(curl -s -o /dev/null -w "%{http_code}" $URL/favicon.ico)
    if [ "$FAVICON_CODE" == "200" ]; then
        echo "✅ favicon.ico доступен!"
    else
        echo "⚠️  favicon.ico недоступен (код: $FAVICON_CODE)"
    fi
else
    echo "⚠️  Не удалось проверить (curl не установлен)"
fi
echo ""

# ИТОГОВЫЙ ВЫВОД
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 ИТОГОВЫЙ СТАТУС:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Подсчет успешных проверок
SUCCESS_COUNT=0
TOTAL_CHECKS=5

# Проверяем основные параметры
if nslookup $DOMAIN &> /dev/null; then
    ((SUCCESS_COUNT++))
fi

if ping -c 1 $DOMAIN &> /dev/null; then
    ((SUCCESS_COUNT++))
fi

if command -v curl &> /dev/null; then
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 $URL)
    if [ "$HTTP_CODE" == "200" ]; then
        ((SUCCESS_COUNT++))
    fi
    
    ROBOTS_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 $URL/robots.txt)
    if [ "$ROBOTS_CODE" == "200" ]; then
        ((SUCCESS_COUNT++))
    fi
    
    SITEMAP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 $URL/sitemap.xml)
    if [ "$SITEMAP_CODE" == "200" ]; then
        ((SUCCESS_COUNT++))
    fi
fi

echo "Успешно: $SUCCESS_COUNT из $TOTAL_CHECKS проверок"
echo ""

if [ $SUCCESS_COUNT -eq $TOTAL_CHECKS ]; then
    echo "🎉 ВСЁ ОТЛИЧНО! Сайт работает идеально!"
    echo ""
    echo "✅ Следующие шаги:"
    echo "   1. Отправьте сайт на переобход в Яндекс.Вебмастер"
    echo "   2. Проверьте индексацию через 3-7 дней"
elif [ $SUCCESS_COUNT -ge 3 ]; then
    echo "⚠️  ЧАСТИЧНО РАБОТАЕТ. Есть небольшие проблемы."
    echo ""
    echo "📝 Рекомендации:"
    echo "   1. Проверьте файлы robots.txt и sitemap.xml"
    echo "   2. Подождите 1-2 часа и проверьте снова"
    echo "   3. Если не помогло - смотрите DNS_FIX_GUIDE.md"
else
    echo "❌ КРИТИЧЕСКИЕ ПРОБЛЕМЫ!"
    echo ""
    echo "🆘 СРОЧНЫЕ ДЕЙСТВИЯ:"
    echo "   1. Откройте файл DNS_FIX_GUIDE.md"
    echo "   2. Следуйте инструкциям шаг за шагом"
    echo "   3. Если не помогло - обратитесь в поддержку хостинга"
    echo ""
    echo "📧 Техподдержка Джино: support@jino.ru"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Для подробной информации читайте:"
echo "   📄 DNS_FIX_GUIDE.md - полная инструкция"
echo "   📄 DNS_QUICK_CHECK.md - быстрая шпаргалка"
echo ""
echo "Дата проверки: $(date)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

