<script setup lang="ts">
import type {
  BlockRowNormal,
  BlockButton,
  Page,
  Post,
} from "#shared/types/schema";
import { setAttr, apply } from "@directus/visual-editing";
import { motion } from "motion-v";

const props = defineProps<{
  data: BlockRowNormal;
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

const config = useRuntimeConfig();
const directusUrl = config.public.directus.rest.baseUrl;

onMounted(() => {
  apply({ directusUrl: directusUrl as string });
});

const videoUrl = computed(() => {
  if (props.data.video_type === "file" && props.data.video_file) {
    return (directusUrl + "/assets/" + props.data.video_file) as string;
  }

  if (props.data.video_type === "url" && props.data.video_url) {
    return props.data.video_url;
  }

  return null;
});
</script>

<template>
  ///
  <BlockContainer
    class="relative overflow-hidden"
    :fullWidth="data?.full_width ?? false"
    :class="data?.template?.block"
  >
    {{ data?.template?.block }}

    <div
      :ref=" isMouseAware ? 
				(el) => {
					if (el) bg = el as HTMLElement;
				}:`null`
			"
      :class="isMouseAware ? 'mouse-aware-bg' : ''"
      :style="{
        backgroundColor:
          data?.bg_type === 'color'
            ? data?.bg_color ?? 'transparent'
            : 'transparent',
        backgroundSize: 'cover',
        backgroundImage:
          data?.bg_type === 'image' && data?.bg_image
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
      <section
        class="relative w-full mx-auto flex flex-col gap-6 md:gap-12 max-w-6xl"
        :class="{
          'items-center text-center': data.layout === 'image_center',
          'md:flex-row-reverse items-center': data.layout === 'image_left',
          'md:flex-row items-center':
            data.layout !== 'image_center' && data.layout !== 'image_left',
        }"
      >
        <motion.div
          :initial="{ opacity: 0, y: 100 }"
          :whileInView="{
            opacity: 1,
            y: 0,
            transition: { duration: 0.2, ease: 'easeInOut' },
          }"
          class="flex flex-col gap-4 w-full"
          :class="{
            'md:w-3/4 xl:w-2/3 items-center': data.layout === 'image_center',
            'md:w-1/2 items-start': data.layout !== 'image_center',
          }"
        >
          <Tagline
            :tagline="data.tagline"
            :class="data?.template?.tagline"
            :data-directus="
              setAttr({
                collection: 'block_hero',
                item: data.id,
                fields: 'tagline',
                mode: 'popover',
              })
            "
          />
          <Headline
            class="lg:text-headline-anfen"
            :class="data?.template?.headline"
            :headline="data.headline"
            :data-directus="
              setAttr({
                collection: 'block_hero',
                item: data.id,
                fields: 'headline',
                mode: 'popover',
              })
            "
          />
          <Text
            v-if="data.description"
            :content="data.description"
            :class="data?.template?.description"
            :data-directus="
              setAttr({
                collection: 'block_hero',
                item: data.id,
                fields: 'description',
                mode: 'popover',
              })
            "
          />

          <div
            v-if="data.button_group?.buttons?.length"
            class="mt-6"
            :class="{ 'flex justify-center': data.layout === 'image_center' }"
          >
            <ButtonGroup
              :buttons="data.button_group.buttons"
              :data-directus="
                setAttr({
                  collection: 'block_button_group',
                  item: data.button_group?.id,
                  fields: 'buttons',
                  mode: 'modal',
                })
              "
            />
          </div>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, y: 100 }"
          :whileInView="{
            opacity: 1,
            y: 0,
            transition: { duration: 0.2 },
          }"
          v-if="data.image || videoUrl"
          class="relative w-full"
          :class="{
            'md:w-3/4 xl:w-2/3 h-[400px]': data.layout === 'image_center',
            'md:w-1/2 h-[562px]': data.layout !== 'image_center',
          }"
        >
          <div
            class="h-full flex items-center justify-center"
            v-if="data.media_type === 'video' && videoUrl"
          >
            <VVideo
              class="my-auto border dark:border-gray-700 rounded-card"
              :url="videoUrl"
              :title="data.tagline || data.headline || 'Video'"
            />
          </div>
          <DirectusImage
            v-if="data.media_type === 'image' && data.image"
            :uuid="data.image"
            :alt="data.tagline || data.headline || 'Hero Image'"
            :fill="true"
            :sizes="
              data.layout === 'image_center'
                ? '100vw'
                : '(max-width: 768px) 100vw, 50vw'
            "
            class="object-contain"
            :data-directus="
              setAttr({
                collection: 'block_hero',
                item: data.id,
                fields: ['image', 'layout'],
                mode: 'modal',
              })
            "
          />
        </motion.div>
      </section>
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
