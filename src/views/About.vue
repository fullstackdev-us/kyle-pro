<template>
  <div class="about">
    <div class="about-top">
      <div class="avatar justify-center">
        <div class="max-w-[15rem] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img :src="avatarUrl" alt="Kyle Dunbar" />
        </div>
      </div>
      <h1 class="text-4xl font-bold mt-3 mb-2 text-center">Kyle Dunbar</h1>
      <div class="about-summary">
        <p>{{ summary }}</p>
      </div>
    </div>
    <RequestResumeForm class="about-bottom"/>
  </div>
</template>

<script setup lang="ts">
  import { RequestResumeForm } from '../components';
  import avatarUrl from '../assets/kyle.jpg';

  const summary = 'Kyle is a professional full stack developer with expertise in front-end and back-end development. He has designed, \
  coded and tested many Web and back-end applications. Kyle\'s specialty is his ability to quickly adjust to the changing \
  needs of the ever-evolving software industry and develop innovative solutions to complex problems. His passion for software engineering led him \
  to constantly learn new technologies which allows him to stay ahead of the competition. He strives to provide clients with high-quality work, \
  while also keeping up with the latest trends and technologies.';
</script>

<style lang="scss">
  .about {
    display: grid;
    justify-content: center;
    
    transition: background-color 0.3s ease;
    min-width: 32vw;
    max-width: 32vw;
    padding: 1rem;

    &-top {
      display: grid;
      justify-content: center;
      align-items: center;
      width: 100%;
      row-gap: 1rem;
      border-radius: 0.5rem;
      background-color: lightgrey;
      color: black;
      padding: 1rem;
    }

    &-bottom {
      margin-top: 1rem;
    }

    &-summary {
      text-indent: 3rem;
    }
  }

  @media (prefers-color-scheme: dark) {
    .about {
      &-top {
        display: grid;
        row-gap: 1rem;
        border-radius: 0.5rem;
        background-color: #222;
          color: #FFFFFF;
      }
    }
  }
</style>