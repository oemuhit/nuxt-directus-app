<script setup lang="ts">
import type {
  BlockButtonGroup,
  BlockButton,
  Page,
  Post,
} from "#shared/types/schema";

defineProps<{
  data: BlockButtonGroup;
}>();

function getUrl(button: BlockButton): string | undefined {
  switch (button.type) {
    case "page":
      return (button.page as Page)?.permalink ?? undefined;
    case "post":
      return (button.post as Post)?.slug ?? undefined;
    case "url":
      return button.url ?? undefined;
    default:
      return undefined;
  }
}
</script>
<template>
  <!-- 	justify-${data.alignment}

      :color="button?.color"

 -->
  <div
    :class="`flex flex-col  space-y-4 md:space-x-4 md:flex-row md:space-y-0`"
  >
    <Button
      v-for="button in data.buttons as BlockButton[]"
      :key="button.id"
      @click="navigateTo(getUrl(button))"
      :target="button?.url ? '_blank' : '_self'"
      :label="button?.label ?? undefined"
      size="lg"
      class="cursor-pointer"
    >
      {{ button?.label }}
      <Icon name="material-symbols:arrow-forward-rounded" />
    </Button>
  </div>
</template>
