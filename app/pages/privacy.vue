<template>
  <div class="site-shell">
    <SiteHeader />

    <main class="inner-page">
      <section class="section-offset">
        <div class="container page-hero">
          <div>
            <p class="eyebrow">Документы</p>
            <h1>Политика конфиденциальности</h1>
            <p class="page-lead">
              Настоящая политика описывает, как мы обрабатываем данные,
              оставленные пользователями на сайте
            </p>
          </div>
          <BlurImage
            src="/illustrations/photo_succ/collection-03/IMG_20201114_122510.jpg"
            alt="Политика конфиденциальности"
            class="page-hero-image photo-cover"
            sizes="(max-width: 1080px) calc(100vw - 1rem), 520px"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </div>
      </section>

      <section class="section-offset">
        <div class="container privacy-grid">
          <article
            v-for="section in privacyPolicySections"
            :key="section.title"
            class="privacy-card"
          >
            <h2>{{ section.title }}</h2>
            <p>{{ section.text }}</p>
          </article>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { privacyPolicySections, siteData } from "@/data";

const pageTitle = "Политика конфиденциальности | remdom22.ru";
const pageDescription =
  "Информация об обработке персональных данных пользователей сайта remdom22.ru.";

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: "website",
  ogUrl: `${siteData.siteUrl}/privacy`,
});

useHead({
  link: [{ rel: "canonical", href: `${siteData.siteUrl}/privacy` }],
});
</script>
