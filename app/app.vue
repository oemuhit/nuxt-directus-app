<template>
  <div>
    <DevToolbar />
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator
      color="repeating-linear-gradient(to right,#FF99DD
    0%,#94a3b8 100%)"
    />
    <NuxtLayout>
      <NuxtPage />

      <p>Current route: {{ route.path }}</p>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import TestColors from "./pages/test-colors.vue";

const route = useRoute();

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: { lang: "en" },
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
