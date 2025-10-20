<script setup lang="ts">
import { Menu, ChevronDown } from "lucide-vue-next";

interface NavigationItem {
  id: string;
  title: string;
  url?: string;
  page?: { permalink: string };
  children?: NavigationItem[];
  icon?: string;
  label?: string;
}

// Using template ref to expose the navigation bar to the layout for visual editing
const navigationRef = useTemplateRef("navigationRef");
defineExpose({ navigationRef });

interface Navigation {
  items: NavigationItem[];
}

interface Globals {
  logo?: string;
  logo_dark_mode?: string;
}

const props = defineProps<{
  navigation: Navigation;
  globals: Globals;
}>();

const menuOpen = ref(false);
const runtimeConfig = useRuntimeConfig();
const { setAttr } = useVisualEditing();

const lightLogoUrl = computed(() =>
  props.globals?.logo
    ? `${runtimeConfig.public.directusUrl}/assets/${props.globals.logo}`
    : "/images/logo.svg"
);

const darkLogoUrl = computed(() =>
  props.globals?.logo_dark_mode
    ? `${runtimeConfig.public.directusUrl}/assets/${props.globals.logo_dark_mode}`
    : ""
);

const handleLinkClick = () => {
  menuOpen.value = false;
};
</script>

<template>
  <!-- hero 
 
fixed sticky

bg-background 

-->
  <header
    ref="navigationRef"
    class="sticky md:fixed top-0 z-50 w-full text-foreground"
  >
    <Container class="flex items-center justify-between p-4">
      <NuxtLink to="/" class="flex-shrink-0">
        <Logo />

        <img
          :src="lightLogoUrl"
          alt="Logo"
          class="w-[120px] h-auto dark:hidden"
          width="150"
          height="100"
        />
        <img
          v-if="darkLogoUrl"
          :src="darkLogoUrl"
          alt="Logo (Dark Mode)"
          class="w-[120px] h-auto hidden dark:block"
          width="150"
          height="100"
        />
      </NuxtLink>

      <nav class="flex items-center gap-4">
        <SearchModel />
        <NavigationMenu
          class="hidden md:flex"
          :data-directus="
            setAttr({
              collection: 'navigation',
              item: props.navigation.id,
              fields: ['items'],
              mode: 'modal',
            })
          "
        >
          <NavigationMenuList class="flex gap-6">
            <NavigationMenuItem
              v-for="section in props.navigation.items"
              :key="section.id"
            >
              <template v-if="false && section.children?.length">
                <NavigationMenuTrigger
                  class="focus:outline-none font-heading !text-nav hover:bg-background hover:text-accent"
                >
                  {{ section.title }}
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  class="min-w-[200px] rounded-md bg-background p-4 shadow-md"
                >
                  <ul class="min-h-[100px] flex flex-col gap-2">
                    <li v-for="child in section.children" :key="child.id">
                      <NavigationMenuLink as-child>
                        <NuxtLink
                          :to="getNavItemUrl(child)"
                          class="font-heading text-nav"
                        >
                          {{ child.title }}
                        </NuxtLink>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </template>

              <Popover v-if="section.children?.length">
                <!-- === Trigger Button === -->
                <PopoverTrigger as-child>
                  <NuxtLink
                    class="menu-link font-heading text-nav p-2 cursor-pointer"
                  >
                    {{ section.title }}
                    <Icon
                      name="heroicons:chevron-down"
                      class="ml-1 w-5 h-5 text-gray-400"
                    />
                  </NuxtLink>
                </PopoverTrigger>

                <!-- === Dropdown Content === -->
                <PopoverContent
                  class="z-50 mt-2 w-screen max-w-md bg-gray-800 shadow-lg rounded-2xl border border-gray-700 p-4 animate-in fade-in slide-in-from-top-2"
                  align="start"
                >
                  <div class="grid gap-2">
                    <NuxtLink
                      v-for="childItem in section.children"
                      :key="childItem.id"
                      :to="getNavItemUrl(childItem)"
                      class="flex items-start gap-4 p-4 rounded-xl transition duration-150 hover:bg-gray-900 group"
                    >
                      <div
                        class="flex items-center justify-center flex-none w-11 h-11 p-2 border border-primary rounded-lg"
                      >
                        <Icon
                          v-if="childItem.icon"
                          :name="convertIconName(childItem.icon)"
                          class="w-8 h-8 text-primary"
                        />
                      </div>

                      <div class="flex flex-col">
                        <p class="font-medium text-white font-display">
                          {{ childItem.title }}
                        </p>
                        <p
                          v-if="childItem.label"
                          class="mt-1 text-sm text-gray-400 leading-tight"
                        >
                          {{ childItem.label }}
                        </p>
                      </div>
                    </NuxtLink>
                  </div>
                </PopoverContent>
              </Popover>
              <NavigationMenuLink v-else as-child>
                <NuxtLink
                  :to="section.page?.permalink || section.url || '#'"
                  class="menu-link font-heading text-nav p-2"
                >
                  {{ section.title }}
                </NuxtLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <MobileMenu
          :is-open="menuOpen"
          v-if="props.navigation"
          :navigation="props.navigation"
        />

        <!-- Mobile Menu -->

        <Button
          @click="menuOpen = !menuOpen"
          variant="link"
          size="icon"
          aria-label="Open menu"
          class="md:hidden text-black dark:text-white dark:hover:text-accent cursor-pointer"
        >
          <Icon name="heroicons:bars-3" class="w-6 h-6" />
        </Button>

        <ThemeToggle class="cursor-pointer" />
      </nav>
    </Container>

    <!--TODO: Add a background color to the navigation bar when the menu is open-->
    <div
      class="-z-10 absolute top-0 left-0 w-full h-full _bg-black _opacity-80  bg-white opacity-100 dark:opacity-100 dark:bg-black"
    ></div>
  </header>
</template>

<style scoped>
@reference "@/assets/tailwind.css";
/* Menu Link Component */
.menu-link {
  @apply text-white bg-accent    hover:bg-accent/50 transition duration-150 font-medium hover:text-white py-2 px-3 inline-flex items-center;

  outline: none;
  border-radius: var(--radius-md);
}
</style>
