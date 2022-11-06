import { defineStore } from "pinia";
export const useStoreNotes = defineStore('storeNotes', {
  state: () => ({
    notes: [
      {
        id: 'id1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec    iaculis mauris.'
      },
      {
        id: 'id2',
        content: 'This short note!.'
      }
    ]
  }),
  actions: {
    addNote(newNote) {
      let date = new Date().getTime(),
          id = date.toString()
      let note = {
        id,
        content: newNote,
      }
      this.notes.unshift(note)
    },
    deleteNote (id) {
      this.notes = this.notes.filter((note) => {
        return note.id !== id
      })
    },
    updateNote (id, content) {
      let index = this.notes.findIndex(note => {
        return note.id === id
      })
      this.notes[index].content = content
    }
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        console.log(id);
        return state.notes.filter( (note) => {
          return note.id === id
        })[0].content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCharactersCount: (state) => {
      let count = 0
      state.notes.forEach( (note) => {
        count += note.content.length
      })
      return count
    }
  }
})




