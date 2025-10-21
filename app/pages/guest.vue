<template>
  <block-container>
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis, ipsam
      repellat. Dolor praesentium expedita totam quibusdam fugiat accusamus
      repellat sunt. Similique quidem quam quas cupiditate quos consequuntur?
      Accusantium, odio quos?
    </div></block-container
  >
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["guest"],
  auth: false,

  layout: "auth",
});
</script>

<style></style>
