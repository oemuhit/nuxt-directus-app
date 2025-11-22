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
let activeIndex = -1;

const gallery = ref<HTMLElement | null>(null);
const panels = ref<HTMLElement[]>([]);

onMounted(() => {
  gallery.value = document.getElementById("gallery");
  panels.value = Array.from(
    gallery.value?.querySelectorAll(".panel") || []
  ) as HTMLElement[];
  panels.value.forEach((p, i) => {
    p.addEventListener("mouseenter", () => {
      activeIndex = i;
      applyLayout();
    });
    p.addEventListener("focus", () => {
      activeIndex = i;
      applyLayout();
    });
    p.addEventListener("mouseleave", () => {
      activeIndex = -1;
      applyLayout();
    });
    p.addEventListener("blur", () => {
      activeIndex = -1;
      applyLayout();
    });
  });

  applyLayout();
});

function applyLayout() {
  panels.value.forEach((p, i) => {
    if (activeIndex === -1) {
      (p as HTMLElement).style.flex = "2";
      p.classList.remove("active", "dimmed");
    } else if (i === activeIndex) {
      (p as HTMLElement).style.flex = "5";
      p.classList.add("active");
      p.classList.remove("dimmed");
    } else {
      (p as HTMLElement).style.flex = "1.6";
      p.classList.add("dimmed");
      p.classList.remove("active");
    }
  });
}

function handleResize() {
  if (!gallery.value || !panels.value.length) return;

  if (window.innerWidth < 768) {
    // Mobile: Vertical stack layout
    gallery.value.style.flexDirection = "column";
    gallery.value.style.height = "auto";
    panels.value.forEach((p) => {
      (p as HTMLElement).style.minHeight = "25vh";
      (p as HTMLElement).style.maxHeight = "25vh";
      (p as HTMLElement).style.flex = "0 0 auto";
      (p as HTMLElement).style.width = "100%";
      p.classList.remove("dimmed", "active");
    });
  } else {
    // Desktop: Horizontal gallery layout
    gallery.value.style.flexDirection = "row";
    gallery.value.style.height = "100vh";
    panels.value.forEach((p) => {
      (p as HTMLElement).style.minHeight = "";
      (p as HTMLElement).style.maxHeight = "";
      (p as HTMLElement).style.width = "";
    });
    applyLayout();
  }
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
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

    <div class="flex flex-row justify-center flex-wrap">
      <div v-for="item in items" :key="item.id" @click="handleClick(item)">
        <ClientOnly>
          <CardContainer>
            <CardBody
              class="group/card relative size-auto rounded-sm border border-black/[0.1] bg-gray-50 sm:w-[18rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
            >
              <CardItem :translate-z="100" class="w-full relative">
                <NuxtImg
                  v-if="safeRelationId(item.image)"
                  class="cursor-pointer h-100 md:h-80 lg:h-60 w-full rounded-sm object-cover group-hover/card:shadow-xl"
                  :src="safeRelationId(item.image) as string"
                  :alt="item.title || 'Menu item image'"
                />
                <div
                  class="text-white dark:text-white group-hover/card:text-primary group-hover/card:font-black transition-all duration-300 cursor-pointer absolute bottom-0 left-0 right-0 p-4 rounded-b-sm bg-black/50 text-4xl text-center"
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
</style>
