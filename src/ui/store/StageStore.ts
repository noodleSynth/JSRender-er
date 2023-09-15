import { defineStore } from 'pinia'
import { IStageManager, StageManager } from '../../core/StageManager'
import { Vec2 } from '../../core/types/vec'

interface StageStore {
  _stageManager: IStageManager
}

export const useStageStore = defineStore('Scene Store', {
  state: (): StageStore => ({
    _stageManager: StageManager,
  }),
  getters: {
    aspectRatio: ({ _stageManager }) => {
      return _stageManager.aspectRatio.value
    },
    playbackRate: ({ _stageManager }) => _stageManager.rate,
    sceneTime: ({ _stageManager }) => _stageManager.sceneTime
  },
  actions: {
    setAspectRatio(ar: number) {
      this._stageManager.aspectRatio.value = ar
    },
    setPlaybackRate(nr: number) {
      this._stageManager.rate = nr
    },
    setSceneTime(nr: number) {
      this._stageManager.sceneTime = nr
    }
  }
})