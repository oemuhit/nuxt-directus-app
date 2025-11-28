<script setup lang="ts">
import { generateVideoEmbed } from "@@/app/utils/embed";

interface VideoProps {
  url: string;
  title?: string | null | undefined;
  name?: string;
}

defineProps<VideoProps>();
</script>

<template>
  <div class="relative w-full h-full aspect-video group">
    <span
      class="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity group-hover:opacity-0"
      style="background: rgba(0, 0, 0, 0.25)"
    >
      <svg
        class="w-20 h-20 text-white opacity-80"
        fill="currentColor"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="32" fill="currentColor" opacity="0.15" />
        <polygon points="25,18 25,46 46,32" fill="currentColor" opacity="0.8" />
      </svg>
    </span>
    <iframe
      :id="name"
      frameborder="0"
      class="w-full aspect-video"
      :src="url"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen="true"
      :title="title as string"
    ></iframe>
  </div>
</template>

<style>
.aspect-video {
  aspect-ratio: 16 / 9;
}
</style>
