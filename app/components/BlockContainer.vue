<script setup lang="ts">
interface BlockContainerProps {
  fullWidth?: boolean;
}

withDefaults(defineProps<BlockContainerProps>(), {
  fullWidth: false,
});
</script>
<template>
  <section
    :class="[
      'py-16 mx-auto',
      !fullWidth ? 'px-4 sm:px-4 lg:px-4 xl:px-0   lg:py-24 max-w-6xl' : '',
    ]"
  >
    <slot />
  </section>
</template>
