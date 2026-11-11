<template>
  <div class="site-shell">
    <SiteHeader />

    <main id="top" class="home-main">
      <section class="hero section-offset">
        <div class="container hero-grid">
          <div class="hero-content">
            <p class="hero-label">Выезд замерщика за 1–2 дня</p>
            <h1 class="hero-title"><span>Ремонт квартир</span><span>в Барнауле</span></h1>
            <p class="hero-text hero-text-lines">Ремонтируем квартиры, дома и офисы под ключ<br />Согласуем смету и сроки до начала работ</p>

            <div class="hero-actions">
              <a href="#contact" class="btn btn-primary">Оставить заявку</a>
              <a
                :href="phoneHref"
                class="btn btn-primary"
                @click="handleCallClick"
              >
                Позвонить специалисту
              </a>
            </div>
          </div>

          <aside class="hero-card" aria-label="Как проходит ремонт">
            <p class="card-eyebrow">Как проходит ремонт</p>
            <ol class="hero-steps">
              <li v-for="(step, index) in heroSteps" :key="step">
                <span aria-hidden="true">{{ index + 1 }}</span>{{ step }}
              </li>
            </ol>
          </aside>
        </div>
      </section>

      <section class="metrics section-offset">
        <div class="container metrics-grid">
          <article class="metric-card">
            <p class="metric-value">+15 лет</p>
            <p class="metric-label">
              опыт руководителя и мастеров в сфере ремонта
            </p>
          </article>
          <article class="metric-card">
            <p class="metric-value">100+</p>
            <p class="metric-label">реализованных проектов</p>
          </article>
          <article class="metric-card">
            <p class="metric-value">250+</p>
            <p class="metric-label">клиентов по Барнаулу и краю</p>
          </article>
          <article class="metric-card">
            <p class="metric-value">2 года</p>
            <p class="metric-label">гарантии на выполненные работы</p>
          </article>
        </div>
      </section>

      <section id="offers" class="section-offset offers-section">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Акции</p>
            <h2>Скидки на отделочные работы</h2>
          </div>
          <div class="offers-grid">
            <article v-for="offer in offers" :key="offer.title" class="offer-card">
              <div class="offer-card-head">
                <h3>{{ offer.title }}</h3>
                <strong class="offer-discount">−10%</strong>
              </div>
              <p>{{ offer.summary }}</p>
              <details v-if="offer.terms.length">
                <summary>Условия акции</summary>
                <ul>
                  <li v-for="term in offer.terms" :key="term">{{ term }}</li>
                </ul>
              </details>
            </article>
          </div>
        </div>
      </section>

      <section id="services" class="section-offset">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Услуги</p>
            <h2>От идеи до готового пространства</h2>
            <p class="services-lead">Делаем ремонт, дизайн и отдельные строительные задачи под ваш бюджет и сроки</p>
          </div>

          <div class="services-grid">
            <article
              v-for="service in siteData.services"
              :key="service.title"
              class="service-card"
              :class="{ highlight: service.highlight }"
            >
              <img
                :src="service.icon"
                :alt="service.title"
                class="service-icon"
                loading="lazy"
                decoding="async"
              />
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
              <div class="service-price">{{ service.fromPrice }}</div>
              <p class="service-price-note">{{ service.priceNote }}</p>
            </article>
          </div>
          <p class="price-disclaimer">
            Точную стоимость рассчитываем после замера и согласовываем в
            договоре
          </p>
        </div>
      </section>

      <section class="section-offset service-focus-section">
        <div class="container service-focus-grid">
          <article
            v-for="item in serviceHighlights"
            :id="item.id"
            :key="item.id"
            class="service-focus-card"
          >
            <p class="eyebrow">{{ item.eyebrow }}</p>
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <ul>
              <li v-for="point in item.points" :key="point">{{ point }}</li>
            </ul>
            <div class="service-focus-price">
              <span>{{ item.price }}</span>
              <small>{{ item.priceNote }}</small>
            </div>
            <a href="#contact" class="btn btn-primary">Обсудить задачу</a>
          </article>
        </div>
      </section>

      <section id="projects" class="section-offset">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Проекты</p>
            <h2>Свежие кейсы по дизайну и ремонту</h2>
          </div>

          <div class="project-grid">
            <button type="button"
              v-for="project in projectCases"
              :key="project.slug"
              class="project-card project-gallery-trigger"
              @click="openGallery(project)"
            >
              <BlurImage
                :src="project.image"
                :alt="project.title"
                sizes="(max-width: 620px) calc(100vw - 1rem), (max-width: 1080px) calc((100vw - 2rem) / 2), 380px"
                loading="lazy"
                decoding="async"
              />
              <div class="project-meta">
                <h3>{{ project.title }}</h3>
                <p>Смотреть фотографии →</p>
              </div>
            </button>
          </div>

          <dialog ref="gallery" class="project-gallery" aria-label="Фотографии проекта"
            @click.self="gallery?.close()" @close="selectedProject = undefined"
            @keydown.left.prevent="stepPhoto(-1)" @keydown.right.prevent="stepPhoto(1)">
            <div>
              <button type="button" class="gallery-close" aria-label="Закрыть" autofocus @click="gallery?.close()">×</button>
              <h3>{{ selectedProject?.title }}</h3>
              <BlurImage v-if="photos[photoIndex]" :key="photos[photoIndex]" :src="photos[photoIndex]"
                :alt="(selectedProject?.title || '') + ', фото ' + (photoIndex + 1)" loading="eager"
                @touchstart.passive="touchStart = $event.changedTouches[0]?.clientX ?? 0"
                @touchend.passive="finishSwipe" />
              <div class="gallery-controls">
                <button type="button" aria-label="Предыдущее фото" :disabled="photos.length < 2" @click="stepPhoto(-1)">←</button>
                <span aria-live="polite">{{ photoIndex + 1 }} / {{ photos.length }}</span>
                <button type="button" aria-label="Следующее фото" :disabled="photos.length < 2" @click="stepPhoto(1)">→</button>
              </div>
            </div>
          </dialog>
        </div>
      </section>

      <section class="section-offset" id="reviews">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Отзывы</p>
            <h2>Что говорят о нас клиенты</h2>
          </div>

          <div class="review-platforms">
            <article class="review-platform">
              <h3>Яндекс Карты</h3>
              <iframe
              src="https://yandex.ru/maps-reviews-widget/88825145048?comments"
              title="Отзывы о РемДом22 на Яндекс Картах"
              loading="lazy"
            ></iframe>
            <div class="yandex-reviews-actions">
              <a class="btn btn-primary" href="https://yandex.ru/maps/org/remdom22/88825145048/reviews/?add-review=true"
                target="_blank" rel="noopener noreferrer">Оставить отзыв</a>
              <a href="https://yandex.ru/maps/org/remdom22/88825145048/reviews/"
                target="_blank" rel="noopener noreferrer">Все отзывы на Яндекс Картах ↗</a>
              </div>
            </article>
            <article class="review-platform">
              <h3>2ГИС</h3>
              <div class="gis-reviews">
                <strong>РемДом22</strong>
                <p>Ремонт помещений и дизайн интерьеров</p>
                <p>Барнаул, Победная улица, 112</p>
              </div>
              <div class="yandex-reviews-actions">
                <a class="btn btn-primary" href="https://2gis.ru/barnaul/firm/70000001116199203/tab/reviews"
                  target="_blank" rel="noopener noreferrer">Отзывы в 2ГИС ↗</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="process" class="section-offset process-section">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Этапы работы</p>
            <h2>От замера до сдачи объекта</h2>
          </div>

          <ol class="process-grid" role="list">
            <li
              v-for="(stage, index) in siteData.stages"
              :key="stage.title"
              class="process-card"
            >
              <div class="process-index">
                {{ formatStageNumber(index + 1) }}
              </div>
              <h3>{{ stage.title }}</h3>
              <p>{{ stage.description }}</p>
            </li>
          </ol>
        </div>
      </section>

      <section id="faq" class="section-offset">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Частые вопросы</p>
            <h2>Вопросы о ремонте</h2>
          </div>

          <div class="faq-list">
            <details v-for="item in siteData.faq" :key="item.question" name="remdom-faq">
              <summary>
                <span>{{ item.question }}</span>
                <span class="faq-toggle" aria-hidden="true"></span>
              </summary>
              <p>{{ item.answer }}</p>
            </details>
          </div>
        </div>
      </section>

      <section id="contact" class="section-offset contact-section">
        <div class="container contact-grid">
          <form class="contact-form" @submit.prevent="submitForm">
            <div class="contact-trap" aria-hidden="true">
              <label for="contact-website">Сайт</label>
              <input id="contact-website" v-model="website" type="text" name="website"
                tabindex="-1" autocomplete="off" />
            </div>
            <h2>Нужна консультация?</h2>
            <p class="form-subtitle">
              Оставьте имя и номер телефона для связи
            </p>

            <div
              v-if="formStatus.message"
              :class="[
                'form-message',
                formStatus.success ? 'success' : 'error',
              ]"
              aria-live="polite"
            >
              {{ formStatus.message }}
            </div>

            <label for="phone">Телефон *</label>
            <input
              id="phone"
              :value="form.phone"
              @input="updatePhone"
              :pattern="phonePattern.source"
              title="Введите +7 и ещё 10 цифр без пробелов"
              type="tel"
              required
              autocomplete="tel"
              inputmode="tel"
              placeholder="+79991234567"
              aria-describedby="contact-phone-hint"
            />

            <small id="contact-phone-hint" class="contact-hint">+7 и ещё 10 цифр, без пробелов</small>

            <label for="name">Имя *</label>
            <input
              id="name"
              v-model.trim="form.name"
              minlength="2"
              :pattern="namePattern.source"
              title="От 2 до 80 символов: буквы, пробелы, дефисы и апострофы"
              type="text"
              required
              autocomplete="name"
              maxlength="80"
              placeholder="Ваше имя"
            />

            <label class="contact-consent">
              <input v-model="form.consent" type="checkbox" required />
              <span>Согласен на обработку персональных данных согласно <NuxtLink to="/privacy">политике конфиденциальности</NuxtLink></span>
            </label>

            <button type="submit" :disabled="formStatus.loading">
              {{ formStatus.loading ? "Отправка…" : "Отправить заявку" }}
            </button>
          </form>

          <div class="contact-side">
            <section class="contact-card contact-summary" aria-labelledby="contact-title">
              <h2 id="contact-title">Обсудим ваш ремонт</h2>
              <div class="contact-summary-body">
                <div>
                  <p>{{ siteData.address }}</p>
                  <p>{{ siteData.workHours }}</p>
                  <div class="contact-socials" aria-label="Мессенджеры">
                    <a :href="siteData.whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                    <a :href="siteData.telegram" target="_blank" rel="noopener noreferrer">Telegram</a>
                    <a :href="siteData.max" target="_blank" rel="noopener noreferrer">MAX</a>
                  </div>
                </div>
                <div class="contact-direct">
                  <a :href="phoneHref" @click="handleCallClick">{{ siteData.phoneDisplay }}</a>
                  <a :href="`mailto:${siteData.email}`">{{ siteData.email }}</a>
                </div>
              </div>
            </section>
            <SiteFooter compact />
          </div>
        </div>
      </section>
    </main>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { projectCases, siteData } from "@/data";

const phoneHref = computed(
  () => `tel:${siteData.phone.replace(/[^+\d]/g, "")}`,
);
const { data: collections } = await useFetch<{ id: string; photos: { src: string }[] }[]>(
  "/api/success-gallery", { default: () => [] },
);
const gallery = ref<HTMLDialogElement>();
const selectedProject = ref<(typeof projectCases)[number]>();
const photoIndex = ref(0);
const touchStart = ref(0);
const photos = computed(() => {
  const project = selectedProject.value;
  if (!project) return [];
  const collection = collections.value?.find((item) => item.id === project.collectionId);
  return collection?.photos.length ? collection.photos.map(({ src }) => src) : [project.image];
});

function openGallery(project: (typeof projectCases)[number]) {
  selectedProject.value = project;
  photoIndex.value = 0;
  gallery.value?.showModal();
}

function stepPhoto(step: number) {
  const count = photos.value.length;
  if (count > 1) photoIndex.value = (photoIndex.value + step + count) % count;
}

function finishSwipe(event: TouchEvent) {
  const end = event.changedTouches[0];
  if (!end) return;
  const delta = end.clientX - touchStart.value;
  if (Math.abs(delta) > 45) stepPhoto(delta < 0 ? 1 : -1);
}
const heroSteps = [
  "Замеряем и обсуждаем задачу",
  "Готовим смету",
  "Подписываем договор",
  "Подбираем материалы и делаем ремонт",
  "Всё убираем за собой и сдаём объект",
];
const serviceHighlights = computed(() => {
  const roomService = siteData.services.find(
    (service) => service.title === "Ремонт одной комнаты",
  );
  const officeService = siteData.services.find(
    (service) => service.title === "Ремонт квартир и офисов",
  );

  return [
    {
      id: "room-renovation",
      eyebrow: "Ремонт комнат",
      title: "Обновим одну комнату без ремонта всей квартиры",
      description:
        "Подходит, если нужно привести в порядок спальню, детскую, гостиную или кабинет и не растягивать работы на всю квартиру.",
      points: [
        "Фиксируем границы работ до старта",
        "Защищаем проходные зоны и мебель",
        "Согласовываем фиксированную стоимость комнаты",
      ],
      price: roomService?.fromPrice || "После замера",
      priceNote: roomService?.priceNote || "Фиксированная цена за комнату",
    },
    {
      id: "office-renovation",
      eyebrow: "Ремонт офисов",
      title: "Ремонтируем офисы и коммерческие помещения",
      description:
        "Планируем график так, чтобы ремонт меньше мешал работе команды, заранее считаем материалы и закрываем вопросы по электрике и отделке.",
      points: [
        "Работаем по этапам и согласованному графику",
        "Учитываем нагрузку на электрику и освещение",
        "Подбираем износостойкие материалы под бюджет",
      ],
      price: officeService?.fromPrice || "от 4 000 ₽/м²",
      priceNote: officeService?.priceNote || "Цена указана за квадратный метр",
    },
  ];
});

const offers = [
  {
    "title": "Молодожёнам",
    "summary": "Для пар, зарегистрировавших брак за последние 12 месяцев",
    "terms": [
      "Понадобится свидетельство о браке или электронная запись с Госуслуг",
      "Скидку учитываем в смете на отделочные работы при заключении договора",
      "Скидка не действует на материалы и не суммируется с другими предложениями",
      "Бесплатный выезд и замер сохраняются"
    ]
  },
  {
    "title": "Новосёлам",
    "summary": "Для собственников, получивших ключи от новостройки за последние 12 месяцев",
    "terms": [
      "Понадобится выписка из ЕГРН или акт приёма-передачи",
      "Скидку учитываем в смете на отделочные работы при заключении договора",
      "Скидка не действует на материалы и не суммируется с другими предложениями",
      "Бесплатный выезд и замер сохраняются"
    ]
  },
  {
    "title": "Пенсионерам",
    "summary": "На все виды отделочных работ. Скидку рассчитываем и учитываем в смете",
    "terms": [
      "Подтвердите, что проживаете по адресу, где будет ремонт",
      "Предъявите пенсионное удостоверение",
      "Скидку учитываем в смете на отделочные работы при заключении договора",
      "Скидка не действует на материалы и не суммируется с другими предложениями",
      "Бесплатный выезд и замер сохраняются"
    ]
  }
];

const namePattern = /^(?=.{2,80}$)\p{L}+(?:[ \x27’\x2d]\p{L}+)*$/u;
const phonePattern = /^\+7[0-9]{10}$/;

const website = ref("");
const form = ref({
  name: "",
  phone: "",
  consent: false,
});

function updatePhone(event: Event) {
  const input = event.target as HTMLInputElement;
  const digits = input.value.replace(/\D/g, "");
  const national = /^[78]/.test(digits) ? digits.slice(1) : digits;
  form.value.phone = digits ? "+7" + national.slice(0, 10) : "";
  input.value = form.value.phone;
}

const formStatus = ref({
  loading: false,
  success: false,
  message: "",
});

const formatStageNumber = (value: number) => value.toString().padStart(2, "0");

const handleCallClick = () => {
  if (typeof window !== "undefined" && (window as any).ym) {
    (window as any).ym(106110599, "reachGoal", "call");
  }
};

const submitForm = async () => {
  if (formStatus.value.loading) return;

  const { name, phone, consent } = form.value;
  if (!namePattern.test(name) || !phonePattern.test(phone) || !consent) {
    formStatus.value.success = false;
    formStatus.value.message = "Проверьте имя и телефон: введите +7 и ещё 10 цифр";
    return;
  }


  formStatus.value.loading = true;
  formStatus.value.success = false;
  formStatus.value.message = "";

  try {
    const response = await $fetch<{ success: boolean; message: string }>(
      "/api/contact",
      {
        method: "POST",
        body: { name, phone, personalDataConsent: consent, consentVersion: "pd-2026-10-06", message: "Запрос на консультацию", website: website.value },
      },
    );

    if (!response.success) {
      throw new Error(response.message || "Ошибка при отправке");
    }

    formStatus.value.success = true;
    formStatus.value.message =
      "Заявка отправлена. Свяжемся с вами и согласуем удобное время.";

    if (typeof window !== "undefined" && (window as any).ym) {
      (window as any).ym(106110599, "reachGoal", "invite");
    }

    form.value = {
      name: "",
      phone: "",
      consent: false,
    };
  } catch (error: any) {
    formStatus.value.success = false;
    formStatus.value.message =
      error?.data?.message ||
      "Не удалось отправить заявку. Попробуйте позже или позвоните по телефону.";
  } finally {
    formStatus.value.loading = false;
  }
};

const pageTitle = "Ремонт квартир в Барнауле – РемДом22";
const pageDescription =
  "Ремонт квартир и офисов, дизайн интерьеров и строительные работы под ключ в Барнауле. Прозрачная смета, договор и контроль качества на каждом этапе.";

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: "website",
  ogUrl: siteData.siteUrl,
});

useHead({
  link: [{ rel: "canonical", href: siteData.siteUrl }],
});
</script>

<style scoped>
.contact-trap { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }

#offers { scroll-margin-top: 102px; }
.offers-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.85rem; margin-top: 1rem; align-items: start; }
.offer-card { min-width: 0; padding: 1rem; border: 1px solid var(--line); border-top: 2px solid #a48153; border-radius: 0.9rem; background: var(--card); }
.offer-card-head { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.45rem; }
.offer-card h3 { margin: 0; font-size: 0.95rem; }
.offer-discount { color: #ffd28b; font-size: 1.15rem; }
.offer-card p, .offer-card ul { color: var(--muted); font-size: 0.78rem; }
.offer-card summary { cursor: pointer; color: #ffd28b; font-size: 0.75rem; }
.offer-card ul { padding-left: 1.2rem; margin-bottom: 0; }
.offer-card li + li { margin-top: 0.35rem; }
@media (max-width: 760px) { .offers-grid { grid-template-columns: 1fr; } }

#contact .contact-grid { align-items: stretch; gap: 1rem; }
#contact .contact-form, #contact .contact-card { padding: clamp(1.1rem, 3vw, 2rem); }
#contact .contact-form h2, #contact .contact-card h2 { margin: 0; font-size: clamp(1.25rem, 2.8vw, 2.05rem); line-height: 1.18; text-wrap: balance; }
#contact .contact-form input:not([type="checkbox"]) { border-radius: 999px; min-height: 3.2rem; padding-inline: 1rem; }
#contact .contact-form button { border-radius: 999px; min-height: 3.2rem; animation: none; }
#contact .contact-form button:hover { background: #ffd28b; color: #121212; }
#contact .contact-consent { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.77rem; font-weight: 400; }
#contact .contact-consent input { appearance: auto; width: 1.1rem; height: 1.1rem; flex: 0 0 1.1rem; margin: 0.15rem 0 0; accent-color: #ffd28b; }
.contact-hint { display: block; color: var(--muted); font-size: 0.75rem; }
.contact-side { display: grid; gap: 1rem; min-width: 0; }
.contact-summary-body { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 1rem; margin-top: 1rem; }
.contact-summary-body p { margin: 0 0 0.4rem; font-size: 0.85rem; color: var(--muted); }
.contact-socials { display: flex; flex-wrap: wrap; gap: 0.45rem 0.8rem; margin-top: 0.8rem; font-size: 0.78rem; }
.contact-direct { display: grid; gap: 0.3rem; font-size: clamp(0.85rem, 1.35vw, 1.12rem); overflow-wrap: anywhere; }
#contact a:is(:hover, :focus-visible) { color: #ffd28b; }
@media (min-width: 1081px) { #contact .contact-grid { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); } .contact-direct { margin-left: auto; text-align: right; } }
#faq details { padding: 0; transition: border-color 180ms ease, background 180ms ease; }
#faq details:hover,
#faq details[open] { border-color: #a48153; background: #29241e; }
#faq summary { display: flex; align-items: center; justify-content: space-between; gap: 0.85rem; padding: 0.75rem 0.95rem; min-height: 3.4rem; }
#faq summary:focus-visible { outline: 2px solid #ffd28b; outline-offset: -3px; border-radius: 0.75rem; }
#faq .faq-toggle { position: relative; flex: 0 0 1.8rem; height: 1.8rem; border-radius: 50%; background: #393026; color: #ffd28b; }
#faq .faq-toggle::before,
#faq .faq-toggle::after { content: ""; position: absolute; top: 50%; left: 50%; width: 0.7rem; height: 2px; border-radius: 2px; background: currentColor; transform: translate(-50%, -50%); }
#faq .faq-toggle::after { transform: translate(-50%, -50%) rotate(90deg); transition: transform 180ms ease; }
#faq details[open] .faq-toggle::after { transform: translate(-50%, -50%) rotate(0); }
#faq details p { max-width: 76ch; margin: 0; padding: 0 0.95rem 1rem; text-wrap: pretty; }
@media (prefers-reduced-motion: reduce) { #faq details, #faq .faq-toggle::after { transition: none; } }

#process .process-grid { padding: 0; list-style: none; }
#process .process-card {
  padding: 1rem;
  border-radius: 0.8rem;
  border-top: 2px solid #a48153;
  background: #24221f;
  box-shadow: none;
}
#process .process-index {
  display: inline-grid;
  place-items: center;
  min-width: 2.2rem;
  min-height: 2.2rem;
  border-radius: 0.55rem;
  margin-bottom: 0.8rem;
  background: #3b2e20;
  color: #ffd28b;
}
#process .process-card h3 { margin: 0; font-size: 0.95rem; line-height: 1.35; }
#process .process-card p { margin: 0.6rem 0 0; font-size: 0.8rem; line-height: 1.6; text-wrap: pretty; }

 .review-platforms { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; margin-top: 1rem; }
.review-platform { display: flex; flex-direction: column; min-width: 0; padding: clamp(0.85rem, 2vw, 1.3rem); border: 1px solid var(--line); border-radius: 1rem; background: var(--card); }
.review-platform h3 { margin: 0 0 0.75rem; }
.review-platform iframe { display: block; width: 100%; height: 18rem; border: 0; border-radius: 0.65rem; background: #fff; }
.gis-reviews { flex: 1; display: flex; flex-direction: column; justify-content: center; min-height: 8rem; border-radius: 0.65rem; padding: 1rem; background: #203021; }
.gis-reviews p { margin: 0.45rem 0 0; color: #d4dfd4; }
@media (max-width: 760px) { .review-platforms { grid-template-columns: 1fr; } }
.yandex-reviews-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 0.75rem 1rem; margin-top: 0.85rem; }
.yandex-reviews-actions a:not(.btn) { color: #ffd28b; text-decoration: underline; }

#services .section-heading,
#services .services-lead { max-width: none; }
#services .services-lead { text-wrap: wrap; }

.hero-content .hero-text-lines { max-width: none; font-size: clamp(0.75rem, 2.3cqi, 1rem); }



.home-main > .section-offset {
  padding-block: clamp(1.75rem, 3.8vw, 3.35rem);
}

.home-main > .metrics {
  padding-block: clamp(0.85rem, 2vw, 1.45rem);
}

.home-main > .service-focus-section {
  padding-block: clamp(1.5rem, 3vw, 2.5rem) clamp(1.75rem, 3.8vw, 3.35rem);
  background: transparent;
}

.home-main > .service-focus-section::before { content: none; }
.home-main > .process-section { background: #1c1a17; }

.home-main .section-heading .eyebrow,
.home-main .card-eyebrow { color: #ffd28b; margin-top: 0; }

.home-main .section-heading h2 {
  line-height: 1.14;
  text-wrap: balance;
}

.home-main .section-heading p,
.home-main .hero-text { text-wrap: pretty; }

.home-main .hero-title { max-width: none; }
.home-main .metric-card { border-top-color: #8c6b42; }
.home-main .process-index { color: #ffd28b; }

.hero-grid { align-items: center; gap: clamp(1rem, 3vw, 2.5rem); }
.hero-content { container-type: inline-size; min-width: 0; }
.hero-content .hero-label { padding-inline: 0; }
.hero-content .hero-label::before { content: none; }
.hero-content .hero-title {

  font-weight: 700;
  font-size: clamp(1.1rem, 7.8cqi, 3.1rem);
  line-height: 1.04;
  letter-spacing: -0.025em;
}
.hero-title span { display: block; white-space: nowrap; }
.hero-steps { display: grid; gap: 0.65rem; padding: 0; margin: 0.8rem 0 0; list-style: none; }
.hero-steps li { display: flex; align-items: baseline; gap: 0.55rem; font-weight: 600; }
.hero-steps span {
  display: inline-grid;
  flex: 0 0 1.45rem;
  height: 1.45rem;
  place-items: center;
  border-radius: 50%;
  background: #332a1f;
  color: #ffd28b;
  font-size: 0.8rem;
}
.hero-actions .btn:is(:hover, :focus-visible) {
  background: #fff;
  border-color: #fff;
  color: #111;
}
.hero-actions .btn:focus-visible { outline: 2px solid #ffd28b; outline-offset: 3px; }

.project-gallery-trigger { padding: 0; color: inherit; font: inherit; text-align: left; cursor: pointer; }
.project-gallery { width: min(92vw, 64rem); max-height: 94dvh; padding: 0; border: 1px solid #555; border-radius: 1rem; background: #1c1c1c; color: #fff; }
.project-gallery::backdrop { background: rgb(0 0 0 / 82%); }
.project-gallery > div { position: relative; padding: 1rem; }
.project-gallery h3 { margin: 0 3rem 0.75rem 0; }
.project-gallery :deep(img) { height: min(65dvh, 42rem); object-fit: contain; }
.gallery-controls { display: flex; justify-content: center; align-items: center; gap: 1rem; margin-top: 0.7rem; }
.project-gallery button { min-width: 44px; min-height: 44px; border: 1px solid #666; border-radius: 0.5rem; background: #292929; color: #fff; cursor: pointer; }
.project-gallery button:disabled { opacity: 0.45; }
.gallery-close { position: absolute; top: 0.6rem; right: 0.6rem; font-size: 1.4rem; }
#projects { scroll-margin-top: 102px; }
</style>
