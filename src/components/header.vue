<template>
  <header class="header">
    <MinimizeIcon class="icon" @click="minimize" />
    <CloseIcon class="icon" @click="close" />
  </header>
</template>


<script lang="ts">
import { remote } from "electron";
import { defineAsyncComponent, defineComponent } from "vue";

export default defineComponent({
  methods: {
    minimize() {
      const window = remote.getCurrentWindow();
      if (window.minimizable) {
        window.minimize();
      }
    },

    close() {
      const window = remote.getCurrentWindow();
      if (window.closable) {
        window.close();
      }
    },
  },

  components: {
    CloseIcon: defineAsyncComponent(() => import("@/components/icons/close.vue")),
    MinimizeIcon: defineAsyncComponent(() => import("@/components/icons/minimize.vue")),
  },
});
</script>

<style lang="scss" scoped>
.header {
  -webkit-app-region: drag;
  user-select: none;
  display: grid;
  grid-auto-flow: column;
  justify-content: end;
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px;
  backdrop-filter: blur(3px);
}

.icon {
  cursor: pointer;
  -webkit-app-region: no-drag;

  $size: 24px;
  width: $size;
  height: $size;

  fill: var(--header-link-bg-hover-color);
  transition: var(--animation-short-time) var(--animation-function);

  &:hover {
    fill: var(--font-color);
    transition: var(--animation-very-short-time) var(--animation-function);
  }
}
</style>
