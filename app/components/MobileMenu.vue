<script setup lang="ts">
import { motion } from "motion-v";
const props = defineProps({
  navigation: {
    type: Object,
    required: true,
  },
});

const route = useRoute();
const { globals } = useAppConfig();

const isOpen = defineModel<boolean>("isOpen", { required: true });
const subMenuOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
  subMenuOpen.value = false;
};

// Watch route changes and close the menu
watch(
  () => route.path,
  (newVal, oldVal) => {
    isOpen.value = false;
  }
);

// Disbale scrolling when the menu is open
watch(
  () => isOpen.value,
  (newVal, oldVal) => {
    if (newVal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
);

const lastItem = computed(() => {
  return props.navigation.items.at(-1);
});
</script>
<template>
  <div class="md:hidden">
    <!-- Menu -->
    <motion.div
      v-if="isOpen"
      :initial="{ opacity: 0, y: 400, scale: 0.9 }"
      :animate="{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } }"
      :exit="{ opacity: 0, y: 400, scale: 0.9, transition: { duration: 0.3 } }"
      :viewport="{ once: true }"
      class="fixed inset-0 z-50 flex flex-col w-full h-full bg-gray-50 dark:bg-gray-800"
    >
      <div
        class="relative w-full px-6 pt-6 flex justify-between border-b dark:border-gray-700 items-start"
      >
        <div>
          <NuxtLink href="/">
            <Logo class="dark:text-white" />
          </NuxtLink>
          <Text
            v-if="globals?.tagline"
            :content="globals.tagline"
            class="pb-4 mt-2"
          >
          </Text>
        </div>
        <ThemeToggle class="shrink-0 z-100 cursor-pointer" />
      </div>
      <div class="flex flex-col justify-center h-full px-6 space-y-4">
        <MobileMenuItem
          v-for="item in navigation.items"
          :key="item.id"
          :item="item"
          @close="toggle"
          class="text-center border-b border-b-gray-300 py-2 justify-center items-center rounded-none font-heading"
        />

        <Button
          @click="navigateTo(lastItem?.page?.permalink as string)"
          variant="default"
          size="lg"
          class="py-8 font-heading text-3xl bg-primary text-white dark:bg-orange-800 border-2 border-gray-300 cursor-pointer rounded-xs"
          >Bize Ulaşın

          <Icon name="heroicons:chevron-right" class="w-6 h-6" />
        </Button>
      </div>
    </motion.div>
    <!-- Button -->
    <!--   :class="{
        'bg-indigo-300': isOpen || !isOpen,
      }" -->
    <button
      class="fixed z-50 p-4 transition duration-300 shadow-md md:hidden bottom-4 right-4 hover:bg-opacity/75 rounded-button bg-primary dark:bg-white text-white dark:text-black rounded-md cursor-pointer"
      @click="toggle"
    >
      <div>
        <span class="sr-only">Close</span>
        <Icon v-if="!isOpen" name="heroicons:bars-3" class="w-6 h-6" />
        <Icon v-if="isOpen" name="heroicons:x-mark" class="w-6 h-6" />
      </div>
    </button>
  </div>
</template>
