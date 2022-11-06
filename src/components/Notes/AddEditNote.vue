<template>
<div
  class="card has-background-success dark p-4 mb-5"
  :class="`has-background-${bgColor}-dark`"
>
    <label
    v-if="label"
      class="label"
      has-text-white
    >
      Label
      Text</label>
      <div class="field">
        <label class="label">Message</label>
        <div class="control">
          <textarea
            v-model="modelValue"
            @input="$emit('update:modelValue', modelValue)"
            class="textarea"
            :placeholder="props.placeholder"
            maxlength="100"
            ref="textAreaRef"
            v-autofocus
            >
          </textarea>
            </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { vAutofocus } from '@/directives/vAutofocus'
  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    bgColor: {
      type: String,
      default: 'success'
    },
    placeholder: {
      type: String,
      default: 'Type Sometings'
    },
    label:{
      type:String
    }
  })

  const textAreaRef = ref()

  const focusTextarea = () => {
    console.log('focusTextarea');
    textAreaRef.value.focus()
  }

  /**
   * 부모에서 해당 함수를 클릭할 수 있도록 해준다 ???
   */
  defineExpose({
    focusTextarea
  })

  /**
   * directives
   */
 
</script>