<script setup lang="ts">
import type {
  BlockCardMenu,
  BlockCardMenuItem,
} from "../../../shared/types/schema";
import { motion } from "motion-v";

const props = defineProps<{
  data: BlockCardMenu;
}>();

const items = computed(() => {
  if (!unref(props.data?.items)) return [];
  return unref(props.data)?.items as BlockCardMenuItem[];
});

function handleClick(item: BlockCardMenuItem) {
  if (item.link) {
    navigateTo(getNavItemUrl(item.link as NavigationItem) as string);
  }
}
</script>

<template>
  <div class="relative mx-auto py-12 bg-slate-950 w-full">
    <div class="absolute inset-0 opacity-5 grain-bg dark:opacity-5"></div>

    <div class="flex flex-wrap justify-center">
      <div v-for="item in items" :key="item.id" @click="handleClick(item)">
        <ClientOnly>
          <CardContainer>
            <CardBody
              class="group/card relative w-full h-full rounded-xs border border-black/[0.1] bg-gray-50 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
            >
              <CardItem :translate-z="100" class="w-full relative">
                <NuxtImg
                  v-if="safeRelationId(item.image)"
                  class="animate-zoom cursor-pointer w-100 h-100 md:w-80 md:h-80 lg:h-60 lg:w-60 xl:h-[18svw] xl:w-[18svw] rounded-xs object-cover group-hover/card:shadow-xl"
                  :src="safeRelationId(item.image) as string"
                  :alt="item.title || 'Menu item image'"
                />
                <div
                  class="text-white dark:text-white group-hover/card:text-primary group-hover/card:font-black transition-all duration-300 cursor-pointer absolute bottom-0 left-0 right-0 p-4 rounded-b-xs bg-black/50 text-4xl text-center"
                >
                  {{ item.headline }}
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style>
.panel {
  background-size: cover;
  background-position: center;
  min-width: 0;
  position: relative;
  transition: flex 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), filter 1s ease;
}
.panel.dimmed::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
}

.panel::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
}

.panel.active::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 3s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.panel.active .dh1 {
  color: var(--primary);
}

.panel .dh1 span.hide {
  /* display: none;*/
  opacity: 0;
}

.panel .dh1 div.hide {
  /* display: none;*/
  opacity: 0;
}
.panel.active .dh1 div.hide {
  /* display: block;*/
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}
.panel.active .dh1 span.hide {
  /* display: block;*/
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.panel .dh1 {
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);

  transform-origin: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
  pointer-events: none;
}

/* Desktop styling */
@media (min-width: 768px) {
  .panel .dh1 {
    font-size: 4rem !important;
  }
}

/* Mobile styling */
@media (max-width: 767px) {
  .panel .dh1 {
    font-size: 2rem !important;
    transform: translate(-50%, -50%) rotate(0deg);

    bottom: 1rem;
    top: auto;
    left: 1rem;
    transform: none;
    margin: 0 auto;
  }

  .panel {
    min-height: 25vh !important;
    max-height: 25vh !important;
  }
}

.steps-animation .path {
  stroke-dasharray: 1, 30;
  -webkit-animation: dash 5s linear both infinite;
  animation: dash 5s linear both infinite;
}

@keyframes dash {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: -15rem;
  }
}

.animate-zoom {
  animation: zoomInOut 6s ease-in-out infinite;
}

@keyframes zoomInOut {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.97);
  }
  100% {
    transform: scale(1);
  }
}
</style>
