<template>
  <main>
    <HeaderComponent />
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

export default defineComponent({
  components: {
    HeaderComponent: defineAsyncComponent(() => import("@/components/header.vue")),
  },
});
</script>

<style lang="scss">
:root {
  --animation-very-short-time: 0.11s;
  --animation-short-time: 0.33s;
  --animation-middle-time: 0.77s;
  --animation-long-time: 1.33s;
  --animation-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}

@import "@/styles/reset.scss";
@import "@/styles/typography.scss";
@import "@/styles/themes/raratina.scss";

body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;

  color: var(--font-color);
  display: grid;
}

main {
  margin: 10px;
  $color: rgba(255, 0, 98, 0.548);
  // $color: rgba(0, 191, 255, 0.747);
  border: 1px solid $color;
  box-shadow: 0 0 6px $color;
  background: url("~@/assets/bg-haru.png") center center no-repeat;
  display: grid;
  grid: auto 1fr / 1fr;
}

// https://youtu.be/NPoYb4mbiOg?list=RDNPoYb4mbiOg
</style>
