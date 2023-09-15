import { computed } from "vue"
import { actorRegistry } from "../../core/Actor"

export const useActors = () => {

  const actors = computed(() => actorRegistry.actors)

  return {
    actors
  }
}