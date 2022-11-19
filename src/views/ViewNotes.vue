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
    <p>{{ store.notesLoaded }}</p>

    <progress
      v-if="store.notesLoaded"
      class="progress is-large is-info is-success"
      max="100"
    />
    <template v-else>
      <Note v-for="note in store.notes" :key="note.id" :note="note" />
    </template>

    <div
      v-if="!store.notes.length"
      class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
    >
      No notes here yet...
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Note from "@/components/Notes/Note.vue";
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import { useStoreNotes } from "@/stores/storeNotes";
import { useWatchCharacters } from "@/use/useWatchCharacters";
/**
 * notes
 */

const store = useStoreNotes();

const newNote = ref("");
const addEditNote = ref();

const addNote = () => {
  store.addNote(newNote.value);
  newNote.value = "";
  addEditNote.value.focusTextarea();
};

// const deleteNote = (id) => {
//   store.notes = store.notes.filter((note) => {
//     return note.id !== id
//   })
// }

/**
 * mouted
 */

useWatchCharacters(newNote, 100);
</script>
