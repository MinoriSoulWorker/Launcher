<template>
  {{ count }}
  <aside class="update">
    <h1 class="detail">Detail</h1>
    <div class="files">
      <div class="file" v-for="[key, file] of files" :key="key">
        <div class="name" :class="{ active: isHaveDownlodablePart(file) }">
          {{ file.name }}
        </div>
        <div
          class="total-progress"
          :style="{
            background: `linear-gradient(90deg, rgba(0, 191, 255, 0.7) ${getTotalProgress(file)}%, transparent ${getTotalProgress(file)}%)`,
          }"
          v-if="isHaveDownlodablePart(file)"
        >
          {{ getTotalProgress(file) }}%
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    getTotalProgress(file: FileStatus) {
      return (file.parts.reduce((a, b) => a + b.percent, 0) / (file.parts.length * 100)) * 100;
    },
    isHaveDownlodablePart(file: FileStatus) {
      return file.parts.findIndex((p) => p.percent < 100) != -1;
      // return true;
    },
  },
  setup() {
    updateControllerProvide();
    updateControllerInject();

    return { ...useI18n(), ...updateControllerInject(), client };
  },
});
</script>

<style lang="scss" scoped>
.update {
  background-color: rgba(30, 32, 32, 0.7);
  backdrop-filter: blur(30px);
  padding: 20px;
  max-width: min-content;
}

.detail {
  font-size: 32rem;
}

.files {
  display: grid;
  gap: 20px;
  padding-top: 20px;
}

.name {
  white-space: nowrap;
  text-shadow: 0 0 4px rgb(0, 191, 255);
}

.active {
  text-shadow: 0 0 4px black, 0 0 10px black;
}

.total-progress {
  transition: 1s ease-out;
  text-shadow: 0 0 4px black, 0 0 10px black;
  text-align: center;
}
</style>
