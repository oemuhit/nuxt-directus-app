<script setup lang="ts">
export interface SocialLink {
  service: string;
  url: string;
}

export interface NavigationItem {
  id: string;
  title: string;
  url?: string | null;
  page?: {
    permalink?: string | null;
  };
}

export interface FooterProps {
  navigation: {
    items: NavigationItem[];
  };
  globals: {
    logo?: string | null;
    logo_dark_mode?: string | null;
    description?: string | null;
    social_links?: SocialLink[];
  };
}

const props = defineProps<FooterProps>();
const runtimeConfig = useRuntimeConfig();

// Using template ref to expose the footer to the layout for visual editing
const footerRef = useTemplateRef("footerRef");
defineExpose({ footerRef });

const lightLogoUrl = computed(() =>
  props.globals.logo
    ? `${runtimeConfig.public.directusUrl}/assets/${props.globals.logo}`
    : "/images/logo.svg"
);

const darkLogoUrl = computed(() =>
  props.globals.logo_dark_mode
    ? `${runtimeConfig.public.directusUrl}/assets/${props.globals.logo_dark_mode}`
    : ""
);
</script>

<template>
  <!--   bg-gray dark:bg-[var(--background-variant-color)]
 -->
  <footer
    v-if="globals"
    ref="footerRef"
    class="dark relative py-16 bg-slate-950 dark:bg-slate-950"
  >
    <div class="absolute inset-0 opacity-10 grain-bg dark:opacity-5"></div>

    <Container class="text-foreground dark:text-white max-w-none">
      <div class="relative h-[25vw] w-full overflow-hidden max-w-6xl mx-auto">
        <VideoText
          font-size="30vw"
          font-family="Arial"
          src="https://bucket.sociarin.com/anfen/anfen360.mp4"
        >
          αnfen
        </VideoText>
      </div>
      <div
        class="flex flex-col md:flex-row justify-between items-center gap-8 pt-0 "
      >
        <div
          class="flex-1  flex flex-col md:block items-center justify-center w-sm max-w-sm md:w-md md:max-w-md"
        >
          <NuxtLink
            to="/"
            class="inline-block transition-opacity hover:opacity-70"
          >
            <img
              v-if="lightLogoUrl"
              :src="lightLogoUrl"
              alt="Logo"
              :class="['w-[120px] h-auto ', darkLogoUrl ? 'dark:hidden' : '']"
            />
            <img
              v-if="darkLogoUrl"
              :src="darkLogoUrl"
              alt="Logo (Dark Mode)"
              class="w-[120px] h-auto hidden dark:block"
            />
          </NuxtLink>

          <p v-if="props.globals.description" class="text-description mt-2 text-center md:text-left">
            {{ props.globals.description }}
          </p>
        </div>
        <!-- Social Links -->
        <div
          v-if="props.globals.social_links?.length"
          class="mt-4 flex space-x-4 flex-1 justify-center"
        >
          <a
            v-for="social in props.globals.social_links"
            :key="social.service"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="size-16 rounded bg-transparent inline-flex items-center justify-center transition-colors"
          >
            <img
              :src="`/icons/social/${social.service}.svg`"
              :alt="`${social.service} icon`"
              class="size-12 dark:invert"
              style="
                filter: invert(40%) sepia(85%) saturate(617%) hue-rotate(0deg)
                  brightness(125%) contrast(105%);
              "
            />
          </a>
        </div>
        <div
          class=" flex flex-col items-start md:items-end flex-1 w-sm max-w-sm md:w-md md:max-w-md "
        >
          <nav
            v-if="props.navigation.items?.length"
            class="w-full md:w-auto text-left"
          >
            <ul class="space-y-4">
              <li v-for="item in props.navigation.items" :key="item.id">
                <NuxtLink
                  v-if="item.page?.permalink"
                  :to="item.page.permalink"
                  class="text-nav font-medium hover:underline"
                >
                  {{ item.title }}
                </NuxtLink>
                <a
                  v-else
                  :href="item.url || '#'"
                  class="text-nav font-medium hover:underline"
                >
                  {{ item.title }}
                </a>
              </li>
            </ul>
            <ThemeToggle class="dark:text-white mt-4" />
          </nav>
          <!--     <a href="https://maps.app.goo.gl/bH4MuJDsTXEoP8eeA" target="_blank">
            <img
              class="border-1 border-gray-300 rounded-xl w-full object-contain outline outline-2 outline-gray-300 outline-offset-[-12px]"
              src="https://bucket.sociarin.com/anfen/anfen-map.png"
              alt="Anfen"
            />
          </a> -->
          <div class="text-lg text-white pt-2 flex flex-col gap-3 px-4">
            <div class="">
              <Icon name="heroicons:map-pin" class="w-4 h-4" /> Mustafa Kemal
              Mahallesi Dumlupınar Bulvarı,<br></br> Tepe Prime A Blok D:No:266 D.No:18,
              06510 Çankaya/Ankara
            </div>
            <div class="flex flex-col gap-2 text-2xl">
              <div class="flex items-center  gap-3">
                <Icon name="heroicons:phone" class="w-6 h-6" /> <div class="py-1"> 0532 172 90 42</div>
              </div>
              <div class="flex items-center  gap-3">
                <Icon name="heroicons:envelope" class="w-6 h-6" />
                <div class="py-1">info@anfen.com.tr</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </footer>
</template>

<style scoped>
.font-custom {
  font-family: "Didact Gothic";
}
</style>
