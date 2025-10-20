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
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
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
</style>
