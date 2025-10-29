<template>
  <BlockContainer class="mt-16">
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
      <Button @click="fetchUser" class="mt-4"> Fetch User </Button>

      <Button @click="navigateTo('/')" variant="outline"> # </Button>

      <div v-if="user" class="mt-4">
        <h2>User Information</h2>
        <p>
          <strong>Name:</strong> {{ user.first_name }}
          {{ user.last_name }}
        </p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
      </div>

      <div v-else class="mt-4">
        <p>Loading user information...</p>
      </div>
      <!-- 
      <pre class="mt-4 text-xs bg-gray-100 p-2 rounded"
        >{{ user }}
      </pre> -->

      <Button @click="logout" class="mt-4">
        logout <Icon name="material-symbols:logout"></Icon
      ></Button>
    </div>
  </BlockContainer>
</template>
<script lang="ts" setup>
import BlockContainer from "~/components/BlockContainer.vue";

definePageMeta({
  pageTypes: "public",
  layout: "auth",
  middleware: ["auth"],
});

const { user, logout, fetchUser } = useDirectusAuth();
</script>
<style></style>
