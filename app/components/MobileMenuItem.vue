<script setup lang="ts">
import { motion } from "motion-v";
import Headline from "./base/Headline.vue";
const subMenuOpen = ref(false);

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);
</script>
<template>
  <div v-if="item.children.length > 0">
    <button
      class="flex items-center rounded-md cursor-pointer"
      @click="subMenuOpen = !subMenuOpen"
    >
      <span class="text-2xl mr-2 font-medium dark:text-white font-display">
        {{ item.title }}
      </span>
      <Icon
        v-if="item.children.length > 0"
        name="heroicons:plus"
        class="w-6 h-6 text-primary"
      />
    </button>

    <motion.div
      :initial="{ opacity: 0, x: 400, scale: 0.9 }"
      :animate="
        subMenuOpen
          ? { opacity: 1, x: 0, scale: 1, transition: { duration: 0.3 } }
          : { opacity: 0, x: 400, scale: 0.9, transition: { duration: 0.3 } }
      "
      class="fixed inset-0 z-50 flex flex-col items-center justify-center w-full h-full bg-gray-50 dark:bg-gray-800"
    >
      <div class="w-full px-6">
        <Headline :headline="item.title" class="pb-2 border-b border-b-primary"
          >{{ item.title }}...</Headline
        >

        <NuxtLink
          v-for="child in item.children"
          :key="child.id"
          :to="getNavItemUrl(child as NavigationItem)"
          class="px-3 dark:text-white hover:bg-primary hover:border-b border-b-primary"
        >
          <Text :content="child.title" class="font-medium font-display"> </Text>
          <Text :content="child.label" text-color="light"> </Text>
        </NuxtLink>
      </div>
      <div class="absolute bottom-4 left-4">
        <Button
          @click="subMenuOpen = false"
          size="icon-lg"
          class="py-8 cursor-pointer"
        >
          <Icon name="material-symbols:arrow-back-rounded" class="w-6 h-6" />
        </Button>
      </div>
    </motion.div>
  </div>
  <NuxtLink
    v-else
    :to="getNavItemUrl(item as NavigationItem)"
    class="flex items-center rounded-md dark:text-white cursor-pointer"
  >
    <span class="text-2xl font-medium font-display">
      {{ item.title }}
    </span>
  </NuxtLink>
</template>
