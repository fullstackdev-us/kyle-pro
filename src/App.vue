<template>
  <div id="app">
    <PrimaryLayout>
      <template #nav>
        <nav-bar />
      </template>
      <template #body>
        <router-view>
        </router-view>  
      </template>
    </PrimaryLayout>
  </div>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import { NavBar, PrimaryLayout } from './components';
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
