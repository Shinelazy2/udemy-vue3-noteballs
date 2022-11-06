<template>
  <div class="edit-note">
    <add-edit-note
    v-model="noteContent"
    ref="addEditNote"
    bgColor="link"
    placeholder="Edit Note"
    label="Edit Note"
  >
    <template #buttons>
      <button
        @click="$router.back()"
        class="button is-link is-light"
      >
      Cancel
      </button>

      <button
        @click="handleSaveClick"
        class="button is-link has-background-link"
        :disabled="!noteContent"
      >
        SaveNote
      </button>
    </template>
  </add-edit-note>
  </div>
</template>

<script setup>
  import AddEditNote from '../components/Notes/AddEditNote.vue';
  import { ref } from 'vue';
  import { useStoreNotes } from '@/stores/storeNotes'
  import { useRoute, useRouter } from 'vue-router'

  const noteContent = ref()

  const store = useStoreNotes()

  const route = useRoute()
  const router = useRouter()
  noteContent.value = store.getNoteContent(route.params.id)

  const handleSaveClick = () => {
    store.updateNote(route.params.id, noteContent.value)
    router.push('/')
  }
</script>