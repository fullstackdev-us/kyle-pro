<template>
  <div class="navbar">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script lang="ts">
// Scaffolded with GPT-4
export default {
   name: 'Navbar',
}
</script>

<style>
.navbar {
  width: 100%;
  text-align: center;
} 

.navbar a {
  color: #fff;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.navbar a:hover {
  color: #444;
}

@media (prefers-color-scheme: dark) {
  .navbar a {
    color: rgb(203, 203, 203);
  }
}
@media (prefers-color-scheme: light) {
  .navbar a {
    color: #000;
  }
}

</style>