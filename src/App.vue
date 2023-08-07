<script setup lang="ts">
import { onMounted } from 'vue'
import { Render } from './scene1/Render';

onMounted(() => {
  Render.start()
})

</script>

<template>
 <div id="RootFrame">
  <div id="TopPane">
    
    <canvas id="screen"></canvas>
  </div>
  <div id="BottomFrame">
    Vue things
  </div>
 </div>
</template>

<style>
body{
  clear: all;
}
</style>

<style lang="scss">
#RootFrame{
  border: 1px grey solid;
  display: flex;
  flex-direction: column;
}

#TopPane{
  border: 1px grey solid;
  display: flex;
  justify-content: stretch;
}

canvas{
  max-height: 600px;
}
</style>
