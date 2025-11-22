<script setup lang="ts">
import { cn } from "@/lib/utils";

interface PageBuilderProps {
  sections: PageBlock[];
}

const props = defineProps<PageBuilderProps>();

const validBlocks = computed(() =>
  props.sections.filter(
    (block): block is PageBlock & { collection: string; item: object } =>
      typeof block.collection === "string" &&
      !!block.item &&
      typeof block.item === "object"
  )
);

const template = useState("template");
</script>

<template>
  <div :class="template?.page_builder">
    <div
      v-for="block in validBlocks"
      :key="block.id"
      :data-background="block.background"
      :class="cn(block.background === 'dark' ? 'dark' : '')"
    >
      <!--     <Container> -->
      <!--  -->
      <BaseBlock :block="block" />
      <!--     </Container> -->
    </div>
  </div>
</template>
