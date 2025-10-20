<script setup lang="ts">
import type {
  BlockVerticalMenu,
  BlockVerticalMenuItem,
} from "../../../shared/types/schema";
import { motion } from "motion-v";

const props = defineProps<{
  data: BlockVerticalMenu;
}>();

const items = computed(() => {
  if (!unref(props.data?.items)) return [];
  return unref(props.data)?.items as BlockVerticalMenuItem[];
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

function handleClick(item: BlockVerticalMenuItem) {
  console.log(item);
  const pagePermalink =
    typeof item.btn?.page === "object" && item.btn.page
      ? item.btn.page.permalink
      : "";
  const postSlug =
    typeof item.btn?.post === "object" && item.btn.post
      ? item.btn.post.slug
      : "";
  const url = item.btn?.external_url ?? pagePermalink ?? postSlug ?? "";

  if (url) {
    navigateTo(url, {
      external: !!item.btn?.external_url,
    });
  }
}
</script>

<template>
  <main class="min-h-screen flex items-center justify-center">
    <div class="w-full min-h-screen md:h-[100vh] overflow-hidden shadow-lg">
      <div
        id="gallery"
        class="flex h-full md:h-[100vh] select-none"
        role="list"
        aria-label="Interactive menu"
      >
        <motion.div
          :initial="{ scale: 1 }"
          :whileInView="{
            scale: 1.05,
            transition: {
              duration: 2, // saniye cinsinden süre
              repeat: Infinity, // sonsuz döngü
              repeatType: 'mirror', // ileri–geri oynat (nefes efekti)
              ease: 'easeInOut', // yumuşak geçiş
            },
          }"
          :viewport="{ once: true }"
          @click="handleClick(item)"
          v-for="(item, index) in items"
          :key="index"
          class="panel relative flex-1 focus:outline-none cursor-pointer"
          aria-label="Item {{ index + 1 }}"
          :data-index="index"
        >
          <div class="w-full h-full">
            <NuxtImg
              v-if="safeRelationId(item.image)"
              class="w-full h-full md:h-screen object-cover"
              :src="safeRelationId(item.image) as string"
              :alt="item.title || 'Menu item image'"
            />
          </div>

          <div class="dh1 flex flex-col font-heading">
            <div class="text-white hide md:inline">{{ item.headline }}</div>

            <div>
              <!-- 							<span class="text-white hide md:inline">WE</span>
 -->
              <span class="ml-2 show">{{ item.title }}</span>
            </div>
            <div class="invisible">#</div>
          </div>
        </motion.div>
      </div>
    </div>
  </main>
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
  color: orangered;
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
