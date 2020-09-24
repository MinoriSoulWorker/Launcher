<template>
  <section class="home">
    <router-link class="play" :to="{ name: 'download' }"> PLAY? </router-link>
  </section>
</template>

<style lang="scss" scoped>
.home {
  display: grid;
  align-items: center;
  justify-items: center;
}

.play {
  text-decoration: unset;
  color: inherit;
  padding: 10px 30px;
  font-size: 20vh;
  cursor: pointer;

  $color: var(--header-font-color);

  transition: var(--animation-long-time) var(--animation-function);

  &:hover {
    // $color: rgba(255, 0, 98, 1);
    $colorOpacity: rgba(255, 0, 98, 0.4);
    // border-color: $colorOpacity;
    background-color: $colorOpacity;
    // box-shadow: 0 0 6px $color;

    transition: var(--animation-very-short-time) var(--animation-function);
  }
}
</style>
