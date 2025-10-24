<script setup lang="ts">
import type {
  BlockRowVertical,
  BlockButton,
  Page,
  Post,
} from "#shared/types/schema";
import { setAttr, apply } from "@directus/visual-editing";
import { motion } from "motion-v";

const props = defineProps<{
  data: BlockRowVertical;
}>();

import { ref, onMounted, onUnmounted, computed } from "vue";

const bg = ref<HTMLElement | null>(null);
const strength = 40;

// Mouse aware background özelliği aktif mi kontrol et
const isMouseAware = computed(() => props.data?.mouse_aware_bg === true);

function handleMouse(e: MouseEvent) {
  if (!isMouseAware.value || !bg.value) return;

  const normX = e.clientX / window.innerWidth - 0.5;
  const normY = e.clientY / window.innerHeight - 0.5;
  const tx = -normX * strength;
  const ty = -normY * strength;
  bg.value.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
}

function handleOrientation(e: DeviceOrientationEvent) {
  if (!isMouseAware.value || !bg.value) return;

  const tiltX = (e.gamma || 0) / 45; // -1..1
  const tiltY = (e.beta || 0) / 45;
  const tx = tiltX * strength;
  const ty = tiltY * strength;
  bg.value.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
}

onMounted(() => {
  if (isMouseAware.value) {
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("deviceorientation", handleOrientation);
  }
});

onUnmounted(() => {
  if (isMouseAware.value) {
    window.removeEventListener("mousemove", handleMouse);
    window.removeEventListener("deviceorientation", handleOrientation);
  }
});
/* function getUrl(button: BlockButton): string | undefined {
  switch (button.type) {
    case "page":
      return (button.page as Page)?.permalink ?? undefined;
    case "post":
      return (button.post as Post)?.slug ?? undefined;
    case "url":
      return button.url ?? undefined;
    default:
      return undefined;
  }
} */
/* import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

 const isMobile = computed(() => {
	return useBreakpoints(breakpointsTailwind).smaller('md');
}); */

const config = useRuntimeConfig();
const directusUrl = config.public.directus.rest.baseUrl;

onMounted(() => {
  apply({ directusUrl: directusUrl as string });
});
</script>

<template>
  <BlockContainer
    :fullWidth="data?.full_width ?? false"
    class="relative overflow-hidden"
    :class="data?.template?.block"
  >
    <div
      :ref=" isMouseAware ? 
				(el) => {
					if (el) bg = el as HTMLElement;
				}:`null`
			"
      :class="isMouseAware ? 'mouse-aware-bg' : ''"
      :style="{
        backgroundColor: data?.bg_color ?? 'transparent',
        backgroundSize: 'cover',
        backgroundImage: data?.bg_image
          ? 'url(' + directusUrl + '/assets/' + data?.bg_image + ')'
          : 'none',
      }"
    >
      <div
        v-if="
          !(isMouseAware || data?.template?.bgShadow) &&
          data?.bg_type === 'color' &&
          data?.bg_color
        "
        class="absolute inset-0 opacity-10 grain-bg dark:opacity-5"
      ></div>
      <div
        class="absolute top-0 left-0 w-full h-full"
        :class="data?.template?.bgShadow && 'bg-black/50 backdrop-saturate-200'"
      ></div>

      <div
        :data-directus="
          setAttr({
            collection: 'block_row_vertical',
            item: data?.id,
            /* fields: 'title', */ mode: 'drawer',
          })
        "
        class="relative z-10 flex flex-col md:flex-row justify-center min-h-screen max-w-7xl items-center mx-auto"
      >
        <div
          class="box1-wrapper my-4 md:my-0 md:justify-center lg:justify-end md:max-w-xs lg:max-w-md"
        >
          <div class="px-4 md:py-4 md:px-4 box1">
            <BoxReveal color="darkorange">
              <TypographyTitle
                class="text-5xl md:text-7xl !font-black font-heading"
                v-if="data?.tagline"
                :class="data?.template?.tagline"
              >
                {{ data?.tagline }}
              </TypographyTitle>
            </BoxReveal>
          </div>
        </div>
        <!-- 			<div class="text-neutral-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</div>
 -->

        <!-- -->

        <motion.div
          :initial="{ opacity: 0, y: 100 }"
          :whileInView="{
            opacity: 1,
            y: 0,
            transition: { duration: 0.2 },
          }"
          class="px-4 md:px-0"
        >
          <TypographyHeadline
            v-if="data?.headline"
            :content="data?.headline"
            :class="data?.template?.headline"
          />

          <TypographyProse
            v-if="data?.content"
            :content="data?.content"
            class="mt-4"
            :class="data?.template?.content"
          />
        </motion.div>
      </div>
    </div>
  </BlockContainer>
</template>

<style scoped>
.mouse-aware-bg {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.1s ease-out;
  z-index: 1;
}

/* Container'ın overflow hidden olması için */
.relative.overflow-hidden {
  position: relative;
  overflow: hidden;
}
@media (min-width: 768px) {
  .box1-wrapper {
    display: flex;
    align-items: center;
  }

  .box1 {
    transform: rotate(270deg);
  }
}
</style>
