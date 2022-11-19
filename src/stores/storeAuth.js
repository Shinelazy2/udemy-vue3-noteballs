import { defineStore } from "pinia";
import { auth } from "@/js/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useStoreNotes } from "./storeNotes";

export const useStoreAuth = defineStore("storeAuth", {
  state: () => ({
    user: {},
  }),
  actions: {
    init() {
      const store = useStoreNotes();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          this.router.push("/");
          console.log("users : ", this.user);
          store.init();
          // ...
        } else {
          this.user = {};
          this.router.replace("/auth");
          store.clearNotes();
        }
      });
    },
    registeruser(credentials) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("user : ", user);
          // ...
        })
        .catch((error) => {
          console.log("error message : ", error);
        });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredentials) => {
          // Signed in
          const user = userCredentials.user;
          console.log("user : ", user);
          // ...
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          console.log("User singout : ");
        })
        .catch((error) => {
          // An error happened.
          console.log("error : ", error);
        });
    },
  },
  getters: {},
});
