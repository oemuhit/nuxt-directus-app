<script setup lang="ts">
import { ZoomIn, ArrowLeft, ArrowRight, X } from "lucide-vue-next";
import { motion } from "motion-v";

interface GalleryItem {
  id: string;
  directus_file: string;
  sort?: number;
}

interface GalleryProps {
  data: {
    id: string;
    tagline?: string;
    headline?: string;
    items: GalleryItem[];
  };
}

const props = defineProps<GalleryProps>();

const isLightboxOpen = ref(false);
const currentIndex = ref(0);

const sortedItems = computed(() => {
  if (!props.data.items) return [];
  return [...props.data.items].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
});

const currentItem = computed(() => {
  if (
    !sortedItems.value.length ||
    currentIndex.value < 0 ||
    currentIndex.value >= sortedItems.value.length
  ) {
    return null;
  }
  return sortedItems.value[currentIndex.value];
});

function handleOpenLightbox(index: number) {
  if (index >= 0 && index < sortedItems.value.length) {
    currentIndex.value = index;
    isLightboxOpen.value = true;
  }
}

function handlePrev() {
  if (!sortedItems.value.length) return;
  currentIndex.value =
    currentIndex.value > 0
      ? currentIndex.value - 1
      : sortedItems.value.length - 1;
}

function handleNext() {
  if (!sortedItems.value.length) return;
  currentIndex.value =
    currentIndex.value < sortedItems.value.length - 1
      ? currentIndex.value + 1
      : 0;
}

function handleKeyDown(e: KeyboardEvent) {
  if (!isLightboxOpen.value) return;
  e.preventDefault();
  e.stopPropagation();

  switch (e.key) {
    case "ArrowLeft":
      handlePrev();
      break;
    case "ArrowRight":
      handleNext();
      break;
    case "Escape":
      isLightboxOpen.value = false;
      break;
  }
}

const { setAttr } = useVisualEditing();

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <BlockContainer
    :class="data?.template?.block"
    :fullWidth="data?.full_width ?? false"
    class="flex flex-col justify-center align-center"
  >
    <section class="relative w-full mx-auto max-w-6xl px-4 md:px-0">
      <Tagline
        :class="data?.template?.tagline"
        :tagline="data.tagline"
        :data-directus="
          setAttr({
            collection: 'block_gallery',
            item: data.id,
            fields: 'tagline',
            mode: 'popover',
          })
        "
      />

      <Headline
        :class="data?.template?.headline"
        v-if="data.headline"
        :headline="data.headline"
        :data-directus="
          setAttr({
            collection: 'block_gallery',
            item: data.id,
            fields: 'headline',
            mode: 'popover',
          })
        "
      />

      <div
        v-if="sortedItems.length"
        class="bg-white mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        :data-directus="
          setAttr({
            collection: 'block_gallery',
            item: data.id,
            fields: 'items',
            mode: 'modal',
          })
        "
        :class="data?.template?.items"
      >
        <motion.div
          :initial="{ opacity: 0, filter: 'blur(6px)' }"
          :whileInView="{
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: ((index % 6) + 1) * 0.3, ease: 'easeOut' },
          }"
          v-for="(item, index) in sortedItems"
          :key="item.id"
          class="relative overflow-hidden rounded-lg group hover:shadow-lg transition-all duration-300 cursor-pointer h-[300px]"
          @click="data?.template?.clickable ? handleOpenLightbox(index) : null"
          :class="data?.template?.item"
        >
          <!--      <DirectusImage
            :uuid="item.directus_file"
            :alt="`Gallery item ${item.id}`"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            class="w-full h-full object-contain rounded-lg"
          /> -->

          <NuxtImg
            class="w-full h-full object-contain rounded-lg"
            :src="safeRelationId(item.directus_file) as string"
            :alt="item.id || 'Gallery item image'"
            :modifiers="{
              key: '240w',
            }"
          />

          <div
            class="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300"
            :class="data?.template?.item_hover"
          >
            <ZoomIn class="w-10 h-10 text-gray-800" />
          </div>
        </motion.div>
      </div>

      <Dialog v-model:open="isLightboxOpen">
        <DialogContent
          class="flex min-w-[90vw] min-h-[90vh] items-center justify-center p-2 bg-transparent border-none z-50"
        >
          <DialogTitle class="sr-only">Gallery Image</DialogTitle>
          <DialogDescription class="sr-only">
            Viewing image {{ currentIndex + 1 }} of {{ sortedItems.length }}.
          </DialogDescription>
          <DialogHeader />

          <div
            class="relative w-[90vw] h-[90vh] flex items-center bg-red-500 justify-center"
          >
            <DirectusImage
              v-if="currentItem"
              :uuid="currentItem.directus_file"
              :alt="`Gallery item ${currentItem.id}`"
              class="w-full h-full object-contain"
            />
            <!--           {{ safeRelationId(currentItem?.directus_file) }}
 -->
            <!--       <NuxtImg
              v-if="currentItem"
              :alt="safeRelation(currentItem.directus_file)?.description ?? ''"
              :src="safeRelationId(currentItem.directus_file) ?? ''"
              class="object-cover object-center w-full h-full bg-red-500 dark:brightness-90"
            /> -->
          </div>

          <div
            v-if="sortedItems.length > 1"
            class="absolute bottom-4 inset-x-0 flex justify-between px-4"
          >
            <button
              class="flex items-center gap-2 text-white bg-black/70 rounded-full px-4 py-2 hover:bg-black/90 transition-all"
              @click="handlePrev"
            >
              <ArrowLeft class="w-8 h-8" />
              <span>Prev</span>
            </button>
            <button
              class="flex items-center gap-2 text-white bg-black/70 rounded-full px-4 py-2 hover:bg-black/90 transition-all"
              @click="handleNext"
            >
              <span>Next</span>
              <ArrowRight class="w-8 h-8" />
            </button>
          </div>

          <DialogClose asChild>
            <button
              class="absolute top-4 right-4 bg-black/70 text-white rounded-full p-2 hover:bg-black/90 transition-all"
              aria-label="Close Lightbox"
            >
              <X class="w-8 h-8" />
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </section>
  </BlockContainer>
</template>
