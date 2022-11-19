import { defineStore } from "pinia";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  addDoc,
} from "firebase/firestore";
import { db } from "@/js/firebase";
import { useStoreAuth } from "@/stores/storeAuth";

let notesCollectrionRef;
let notesCollectrionQuery;
let getNotesSnapshot = null;
export const useStoreNotes = defineStore("storeNotes", {
  state: () => ({
    notes: [],
    notesLoaded: false,
  }),
  actions: {
    init() {
      // initialize our database refs
      const storeAuth = useStoreAuth();

      notesCollectrionRef = collection(db, "users", storeAuth.user.id, "notes");
      notesCollectrionQuery = query(
        notesCollectrionRef,
        orderBy("date", "desc")
      );
      this.getNotes();
    },
    async getNotes() {
      this.notesLoaded = true;

      console.log(this.notesLoaded);
      getNotesSnapshot = onSnapshot(notesCollectrionQuery, (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date,
          };
          notes.push(note);
        });
        this.notes = notes;
        this.notesLoaded = false;
        this.notes = notes;
      });
    },
    clearNotes() {
      this.notes = [];
      if (getNotesSnapshot) getNotesSnapshot(); //
    },
    async addNote(newNote) {
      let currentDate = new Date().getTime(),
        date = currentDate.toString();
      await addDoc(notesCollectrionRef, {
        content: newNote,
        date,
      });
      // this.notes.unshift(note);
    },
    async deleteNote(id) {
      console.log(`id - ${id}`);
      await deleteDoc(doc(notesCollectrionRef, id));
    },
    async updateNote(id, content) {
      await updateDoc(doc(notesCollectrionRef, id), {
        content,
      });
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        console.log(id);
        console.log(state.notes);
        return state.notes.filter((note) => note.id === id)[0].content;
      };
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalCharactersCount: (state) => {
      let count = 0;
      state.notes.forEach((note) => {
        count += note.content.length;
      });
      return count;
    },
  },
});
