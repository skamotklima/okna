<template>
  <div class="site-shell">
    <SiteHeader />

    <main class="inner-page">
      <section class="section-offset">
        <div class="container page-hero page-hero-text">
          <div>
            <p class="eyebrow">Документы</p>
            <h1>Наши реквизиты и документы</h1>
            <p class="page-lead">
              Мы — официально зарегистрированная компания. Все документы можно
              проверить через открытые реестры налоговой службы
            </p>
          </div>
        </div>
      </section>

      <section class="section-offset legal-section">
        <div class="container legal-grid">
          <article class="details-box requisites-card">
            <h2>Реквизиты компании</h2>
            <dl class="requisites-list">
              <div>
                <dt>Полное наименование</dt>
                <dd>{{ requisites.fullName }}</dd>
              </div>
              <div>
                <dt>Сокращенное наименование</dt>
                <dd>{{ requisites.shortName }}</dd>
              </div>
              <div>
                <dt>ИНН</dt>
                <dd>{{ requisites.inn }}</dd>
              </div>
              <div>
                <dt>КПП</dt>
                <dd>{{ requisites.kpp }}</dd>
              </div>
              <div>
                <dt>ОГРН</dt>
                <dd>{{ requisites.ogrn }}</dd>
              </div>
              <div>
                <dt>Дата образования</dt>
                <dd>{{ requisites.registrationDate }}</dd>
              </div>
              <div class="requisites-list-wide">
                <dt>Юридический адрес</dt>
                <dd>{{ requisites.legalAddress }}</dd>
              </div>
            </dl>
          </article>

          <aside class="cta-box requisites-note">
            <h2>Как работаем с документами</h2>
            <p>
              Смету, сроки, этапы оплаты, гарантию и порядок приемки фиксируем
              до начала ремонта. Закрывающие документы и акты подписываются по
              итогам согласованных этапов
            </p>
            <NuxtLink to="/#contact" class="btn btn-primary">
              Задать вопрос по документам
            </NuxtLink>
          </aside>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { siteData } from "@/data";

const requisites = siteData.requisites;
const pageTitle = "Реквизиты и документы | remdom22.ru";
const pageDescription =
  "Реквизиты ООО СК «ПРЕМИУМ-СТРОЙ»: ИНН, КПП, ОГРН, дата регистрации и юридический адрес компании.";

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: "website",
  ogUrl: `${siteData.siteUrl}/rekvizity`,
});

useHead({
  link: [{ rel: "canonical", href: `${siteData.siteUrl}/rekvizity` }],
});
</script>
