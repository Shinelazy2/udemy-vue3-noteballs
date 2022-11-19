<template>
  <nav-bar />
  <div class="container is-max-desktop px-2">
    <router-view></router-view>
  </div>
</template>

<script setup>
/**
 * imports
 */
import NavBar from "@/components/Layout/NavBar.vue";
import { useStoreAuth } from "@/stores/storeAuth";
import { onMounted } from "vue";

/**
 * store
 */
const store = useStoreAuth();
/**
 * mouted
 */
onMounted(() => {
  store.init();
});
</script>

<style>
@import "bulma/css/bulma.min.css";
</style>
