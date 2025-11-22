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
import { cn } from "@/lib/utils";
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
  //bg.value.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
  bg.value.style.backgroundPosition = `calc(50% + ${tx}px) calc(50% + ${ty}px)`;
}

function handleOrientation(e: DeviceOrientationEvent) {
  if (!isMouseAware.value || !bg.value) return;

  const tiltX = (e.gamma || 0) / 45; // -1..1
  const tiltY = (e.beta || 0) / 45;
  const tx = tiltX * strength;
  const ty = tiltY * strength;
  //bg.value.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
  bg.value.style.backgroundPosition = `calc(50% + ${tx}px) calc(50% + ${ty}px)`;
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
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const isMobile = computed(() => {
  return useBreakpoints(breakpointsTailwind).smaller("md");
});

const config = useRuntimeConfig();
const directusUrl = config.public.directus.rest.baseUrl;

onMounted(() => {
  apply({ directusUrl: directusUrl as string });
});
</script>

<template>
  <BlockContainer
    :fullWidth="data?.full_width ?? false"
    class="flex flex-col justify-center align-center"
    :class="data?.template?.block"
  >
    <!--   backgroundSize: isMobile ? 'cover' : '110% auto',
 -->
    <div
      class="inset-0 absolute bg-no-repeat md:bg-size-[110%] auto bg-cover"
      :style="{
        backgroundColor:
          data.bg_type === 'color'
            ? data?.bg_color ?? 'transparent'
            : 'transparent',

        backgroundPosition: 'center',
        transition: 'background-position 0.1s ease-out',

        backgroundImage:
          data.bg_type === 'image'
            ? data?.bg_image
              ? 'url(' +
                directusUrl +
                '/assets/' +
                data?.bg_image +
                '?key=1200w' +
                ')'
              : 'none'
            : 'none',
      }"
      :ref=" isMouseAware ? 
				(el) => {
					if (el) bg = el as HTMLElement;
				}:`null`
			"
    ></div>
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

    <div class="flex flex-col justify-center align-center">
      <div
        :data-directus="
          setAttr({
            collection: 'block_row_sequential',
            item: data?.id,
            /* fields: 'title', */ mode: 'drawer',
          })
        "
        class="my-auto mx-auto flex flex-col items-center justify-center gap-12 px-4 lg:px-0 max-w-6xl"
      >
        <motion.div
          :initial="{ opacity: 0, y: 100 }"
          :whileInView="{
            opacity: 1,
            y: 0,
            transition: { duration: 0.2 },
          }"
          class="z-1"
        >
          <TypographyTitle
            class="font-heading"
            :class="data?.template?.tagline"
            v-if="data?.tagline"
          >
            {{ data?.tagline }}
          </TypographyTitle>
        </motion.div>

        <motion.div
          class="z-1"
          :initial="{ opacity: 0, y: 100 }"
          :whileInView="{
            opacity: 1,
            y: 0,
            transition: { duration: 0.2 },
          }"
        >
          <TypographyHeadline
            class="font-heading"
            :class="data?.template?.headline"
            v-if="data?.headline"
            :content="data?.headline"
          />
        </motion.div>

        <motion.div
          class="z-1"
          :initial="{ opacity: 0, y: 100 }"
          :whileInView="{
            opacity: 1,
            y: 0,
            transition: { duration: 0.2 },
          }"
        >
          <TypographyProse
            v-if="data?.content"
            :content="data?.content"
            :class="
              cn('mt-4 px-4 md:px-0 font-semibold ', data?.template?.content)
            "
        /></motion.div>

        <div
          v-if="data.button"
          :class="`z-10 flex flex-col justify-center space-y-4 md:space-x-4 md:flex-row md:space-y-0 `"
        >
          <!-- 		:size="'lg' || data.button?.size ?? 'default'"
 -->
          <Button
            @click="navigateTo(getUrl(data.button as BlockButton))"
            :id="data.button?.id ?? ''"
            :variant="data.button?.variant ?? 'outline'"
            :target="data.button?.url ? '_blank' : '_self'"
            :size="data.button?.size ?? 'default'"
            :class="data?.template?.button"
          >
            <span v-if="data.button?.label">{{ data.button?.label }}</span>
            <Icon name="material-symbols:arrow-forward-rounded" />
          </Button>
        </div>
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
