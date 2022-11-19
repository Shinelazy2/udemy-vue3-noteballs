<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="cloumns is-mobile has-text-grey-light mt-2">
          <small class="column"> {{ dateFormat }}</small>
          <small class="column has-text-right"> {{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Save</a>
      <RouterLink :to="`/edit/${note.id}`" href="#" class="card-footer-item"
        >Edit</RouterLink
      >
      <a
        @click.prevent="modals.deleteNote = true"
        href="#"
        class="card-footer-item"
        >Delete</a
      >
    </footer>
    <modal-delete-note
      v-model="modals.deleteNote"
      v-if="modals.deleteNote"
      :note-id="note.id"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useDateFormat } from "@vueuse/core";
import { computed, reactive } from "vue";
import ModalDeleteNote from "./ModalDeleteNote.vue";
import { useStoreNotes } from "@/stores/storeNotes";

const store = useStoreNotes();

/**
 * date formatting
 */
const dateFormat = computed(() => {
  let date = new Date(parseInt(props.note.date));
  let formatDate = useDateFormat(date, "YYYY-MM-DD @ HH:mm");
  console.log(formatDate.value);
  return formatDate.value;
});

const props = defineProps({
  note: Object,
});

// const emit = defineEmits(['emit-delete'])

const characterLength = computed(() => {
  let length = props.note.content.length;
  let description = length > 1 ? "charchraters" : "charcheter";
  return `${length} ${description}`;
});

/**
 * modals
 */

const modals = reactive({
  deleteNote: false,
  editNote: false,
});
</script>
