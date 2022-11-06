<template>
    <div
      class="card mb-4"
    >
      <div class="card-content">
        <div class="content">
          {{ note.content }}
          <div class="has-text-right has-text-grey-light mt-2 ">
            <small> {{ characterLength }}</small>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Save</a>
        <RouterLink
          :to="`/edit/${ note.id }`"
          href="#"
          class="card-footer-item"
        >Edit</RouterLink>
        <a
          @click.prevent="modals.deleteNote = true"
          href="#"
          class="card-footer-item">Delete</a>
      </footer>
      <modal-delete-note 
        v-model="modals.deleteNote"
        v-if="modals.deleteNote"
        :note-id="note.id"
      />

</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed, reactive } from 'vue';
import ModalDeleteNote from './ModalDeleteNote.vue';
import { useStoreNotes } from '@/stores/storeNotes'

const store = useStoreNotes()

const props = defineProps({
  note: Object
})

// const emit = defineEmits(['emit-delete'])

const characterLength = computed(() => {
  let length = props.note.content.length
  let description = length > 1 ? 'charchraters' : 'charcheter'
  return `${length} ${description}`
})

/**
 * modals
 */

 const modals = reactive({
  deleteNote: false,
  editNote: false,
 })

</script>