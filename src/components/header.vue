<template>
  <header>
    <h1>{{ currentRoute }}</h1>
  </header>
</template>
<script setup lang="ts">
import { currentRoute } from '@/main'
</script>
<style lang="scss" scoped>
header {
  width: 100%;
  padding: 3rem 0 2.5rem 0;

  .bg {
    position: absolute;
    height: 80vh;
    width: 100%;
    left: 0;
    top: 0;
  }

  h1 {
    // position: relative;
    margin: 50px;
    font-size: 5rem;
    text-align: center;
    max-width: 100%;
    overflow-wrap: break-word;
  }
}

@media screen and (max-width: 600px) {
  header {
    h1 {
      font-size: 3rem;
    }
  }
}

header h1 {
  color: black;
}
</style>