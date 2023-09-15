import { Component } from 'vue'
import TimeInput from './TimeInput.vue'

export default <{
  [type: string]: Component
}>{
    time: TimeInput
  }