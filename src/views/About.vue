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

<script setup lang="ts">
  // Scaffolded with GPT-4
  import { useExperienceCounter } from '../composables';

  const experience = useExperienceCounter();
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