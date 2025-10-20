<script setup lang="ts">
import type {
  BlockRowSequential,
  BlockButton,
  Page,
  Post,
} from "#shared/types/schema";
import { setAttr, apply } from "@directus/visual-editing";
import { motion } from "motion-v";
import Button, { type ButtonProps } from "../base/BaseButton.vue";

const props = defineProps<{
  data: BlockRowSequential;
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
function getUrl(button: BlockButton): string | undefined {
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
}
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
  <div
    :fullWidth="data?.full_width ?? false"
    class="relative overflow-hidden bg-red-500"
    :style="{
      backgroundColor: !isMouseAware
        ? data?.bg_color ?? 'transparent'
        : 'transparent',
      backgroundImage:
        !isMouseAware && data?.bg_image
          ? 'url(' + directusUrl + '/assets/' + data?.bg_image + ')'
          : 'none',
    }"
  >
    <div class="absolute inset-0 opacity-10 grain-bg dark:opacity-5"></div>
    <!-- Mouse Aware Background -->
    <div
      v-if="isMouseAware"
      :ref="
				(el) => {
					if (el) bg = el as HTMLElement;
				}
			"
      class="mouse-aware-bg"
      :style="{
        backgroundColor: data?.bg_color ?? 'transparent',
        backgroundImage: data?.bg_image
          ? 'url(' + directusUrl + '/assets/' + data?.bg_image + ')'
          : 'none',
      }"
    ></div>

    <div
      :data-directus="
        setAttr({
          collection: 'block_row_sequential',
          item: data?.id,
          /* fields: 'title', */ mode: 'drawer',
        })
      "
      class="relative z-10 my-auto flex flex-row items-center justify-center py-12 gap-12"
    >
      <div class="flex flex-col items-center justify-center gap-4">
        <TypographyTitle
          class="font-heading"
          :class="data?.template?.tagline?.class"
          v-if="data?.tagline"
        >
          {{ data?.tagline }}
        </TypographyTitle>

        <TypographyHeadline
          class="font-heading"
          v-if="data?.headline"
          :content="data?.headline"
          :class="data?.template?.headline?.class"
        />

        <TypographyProse
          v-if="data?.content"
          :content="data?.content"
          class="mt-4 px-4 md:px-0"
          :class="data?.template?.content?.class"
        />

        <!-- 				<TextGlitch :speed="1" :enable-shadows="true" text="Inspira UI" />

		-->

        <!-- 				<UButton
					:to="getUrl(data.btn as BlockButton)"
					:color="data.btn?.color"
					variant="outline"
					:target="data.btn?.external_url ? '_blank' : '_self'"
					:label="data.btn?.label ?? undefined"
					size="xl"
					trailing-icon="material-symbols:arrow-forward-rounded"
				/> -->

        <div
          :class="`flex flex-col justify-center space-y-4 md:space-x-4 md:flex-row md:space-y-0`"
        >
          <!-- 		:size="'lg' || data.button?.size ?? 'default'"
 -->
          <Button
            @click="navigateTo(getUrl(data.button as BlockButton))"
            :id="data.button?.id ?? ''"
            :variant="data.button?.variant ?? 'outline'"
            :target="data.button?.url ? '_blank' : '_self'"
            :size="data.button?.size ?? 'default'"
            :class="data?.template?.button?.class"
          >
            <span v-if="data.button?.label">{{ data.button?.label }}</span>
            <Icon name="material-symbols:arrow-forward-rounded" />
          </Button>
        </div>
      </div>
    </div>
  </div>
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
