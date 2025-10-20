<script setup lang="ts">
import type {
  BlockStep,
  BlockStepItem,
  BlockButtonGroup,
} from "@@/shared/types/schema";
import { motion } from "motion-v";
const props = defineProps<{
  data: BlockStep;
}>();

const steps = computed(() => {
  if (!unref(props.data?.steps)) return [];
  return unref(props.data)?.steps as BlockStepItem[];
});
</script>
<template>
  <BlockContainer>
    <TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
    <TypographyHeadline
      v-if="data.headline"
      :content="data.headline"
      size="lg"
    />
    <div class="mt-8">
      <template v-for="(step, stepIdx) in steps" :key="stepIdx">
        <motion.div
          :initial="{
            opacity: 0,
            scale: 0.95,
            y: 60,
          }"
          :while-in-view="{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 80,
              duration: 0.5,
              delay: stepIdx * 0.15,
            },
          }"
          :viewport="{ once: true, amount: 0.5 }"
          :class="[
            {
              'mr-8 md:mr-24': isEven(stepIdx),
              'ml-8 md:ml-24': !isEven(stepIdx),
            },
            {
              'md:flex-row': isEven(stepIdx) && !data.alternate_image_position,
              'md:flex-row-reverse':
                !isEven(stepIdx) && data.alternate_image_position,
            },
            'relative p-6 md:flex md:gap-8 ring-primary/50 ring-1 rounded-panel',
          ]"
        >
          <div
            v-if="step.image"
            class="shrink-0 dark:bg-white dark:brightness-90 rounded-panel"
          >
            <NuxtImg
              v-if="step.image"
              class="object-cover w-full h-32 rounded-card md:w-48 md:h-full"
              :src="safeRelationId(step.image) as string"
              :alt="safeRelation(step.image)?.description ?? ''"
            />
          </div>

          <div class="w-full mt-4 text-left md:mt-0">
            <TypographyTitle v-if="data.show_step_numbers"
              >Step {{ stepIdx + 1 }}</TypographyTitle
            >
            <TypographyHeadline
              v-if="step.title"
              :content="step.title"
              size="sm"
            />

            <TypographyProse
              v-if="step.content"
              :content="step.content"
              class="mt-4"
            />
            <BlocksButtonGroup
              v-if="step.button_group"
              :data="step.button_group as BlockButtonGroup"
              class="mt-4"
            />
          </div>
        </motion.div>
        <svg
          v-if="stepIdx !== steps.length - 1"
          class="h-16 m-0 mx-auto stroke-current text-primary md:h-20 steps-animation"
          viewBox="0 0 60 200"
        >
          <line
            class="path"
            x1="15"
            x2="15"
            y1="0"
            y2="200"
            stroke-width="8"
            stroke-linecap="square"
          />
        </svg>
      </template>
    </div>
  </BlockContainer>
</template>

<style>
.steps-animation .path {
  stroke-dasharray: 1, 30;
  -webkit-animation: dash 5s linear both infinite;
  animation: dash 5s linear both infinite;
}

@keyframes dash {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: -15rem;
  }
}
</style>
