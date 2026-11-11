<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { siteData } from "@/data";

const siteTitle = "Ремонт Квартир | Ремонт, дизайн и строительство";
const siteDescription =
  "Профессиональный ремонт квартир, домов и коммерческих помещений в Барнауле: прозрачная смета, договор, поэтапная оплата и гарантия на работы.";
const siteKeywords =
  "ремонт квартир Барнаул, отделка под ключ Барнаул, дизайн интерьера Барнаул, строительные работы Барнаул";
const normalizedPhone = siteData.phone.replace(/[^+\d]/g, "");

useHead({
  title: siteTitle,
  meta: [
    { name: "description", content: siteDescription },
    { name: "keywords", content: siteKeywords },
    { name: "author", content: siteData.brandName },
    { name: "geo.region", content: "RU-ALT" },
    { name: "geo.placename", content: siteData.city },
    {
      name: "geo.position",
      content: `${siteData.mapCoordinates.lat};${siteData.mapCoordinates.lon}`,
    },
    { property: "og:title", content: siteTitle },
    { property: "og:description", content: siteDescription },
    { property: "og:type", content: "website" },
    { property: "og:url", content: siteData.siteUrl },
    {
      property: "og:image",
      content: `${siteData.siteUrl}/illustrations/photo_succ_optimized/1400/collection-01/12345.jpg`,
    },
    { property: "og:site_name", content: siteData.brandName },
    { property: "og:locale", content: "ru_RU" },
    { name: "theme-color", content: "#121212" },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "icon", type: "image/svg+xml", href: "/logo.png" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/logo.png" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "manifest", href: "/site.webmanifest" },
  ],
  script: [
    {
      type: "text/javascript",
      innerHTML: `(function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106110599', 'ym');

      ym(106110599, 'init', {ssr:true, webvisor:true, clickmap:true, accurateTrackBounce:true, trackLinks:true});`,
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: siteData.brandName,
        description: siteDescription,
        url: siteData.siteUrl,
        telephone: normalizedPhone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteData.address,
          addressLocality: siteData.city,
          addressRegion: "Алтайский край",
          addressCountry: "RU",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
        areaServed: siteData.city,
        image: `${siteData.siteUrl}/illustrations/photo_succ_optimized/1400/collection-01/12345.jpg`,
      }),
    },
  ],
  htmlAttrs: {
    lang: "ru",
  },
});
</script>
