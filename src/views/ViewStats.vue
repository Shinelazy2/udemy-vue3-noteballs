<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stats</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ store.totalNotesCount}}</td>
        </tr>
        <tr>
          <td>Number of Carater ( of all Notes)</td>
          <td>{{ store.totalCharactersCount}}</td>
        </tr>
      </tbody>
    </table>
    <input
      v-model="loveNoteBalls"
      class="input"
      type="text"
      placeholder="Do you love noteballs???"
      v-autofocus
    >
  </div>
</template>

<script setup>
import { useStoreNotes } from '@/stores/storeNotes'
import { vAutofocus } from '@/directives/vAutofocus'
import { useWatchCharacters } from '@/use/useWatchCharacters';
import { ref } from 'vue';

const store = useStoreNotes()

const loveNoteBalls = ref('')

useWatchCharacters(loveNoteBalls, 50)
</script>