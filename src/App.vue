<template>
  <div id="app">
    <PrimaryLayout>
      <template #nav>
        <Navbar />
      </template>
      <template #body>
        <router-view />
      </template>
    </PrimaryLayout>
  </div>
</template>

<script lang="ts">
import {RouterView} from 'vue-router'
import Navbar from './components/nav-bar.vue'
import PrimaryLayout from './components/primary-layout.vue'

export default {
  name: 'App',
  components: {
    RouterView,
    Navbar,
    PrimaryLayout
  }
}

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
