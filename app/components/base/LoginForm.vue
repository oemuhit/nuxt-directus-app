<template>
  <!--   v-auto-animate
 -->
  <div>
    <Alert v-if="error" variant="destructive" class="mb-4">
      <AlertTitle class="flex flex-row items-center gap-2">
        <Icon name="material-symbols:warning-rounded" class="w-4 h-4" />
        Oops! Something went wrong.</AlertTitle
      >
      <AlertDescription>
        {{ error }}
      </AlertDescription>
    </Alert>

    <!--     {{ credentials }}
 -->
    <!-- v-model="credentials.email" -->
    <form class="w-2/3 space-y-6" @submit.prevent="onSubmit">
      <FormField
        v-slot="{ componentField }"
        name="email"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem>
          <FormLabel>Work Email</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="ashley@example.com"
              v-bind="componentField"
            />
          </FormControl>
          <FormDescription> This is your work email. </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <!--       <FormField
        v-slot="{ componentField }"
        name="password"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              :type="showPassword ? 'text' : 'password'"
              v-bind="componentField"
            >
              <Icon
                name="material-symbols:visibility"
                v-if="showPassword"
                @click="showPassword = !showPassword"
              />
              <Icon
                name="material-symbols:visibility-off"
                v-else
                @click="showPassword = !showPassword"
              />
            </Input>
          </FormControl>
          <FormDescription> This is your password. </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField> -->

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <!-- relative kapsayıcı -->
            <div class="relative">
              <Input
                v-bind="componentField"
                :type="showPassword ? 'text' : 'password'"
                class="pr-10"
              />

              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                @click="showPassword = !showPassword"
                tabindex="-1"
              >
                <Icon
                  v-if="showPassword"
                  name="material-symbols:visibility"
                  class="h-5 w-5"
                />
                <Icon
                  v-else
                  name="material-symbols:visibility-off"
                  class="h-5 w-5"
                />
              </button>
            </div>
          </FormControl>

          <FormDescription>This is your password.</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <!--       {{ meta }}
 -->
      <Button type="submit" :disabled="!meta.valid" size="lg" block>
        <Icon class="animate-spin" v-if="loading" name="lucide:loader-circle" />
        Sign In

        <icon name="material-symbols:arrow-forward" />
      </Button>
    </form>
    <!-- 	<UButton
				type="submit"
				:loading="loading"
				:disabled="!credentials.email"
				size="lg"
				label="Sign In"
				trailing-icon="material-symbols:arrow-forward"
				block
			/> 

      <Button type="submit" :disabled="!credentials.email" size="lg" block>
        <icon class="animate-spin" v-if="loading" name="lucide:loader-circle" />
        Sign In

        <icon name="material-symbols:arrow-forward" />
      </Button>
    </form> -->

    <!-- @TODO Remove password once magic link authentication is added -->
    <!-- <div class="mt-6">
			<VText>
				<UIcon name="material-symbols:info-rounded" class="mr-2" />
				<span>What about a password?</span>
			</VText>
			<VText text-color="light" size="xs" class="mt-2">
				Not needed 😃. Just enter your email above and we'll send you a magic link to login to your dashboard.
			</VText>
		</div> -->
  </div>
</template>

<script setup>
const { login } = useDirectusAuth();

const loading = ref(false);
const error = ref(null);

// You'll want to remove these preset credentials before you deploy your site
/* const credentials = ref({
  email: "ashley@example.com",
  password: "password",
});
 */
const showPassword = ref(false);

async function attemptLogin() {
  const { email, password } = unref(credentials);
  loading.value = true;
  error.value = null;

  try {
    // Be careful when using the login function because you have to pass the email and password as separate arguments instead of an object.

    await login(email, password);
  } catch (err) {
    error.value = err.message;
  }

  loading.value = false;
}
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { h } from "vue";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast/useToast";
import { FormField, Form } from "@/components/ui/form";

const formSchema = toTypedSchema(
  z.object({
    email: z.email(),
    password: z.string(),
  })
);
//: credentials,
const {
  meta,
  isFieldDirty,
  handleSubmit,
  values: credentials,
} = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  attemptLogin();
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
});
</script>
