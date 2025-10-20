<template>
  <div class="bg-gray-200 relative" :class="class">
    <div class="w-full h-full">
      <div
        class="absolute inset-0 opacity-50"
        style="
          background: radial-gradient(circle, #e5e7eb 3px, transparent 4px),
            radial-gradient(circle, #e5e7eb 3px, transparent 4px);
          background-position: 0 0, 16px 16px;
          background-size: 4px 4px;
        "
      ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
});
</script>
