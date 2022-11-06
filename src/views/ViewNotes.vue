<template>
  <div class="notes">
  <add-edit-note
    v-model="newNote"
    placeholder="Add a new Note"
    ref="addEditNote"
  >
    <template #buttons>
      <button
        @click="addNote"
        :disabled="!newNote"
        class="button is-link has-background-success"
      >
      Add new Note
      </button>
    </template>
  </add-edit-note>
    <Note
      v-for="note in store.notes"
      :key="note.id"
      :note="note"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Note from '@/components/Notes/Note.vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useStoreNotes } from '@/stores/storeNotes'
import { useWatchCharacters } from '@/use/useWatchCharacters'
/**
 * notes
 */

 const store = useStoreNotes()
 const newNote = ref('')
 const addEditNote = ref()

const addNote = () => {
  store.addNote(newNote.value)
  newNote.value = ''
  addEditNote.value.focusTextarea()
}

// const deleteNote = (id) => {
//   store.notes = store.notes.filter((note) => {
//     return note.id !== id
//   })
// }
useWatchCharacters(newNote, 100)



</script>