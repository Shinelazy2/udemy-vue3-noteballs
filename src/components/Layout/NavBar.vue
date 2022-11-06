<template>
<nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop">
      <div class="navbar-brand">
      <a class="navbar-item is-size-4 is-family-monospace">
          NotesBalls
      </a>

      <a
        role="button"
        class="navbar-burger"
        @click.prevent="showMobileNav = !showMobileNav"
        :class="{'is-active' : showMobileNav}"
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
        :class="{ 'is-active':showMobileNav }"
        ref="navbarMenuRef"
        >

        <div
        class="navbar-end">
          <div class="navbar-item">
            <router-link
              @click="showMobileNav = false"
              class="nabar-item"
              active-class="is-active"
              to="/">
              Notes
              </router-link>
          </div>
          <div class="navbar-item">
            <router-link
              @click="showMobileNav = false"
              class="nabar-item"
              active-class="is-active"
              to="/stats">
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
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
/**
 * mobile nav
 */
const showMobileNav = ref(false)

const navbarMenuRef = ref()
const navBarBurgerRef = ref()
onClickOutside(navbarMenuRef, (event) => {
  showMobileNav.value = false
})
onClickOutside(navBarBurgerRef, (event) => {
  showMobileNav.value = false
}, {
  ignore: [navBarBurgerRef]
})

</script>

<style>
@media(max-width: 700) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}

</style>