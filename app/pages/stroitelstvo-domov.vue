<template>
  <div class="site-shell">
    <SiteHeader />

    <main class="inner-page">
      <section class="section-offset">
        <div class="container page-hero">
          <div>
            <p class="eyebrow">Строительство</p>
            <h1>Малоэтажное строительство и благоустройство</h1>
            <p class="page-lead">
              Выполняем строительные работы под ключ: от проектной подготовки до
              инженерии и благоустройства участка
            </p>
          </div>
          <BlurImage
            src="/illustrations/photo_succ/collection-06/IMG_20240530_143542.jpg"
            alt="Строительные работы"
            class="page-hero-image photo-cover"
            sizes="(max-width: 1080px) calc(100vw - 1rem), 520px"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </div>
      </section>

      <section class="section-offset">
        <div class="container card-grid">
          <article
            v-for="item in constructionDirections"
            :key="item.title"
            class="info-card"
          >
            <img :src="item.icon" :alt="item.title" loading="lazy" decoding="async" />
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="section-offset">
        <div class="container cta-box">
          <h2>Нужен расчет по строительству?</h2>
          <p>Подготовим базовую оценку по срокам, материалам и этапам реализации</p>
          <NuxtLink class="btn btn-primary" to="/#contact">
            Получить консультацию
          </NuxtLink>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { constructionDirections, siteData } from "@/data";

const pageTitle = "Строительство домов и благоустройство | remdom22.ru";
const pageDescription =
  "Малоэтажное строительство, инженерия и благоустройство территории в Барнауле: понятные этапы, сроки и смета.";

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: "website",
  ogUrl: `${siteData.siteUrl}/stroitelstvo-domov`,
});

useHead({
  link: [{ rel: "canonical", href: `${siteData.siteUrl}/stroitelstvo-domov` }],
});
</script>
