<template>
  <div class="nav-bar">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.nav-bar {
  width: 100%;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
} 

.nav-bar a {
  color: #fff;
  /* padding: 0.5rem 1rem; */
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-bar a:hover {
  color: #444;
}

@media (prefers-color-scheme: dark) {
  .nav-bar a {
    color: rgb(203, 203, 203);
  }
}
@media (prefers-color-scheme: light) {
  .nav-bar a {
    color: #000;
  }
}

</style>