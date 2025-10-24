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
  <iframe
    :id="name"
    frameborder="0"
    class="w-full aspect-video"
    :src="url"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen="true"
    :title="title as string"
  ></iframe>
</template>

<style>
.aspect-video {
  aspect-ratio: 16 / 9;
}
</style>
