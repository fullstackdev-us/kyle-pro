<template>
  <div class="container">
    <div class="center-column">
      <img src="https://placekitten.com/200/200" alt="Kyle Dunbar" class="circular-cropped-image"/>
      <p>Kyle Dunbar is a professional full stack developer with expertise in front-end and back-end development. 
        He has designed, coded and tested many websites, Web applications, and mobile applications. 
        Kyle's specialty is his ability to quickly adjust to the changing needs of the ever-evolving software industry and develop innovative solutions to complex problems. 
        His passion for software engineering led him to constantly learn new technologies which allows him to stay ahead of the competition. 
        He strives to provide clients with high-quality work, while also keeping up with the latest trends and technologies.</p>
      <div>Experience: {{ experience }}</div>
    </div>
  </div>
</template>

<script lang="ts">

import { computed, onMounted, onUnmounted, ref } from 'vue';

export default {
    setup() {
      const tick = ref(0);
      
      const experience = computed(() => {
        const thisIsForUpdates = tick.value;

        const startDate = new Date(2018, 9, 1);

        const diffMs = (new Date()).valueOf() - startDate.valueOf();
    
        const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));
        const remainingMs = diffMs % (1000 * 60 * 60 * 24 * 365);
    
        const months = Math.floor(remainingMs / (1000 * 60 * 60 * 24 * 30));
        const remainingMs2 = remainingMs % (1000 * 60 * 60 * 24 * 30);
        const days = Math.floor(remainingMs2 / (1000 * 60 * 60 * 24));
        const remainingMs3 = remainingMs2 % (1000 * 60 * 60 * 24);
    
        const hours = Math.floor(remainingMs3 / (1000 * 60 * 60));
        const remainingMs4 = remainingMs3 % (1000 * 60 * 60);
    
        const minutes = Math.floor(remainingMs4 / (1000 * 60));
        const remainingMs5 = remainingMs4 % (1000 * 60);
    
        const seconds = Math.floor(remainingMs5 / 1000);
    
        return `${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
      });
      
      onMounted(() => {
        setInterval(() => {
          tick.value++;
        }, 1000);
      });
      
      onUnmounted(() => {
        clearInterval(tick.value);
      });
      
      return {
        tick,
        experience
      }
    }
  }
</script>

<style>
  .container {
    display: flex;
    justify-content: center;
  }

  .center-column {
    width: 100%;
    text-align: center;
  }

  .circular-cropped-image {
    border-radius: 50%;
    border: 5px solid #000;
  }
</style>