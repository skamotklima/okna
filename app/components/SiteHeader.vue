<template>
  <header ref="header" class="topbar">
    <div class="container topbar-inner">
      <NuxtLink to="/" class="brand" @click="closeMenu">
        <span class="brand-mark">
          <img
            src="/logo.png"
            alt="Логотип Ремонт Квартир"
            class="brand-logo"
          />
        </span>
        <span class="brand-text">
          <strong>{{ siteData.brandName }}</strong>
          <small>Ремонт квартир, комнат</small>
          <small>и офисов в Барнауле</small>
        </span>
      </NuxtLink>

      <button
        class="menu-toggle"
        type="button"
        @click="isMenuOpen = !isMenuOpen"
        :aria-expanded="isMenuOpen"
        aria-controls="primary-navigation"
        :aria-label="isMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
      >
        <span
          class="menu-toggle-icon"
          :class="{ open: isMenuOpen }"
          aria-hidden="true"
        >
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span class="menu-toggle-text">{{
          isMenuOpen ? "Закрыть" : "Меню"
        }}</span>
      </button>

      <button
        v-if="isMenuOpen"
        class="menu-backdrop"
        type="button"
        aria-label="Закрыть меню"
        @click="closeMenu"
      ></button>

      <nav id="primary-navigation" class="menu" :class="{ open: isMenuOpen }">
        <NuxtLink v-for="item in navigation" :key="item.to" :to="item.to"
          :class="{ active: isActive(item.to) }" @click="closeMenu">
          {{ item.title }}
        </NuxtLink>

        <div class="menu-actions">
          <NuxtLink
            to="/#contact"
            class="btn btn-primary btn-topbar"
            @click="closeMenu"
          >
            Заказать звонок
          </NuxtLink>
          <a
            :href="phoneHref"
            class="phone-link"
            aria-label="Позвонить в Ремонт Квартир"
            @click="closeMenu"
          >
            {{ siteData.phoneDisplay }}
          </a>
        </div>
      </nav>

      <div class="topbar-actions">
        <NuxtLink
          to="/#contact"
          class="btn btn-primary btn-topbar"
          @click="closeMenu"
        >
          Заказать звонок
        </NuxtLink>
        <a
          :href="phoneHref"
          class="phone-link"
          aria-label="Позвонить в Ремонт Квартир"
          @click="closeMenu"
        >
          {{ siteData.phoneDisplay }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from "vue";
import { siteData } from "@/data";

const navigation = [
  ...siteData.nav,
  { title: "Контакты", to: "/#contact" },
];

const route = useRoute();
const isMenuOpen = ref(false);
const header = ref<HTMLElement>();
const activeSection = ref("");
let scrollFrame = 0;

const phoneHref = computed(
  () => `tel:${siteData.phone.replace(/[^+\d]/g, "")}`,
);

const closeMenu = () => {
  isMenuOpen.value = false;
};

const isActive = (to: string) => {
  if (to.includes("#")) {
    const [path, hash] = to.split("#");
    return route.path === (path || "/") && activeSection.value === hash;
  }

  if (to === "/") {
    return route.path === "/";
  }
  return route.path === to || route.path.startsWith(`${to}/`);
};

function updateActiveSection() {
  scrollFrame = 0;
  if (route.path !== "/") {
    activeSection.value = "";
    return;
  }

  const line = (header.value?.getBoundingClientRect().bottom ?? 0) + 28;
  const current = navigation.find(({ to }) => {
    if (!to.startsWith("/#")) return false;
    const rect = document.getElementById(to.slice(2))?.getBoundingClientRect();
    return rect && rect.top <= line && rect.bottom > line;
  });
  activeSection.value = current?.to.slice(2) ?? "";
}

function scheduleActiveSection() {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateActiveSection);
}

const handleResize = () => {
  scheduleActiveSection();
  if (typeof window !== "undefined" && window.innerWidth > 960) {
    closeMenu();
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeMenu();
  }
};

if (import.meta.client) {
  watch(
    () => route.fullPath,
    () => {
      closeMenu();
      scheduleActiveSection();
    },
    { flush: "post" },
  );

  watch(isMenuOpen, (open) => {
    document.body.style.overflow = open ? "hidden" : "";
  });

  onMounted(() => {
    scheduleActiveSection();
    window.addEventListener("scroll", scheduleActiveSection, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("keydown", handleKeydown);
  });

  onBeforeUnmount(() => {
    document.body.style.overflow = "";
    window.cancelAnimationFrame(scrollFrame);
    window.removeEventListener("scroll", scheduleActiveSection);
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("keydown", handleKeydown);
  });
}
</script>

<style scoped>
.menu > a:is(:hover, :focus-visible) { color: #ffd28b; }
@media (min-width: 961px) {
  .menu { flex-wrap: wrap; gap: 0.2rem 0.7rem; }
  .topbar-inner { gap: 0.8rem; }
  .topbar-actions { display: flex; align-items: center; gap: 0.5rem; }
  .topbar-actions .btn-topbar,
  .topbar-actions .phone-link { min-height: 42px; white-space: nowrap; }
}
</style>
