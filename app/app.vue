<template>
  <DevToolbar />
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator
    color="repeating-linear-gradient(to right,#FF99DD
    0%,#94a3b8 100%)"
  />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { CardContainer, CardBody, CardItem } from "@/components/ui/card-3d";

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],

  htmlAttrs: { lang: "en" },
});

import { onMounted } from "vue";
// Smooth anchor scrolling using Tailwind for the offset (scroll-margin-top)
onMounted(() => {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const hash = a.getAttribute("href");
      if (typeof hash === "string" && hash.length > 1) {
        const target = document.querySelector(hash);
        if (target) {
          // Apply scroll-margin-top inline if not set (for browsers that don't support it via CSS)
          if (!(target as HTMLElement).style.scrollMarginTop) {
            // 140px matches the .anchor-target class, adjust as needed
            (target as HTMLElement).style.scrollMarginTop = "140px";
          }
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
});
</script>

<style>
.font-exo2 {
  font-family: Exo2, sans-serif;
}

.font-roboto {
  font-family: Roboto, sans-serif;
}

.font-cinzel {
  font-family: Cinzel, sans-serif;
  font-weight: 900;
  font-style: italic;
}

@reference "~/assets/tailwind.css";
.bgred {
  @apply bg-red-300;
}

.red {
  color: red;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
