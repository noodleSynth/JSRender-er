<template>
  <div class="panel vertical">
    <div class="panel horizontal">
      <Preview />

    </div>
    <div class="panel horizontal">

    </div>
  </div>
</template>

<script setup lang="ts">
import Preview from './Preview.vue';



</script>

<style lang="sass">
.panel
  background: rgba(255, 255, 255, 0.1)
  border: 1px white solid
  display: flex

  padding: .5rem
  &.center
    justify-content: center
    align-items: center
  &.vertical
    flex-basis: column
</style>