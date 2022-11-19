<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop">
      <div class="navbar-brand">
        <a class="navbar-item is-size-4 is-family-monospace"> NotesBalls </a>

        <a
          role="button"
          class="navbar-burger"
          @click.prevent="showMobileNav = !showMobileNav"
          :class="{ 'is-active': showMobileNav }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          ref="navBarBurgerRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showMobileNav }"
        ref="navbarMenuRef"
      >
        <p>user : {{ store.user }}</p>
        <div class="navbar-start">
          <button
            v-if="store.user.id"
            @click="logout"
            class="button is-small is-info mt-3 ml-3"
          >
            Log Out {{ store.user.email }}
          </button>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <router-link
              @click="showMobileNav = false"
              class="nabar-item"
              active-class="is-active"
              to="/"
            >
              Notes
            </router-link>
          </div>
          <div class="navbar-item">
            <router-link
              @click="showMobileNav = false"
              class="nabar-item"
              active-class="is-active"
              to="/stats"
            >
              Stats
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
/**
 * imports
 */
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useStoreAuth } from "@/stores/storeAuth";

/**
 * mobile nav
 */
const showMobileNav = ref(false);
const store = useStoreAuth();

const navbarMenuRef = ref();
const navBarBurgerRef = ref();
onClickOutside(navbarMenuRef, (event) => {
  showMobileNav.value = false;
});
onClickOutside(
  navBarBurgerRef,
  (event) => {
    showMobileNav.value = false;
  },
  {
    ignore: [navBarBurgerRef],
  }
);

/**
 * logout
 */
const logout = () => {
  showMobileNav.value = false;
  store.logoutUser();
};
</script>

<style>
@media (max-width: 700) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
