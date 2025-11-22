<script setup lang="ts">
/* import RichText from "~/components/block/RichText.vue";
import Gallery from "~/components/block/Gallery.vue";
import Pricing from "~/components/block/Pricing.vue";
import Posts from "~/components/block/Posts.vue";
import Form from "~/components/block/FormBlock.vue";
import Hero from "~/components/block/Hero.vue";
 */
interface BaseBlockProps {
  block: {
    collection: string;
    item: any;
    id: string;
  };
}

const props = defineProps<BaseBlockProps>();
const blockRef = ref<HTMLElement | null>(null);

const components: Record<string, any> = {
  block_card_menu: resolveComponent("CardMenu"),
  block_hero: resolveComponent("Hero"),
  block_richtext: resolveComponent("RichText"),
  block_gallery: resolveComponent("Gallery"),
  block_pricing: resolveComponent("Pricing"),
  block_posts: resolveComponent("Posts"),
  block_form: resolveComponent("FormBlock"),
  block_vertical_menu: resolveComponent("VerticalMenu"),
  block_steps: resolveComponent("Steps"),
  block_cta: resolveComponent("Cta"),
  block_row_vertical: resolveComponent("RowVertical"),
  block_row_sequential: resolveComponent("RowSequential"),
  block_row_normal: resolveComponent("RowNormal"),
  block_faq: resolveComponent("Faq"),
};

const Component = computed(() => components[props.block.collection] || null);
const componentData = computed(() => props.block.item);
</script>

<template>
  <div ref="blockRef" class="relative">
    <component
      :is="Component"
      v-if="Component"
      :id="`block-${block.id}`"
      :data="componentData"
    />
  </div>
</template>
