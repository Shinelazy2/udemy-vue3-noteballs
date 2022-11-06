<template>
<div class="modal is-active p-2">
  <div class="modal-background"></div>
  <div
    class="modal-card"
    ref="modalCardRef">
    <header class="modal-card-head">
      <p class="modal-card-title">Delete Note?</p>
      <button
        @click="$emit('update:modelValue', false)"
        class="delete"
        aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      Are you sure you want to delete this note?
    </section>
    <footer class="modal-card-foot is-justify-content-flex-end">
      <button 
        @click="$emit('update:modelValue', false)"
        class="button">Cancel</button>
      <button
        @click="store.deleteNote(props.noteId)"
        class="button is-danger">Delete</button>
    </footer>
  </div>
</div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import { onMounted, onUnmounted } from 'vue';
import { useStoreNotes } from '@/stores/StoreNotes'
import { ref } from 'vue';

const modalCardRef = ref()
const store = useStoreNotes()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  noteId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])
// onClickOutside(modalCardRef, emit('update:modelValue', false))

/**
 * keyboard control
 */

 const handlerKeyBoard = ( e ) => {
  if ( e.key === 'Escape') {
      emit('update:modelValue',false)
    }
 }

onMounted(() => {
  document.addEventListener('keyup', (e) => {
    return handlerKeyBoard(e)
  })
  console.log('mounted');

})

onUnmounted( () => {
  document.removeEventListener('keyup', (e) => {
    return handlerKeyBoard(e)
  })
  console.log('unmounted');
})

console.log(props.modelValue);
</script>

