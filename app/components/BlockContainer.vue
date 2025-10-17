<script setup lang="ts">
interface BlockContainerProps {
  fullWidth?: boolean;
}

withDefaults(defineProps<BlockContainerProps>(), {
  fullWidth: false,
});
</script>
<template>
  <section :class="['py-16 mx-auto', !fullWidth ? ' max-w-6xl' : '']">
    <slot />
  </section>
</template>
