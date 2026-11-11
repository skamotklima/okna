<template>
  <span class="blur-image" :class="[attrs.class, { 'is-loaded': isLoaded }]">
    <img
      v-if="placeholderSrc"
      :src="placeholderSrc"
      :width="width"
      :height="height"
      :class="attrs.class"
      class="blur-image__placeholder"
      alt=""
      aria-hidden="true"
      loading="eager"
      decoding="async"
    />
    <img
      ref="imageRef"
      v-bind="imageAttrs"
      :src="displaySrc"
      :srcset="srcset"
      :sizes="sizes"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      :decoding="decoding"
      :fetchpriority="fetchpriority"
      :class="attrs.class"
      class="blur-image__img"
      @load="markLoaded"
      @error="markLoaded"
    />
  </span>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, watch } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    src: string;
    alt: string;
    sizes?: string;
    loading?: "eager" | "lazy";
    decoding?: "async" | "auto" | "sync";
    fetchpriority?: "high" | "low" | "auto";
    width?: number | string;
    height?: number | string;
  }>(),
  {
    sizes: "100vw",
    loading: "lazy",
    decoding: "async",
    fetchpriority: undefined,
    width: undefined,
    height: undefined,
  },
);

const attrs = useAttrs();
const imageRef = ref<HTMLImageElement | null>(null);
const isLoaded = ref(false);

const photoRoot = "/illustrations/photo_succ/";
const optimizedRoot = "/illustrations/photo_succ_optimized/";
const blurRoot = "/illustrations/photo_succ_blur/";

const isPhoto = computed(() => props.src.startsWith(photoRoot));

const getOptimizedSrc = (size: "480" | "900" | "1400") =>
  props.src.replace(photoRoot, `${optimizedRoot}${size}/`);

const displaySrc = computed(() => (isPhoto.value ? getOptimizedSrc("900") : props.src));

const srcset = computed(() => {
  if (!isPhoto.value) {
    return undefined;
  }

  return [
    `${getOptimizedSrc("480")} 480w`,
    `${getOptimizedSrc("900")} 900w`,
    `${getOptimizedSrc("1400")} 1400w`,
  ].join(", ");
});

const placeholderSrc = computed(() =>
  isPhoto.value ? props.src.replace(photoRoot, blurRoot) : "",
);

const imageAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});

const markLoaded = () => {
  isLoaded.value = true;
};

watch(
  () => props.src,
  () => {
    isLoaded.value = false;
  },
);

onMounted(() => {
  if (imageRef.value?.complete) {
    markLoaded();
  }
});
</script>
