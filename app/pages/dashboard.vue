<template>
  <BlockContainer class="mt-16">
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>

      <pre>

{{ user }}
      </pre>
      <Button @click="logout">
        logout <Icon name="material-symbols:logout"></Icon
      ></Button>
    </div>
  </BlockContainer>
</template>
<script lang="ts" setup>
import BlockContainer from "~/components/BlockContainer.vue";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});

const { user, logout } = useDirectusAuth();
</script>
<style></style>
