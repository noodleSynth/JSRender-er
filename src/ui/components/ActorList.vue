<template>
  <div class="panel">
    <div v-for="actor in actors" class="actor">
      <label class="actor__label">{{ actor.displayName }}</label>
      <div class="actor__attrs">
        <AttributeField :attribute="attr" v-for="attr in reactiveAttributes(actor)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { IActor } from '../../core/Actor';
import { useActors } from '../compose/Actor.compose';
import AttributeField from './AttributeField.vue';

const { actors } = useActors()

const reactiveAttributes = (actor: IActor) => {
  return Object.fromEntries(Object.entries(actor.attributes).map(([key, v]) => ([key, reactive(v)])))
}

</script>

<style lang="scss">
.actor {
  display: flex;
  flex-direction: column;

  &__label {
    font-size: large;
    text-decoration: underline;
  }

  &__attrs {
    display: flex;
    flex-direction: column;
  }
}
</style>