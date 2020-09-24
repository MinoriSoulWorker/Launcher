<template>
  <section class="download-view">
    <div class="box">
      <div class="percent">
        <svg>
          <circle cx="70" cy="70" r="70" />
          <circle cx="70" cy="70" r="70" :style="{ strokeDashoffset: radius() }" />
        </svg>
        <div class="number">{{ percent() }}%</div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject, provide, ref } from "vue";
import { promises as fs, constants } from "fs";
import { dirname, join, basename } from "path";
import { FileHandle } from "fs/promises";
import { apiGetFiles } from "@/api";
import { remote } from "electron";

export type GameFilePart = {
  url: string;
  size: number;
  downloaded: number;
};

export type GameFile = {
  name: string;
  size: number;
  downloaded: number;
  hash: string;
  parts: GameFilePart[];
};

export type GameFiles = {
  count: number;
  downloaded: number;
  files: GameFile[];
};

class Updater {
  public readonly files = ref<GameFiles>({ count: 0, downloaded: 0, files: [] });

  private readonly SIZE_LIMIT = 8000000;
  private _rootDir = join(dirname(remote.app.getPath("exe")), "client");

  async ensureDirExists(dir: string) {
    try {
      await fs.access(dir, constants.R_OK | constants.W_OK);
    } catch (e) {
      await fs.mkdir(dir);
    }
  }

  async run() {
    {
      await this.ensureDirExists(this._rootDir);
      const response = await apiGetFiles();

      this.files.value.count = response.count;
      this.files.value.files = response.files.map((file) => ({
        name: file.name,
        size: file.size,
        downloaded: 0,
        hash: file.hash,
        parts: file.parts.map((part) => ({
          url: part.url,
          size: part.size,
          downloaded: 0,
        })),
      }));
    }

    await Promise.all(this.files.value.files.map((file) => this.processFile(file)));
  }

  private async *streamAsyncIterator(stream: ReadableStream<Uint8Array>) {
    const reader = stream.getReader();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          return;
        }
        yield value!;
      }
    } finally {
      reader.releaseLock();
    }
  }

  private async processPart(stream: FileHandle, index: number, part: GameFilePart) {
    const response = await fetch(part.url, { mode: "no-cors" });
    const reader = response.body!;

    for await (const data of this.streamAsyncIterator(reader)) {
      // console.log(`stream: ${index} : ${basename(part.url)} : ${data.length}`);

      let bytesToWrite = data.length;
      do {
        bytesToWrite -= (await stream.write(data, data.byteOffset, bytesToWrite, this.SIZE_LIMIT * index + part.downloaded)).bytesWritten;
        part.downloaded += data.length;
      } while (bytesToWrite > 0);
    }

    ++this.files.value.downloaded;
  }

  private async processFile(file: GameFile) {
    const path = join(this._rootDir, file.name);
    await this.ensureDirExists(dirname(path));

    const stream = await fs.open(path, "w");
    await Promise.all(file.parts.map((part, index) => this.processPart(stream, index, part)));

    await stream.close();
  }
}

const instance = new Updater();

const filesSymbol = Symbol();

const provideUpdater = () => {
  provide(filesSymbol, instance.files);
};

const useUpdater = () => {
  const files = inject(filesSymbol) as GameFiles;

  instance.run();

  return { files };
};

export default defineComponent({
  methods: {
    percent() {
      if (this.files.count < 1) {
        return "- - -";
      }

      return Math.max(Math.floor((this.files.downloaded / this.files.count) * 100));
    },

    radius() {
      const r = 440;
      return r - (this.files.downloaded * r) / this.files.count;
    },
  },

  setup() {
    provideUpdater();

    return { ...useUpdater() };
  },
});
</script>

<style lang="scss" scoped>
.download-view {
  display: grid;
  grid: 1fr / 1fr;
  justify-items: center;
  align-items: center;
}

.box,
svg {
  position: relative;
}

.box,
svg,
circle {
  $size: 150px;
  width: $size;
  height: $size;
  filter: drop-shadow(0 0 6px rgb(255, 0, 98));
}

circle {
  fill: none;
  stroke-width: 10;
  stroke: black;
  transform: translate(5px, 5px);
  stroke-dasharray: 440;
  stroke-dashoffset: 440;
  stroke-linecap: round;

  &:nth-child(1) {
    stroke-dashoffset: 0;
    stroke: rgba(255, 0, 98, 0.103);
  }

  &:nth-child(2) {
    stroke-dashoffset: 440;
    stroke: rgb(255, 0, 98);
    // transition: var(--animation-very-short-time) var(--animation-function);
  }
}

.number {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30rem;
}
</style>
