import { defineStore } from "pinia";
import { reactive } from "vue";
export const useStoreNotes = defineStore('storeNotes', () => {
  let notes = reactive([
    {
      id: '1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec    iaculis mauris.'
    },
    {
      id: '2',
      content: 'This short note!.'
    }
  ])

  const addNote = (newNote) => {
    let date = new Date().getTime(),
        id = date.toString()
    let note = {
      id,
      content: newNote,
    }
    notes.unshift(note)
  }

  const deleteNote = (id) => {
    notes = notes.filter((note) => {
      return note.id !== id
    })

    console.log(notes);
  }


  return { notes, addNote, deleteNote }
}
)




