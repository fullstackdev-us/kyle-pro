<template>
  <div class="home">
    <div class="business-card">
      <div class="business-card-left">
        <div class="avatar">
          <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img :src="avatarUrl" alt="Kyle Dunbar Image" />
          </div>
        </div>
      </div>
      <div class="business-card-right">
        <div class="text-2xl">{{ firstName }} {{ lastName }}</div>
        <ul>
          <li>{{ title }}</li>
          <li><Transition name="slide-fade"><div v-show="experience != ''">Experience: {{ experience }}</div></Transition></li>
        </ul>
        <div class="business-card-right-socials">
          <a :href="githubUrl" target="_blank" rel="noopener noreferrer"><ph-github-logo :size="32" /></a>
          <a :href="linkedinUrl" target="_blank" rel="noopener noreferrer"><ph-linkedin-logo :size="32" /></a>
        </div>
      </div>
    </div>
    <RequestResumeForm />
  </div>
</template>
 
<script setup lang="ts">
  import { ref } from 'vue';
  import { useExperienceCounter } from '../composables';
  import { PhGithubLogo, PhLinkedinLogo } from '@phosphor-icons/vue';
  import { RequestResumeForm } from '../components';
  import avatarUrl from '../assets/kyle.jpg';

  const requestEmailAddress = ref('');
  const firstName = 'Kyle';
  const lastName = 'Dunbar';
  const title = 'Full Stack Developer';
  const githubUrl = 'https://github.com/fullstackdev-us';
  const linkedinUrl = 'https://www.linkedin.com/in/dunbark';

  const experience = useExperienceCounter({ years: true, months: true});
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  row-gap: 1rem;
}
.business-card {
    display: grid;
    grid-template-columns: auto 1fr;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 0.5rem;
    border-radius: 0.5rem;
    background-color: lightgrey;
    color: black;
    transition: background-color 0.3s ease;
    min-width: 32vw;

    &-left {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
    }

    &-right {
      display: grid;
      row-gap: 0.5rem;

      &-socials {
        display: flex;
      }
    }
}

@media (prefers-color-scheme: dark) {
  .business-card {
      background-color: #222;
      color: #FFFFFF;
  }
}
</style>