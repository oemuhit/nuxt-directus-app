<template>
  .....
  <BlockContainer
    fullWidth
    class="relative background-blue"
    :data-directus="
			setAttr({ collection: 'block_faqs', item: data?.id as string, /* fields: 'title', */ mode: 'drawer' })
		"
  >
    <!-- 	max-w-3xl
 -->
    <div class="absolute inset-0 opacity-10 grain-bg dark:opacity-10"></div>

    <div
      class="relative text-center max-w-6xl pt-4 mx-auto flex flex-col gap-8 justify-center"
    >
      <TypographyTitle as="h2" v-if="data.tagline" class="font-heading">
        {{ data.tagline }}
      </TypographyTitle>

      <TypographyHeadline
        v-if="data.headline"
        :content="data.headline"
        class="font-heading"
      />

      <Accordion type="single" collapsible>
        <AccordionItem
          v-for="(faq, index) in data.faqs"
          :key="index"
          :value="index + 'item'"
          class="py-2"
        >
          <AccordionTrigger
            class="!text-none text-3xl !font-extrabold font-heading hover:!no-underline cursor-pointer"
          >
            <div v-html="faq.question"></div>
          </AccordionTrigger>
          <AccordionContent>
            <div
              class="leading-relaxed text-2xl font-sans"
              v-html="faq.answer"
            ></div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </BlockContainer>
</template>

<script lang="ts" setup>
import { setAttr, apply } from "@directus/visual-editing";
import type { BlockFaq } from "@@/shared/types/schema";

const props = defineProps<{
  data: BlockFaq;
}>();
</script>

<style>
.background-blue {
  background-color: rgb(0, 47, 109) !important;
  color: rgb(255, 255, 255) !important;
}

.goldman-black {
  font-family: "Goldman", sans-serif;
  font-weight: 900;
  font-style: normal;
}

.exo2-medium {
  font-family: "Exo 2", sans-serif;
  font-weight: 500;
  font-style: normal;
}
</style>
