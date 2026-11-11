<template>
  <footer v-if="compact" class="compact-footer" id="contacts">
    <nav aria-label="Навигация в подвале">
      <NuxtLink v-for="item in siteData.nav" :key="item.to" :to="item.to">{{ item.title }}</NuxtLink>
      <NuxtLink to="/#contact">Контакты</NuxtLink>
    </nav>
    <div class="compact-footer-links">
      <NuxtLink to="/privacy">Политика конфиденциальности</NuxtLink>
      <NuxtLink to="/rekvizity">Реквизиты</NuxtLink>
    </div>
    <div class="compact-footer-bottom">
      <div>
        <p>{{ siteData.requisites.shortName }}</p>
        <p>{{ siteData.requisites.legalAddress }}</p>
        <p>ИНН {{ siteData.requisites.inn }} · ОГРН {{ siteData.requisites.ogrn }}</p>
      </div>
      <p>© {{ currentYear }} {{ siteData.brandName }}</p>
    </div>
  </footer>
  <footer v-else class="footer" id="contacts">
    <div class="container footer-inner footer-inner-wide">
      <div class="footer-brand">
        <p class="footer-title">{{ siteData.brandName }}</p>
        <p>{{ siteData.city }} · ремонт квартир, домов и офисов</p>
        <p>{{ siteData.address }}</p>
        <p>{{ siteData.workHours }}</p>
      </div>

      <div class="footer-contacts">
        <a :href="`mailto:${siteData.email}`" class="footer-contact">
          {{ siteData.email }}
        </a>
        <a
          :href="siteData.whatsapp"
          class="footer-contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <a
          :href="siteData.telegram"
          class="footer-contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          Telegram
        </a>
        <a
          :href="siteData.max"
          class="footer-contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          Max
        </a>
      </div>

      <nav class="footer-links">
        <NuxtLink v-for="item in siteData.nav" :key="item.to" :to="item.to">
          {{ item.title }}
        </NuxtLink>
        <NuxtLink to="/rekvizity">Реквизиты</NuxtLink>
        <NuxtLink to="/privacy">Политика конфиденциальности</NuxtLink>
      </nav>

      <div class="footer-copy">
        <p>© {{ currentYear }} {{ siteData.brandName }}. Все права защищены</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { siteData } from "@/data";

defineProps<{ compact?: boolean }>();

const currentYear = new Date().getFullYear();
const normalizedPhone = computed(() => siteData.phone.replace(/[^+\d]/g, ""));
</script>

<style scoped>
.compact-footer { padding: clamp(1.1rem, 3vw, 2rem); border: 1px solid var(--line); border-radius: 1rem; background: var(--card); font-size: 0.76rem; }
.compact-footer nav, .compact-footer-links { display: flex; flex-wrap: wrap; gap: 0.55rem 0.95rem; }
.compact-footer-links { margin-top: 0.7rem; }
.compact-footer a { text-underline-offset: 0.22em; }
.compact-footer a:is(:hover, :focus-visible) { color: #ffd28b; text-decoration: underline; }
.compact-footer-bottom { display: flex; justify-content: space-between; align-items: end; flex-wrap: wrap; gap: 0.65rem 1rem; padding-top: 0.8rem; margin-top: 0.9rem; border-top: 1px solid var(--line); color: var(--muted); }
.compact-footer-bottom p { margin: 0.15rem 0; }
</style>
