<template>
  <div id="app" class="app">
    <div class="app-nav">
      <nav-bar />
    </div>
    <swiper-container :loop="loop">
      <swiper-slide v-for=" view in views">
        <div class="app-body">
          <div>
            <component :is="view" />
          </div>
          
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup lang="ts">
// import {RouterView} from 'vue-router'
import { NavBar } from './components';
// import { SwiperContainer, SwiperSlide } from 'swiper'
import Home from './views/Home.vue';
import About from './views/About.vue';

const views = [Home, About];
const loop = true;

</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content:center;
  align-items:center;

  &-nav {
    padding: 2rem;
  }

  &-body {
    width: 100%;
    justify-content:center;align-items:center;
    // justify-content: center;
    // align-self: center;
    // align-items: center;
  }
}
</style>
