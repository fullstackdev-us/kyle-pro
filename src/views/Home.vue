<template>
  <div class="home">
    <div class="business-card">
      <div class="business-card-left">
        <div class="name-circle">
          K
        </div>
      </div>
      <div class="business-card-right">
        <div class="text-2xl">{{ firstName }} {{ lastName }}</div>
        <ul>
          <li>{{ title }}</li>
          <li>Experience: {{ experience }}</li>
        </ul>
        <div class="business-card-right-socials">
          <a :href="githubUrl" target="_blank" rel="noopener noreferrer"><ph-github-logo :size="32" /></a>
          <a :href="linkedinUrl" target="_blank" rel="noopener noreferrer"><ph-linkedin-logo :size="32" /></a>
        </div>
      </div>
    </div>
    <button class="btn btn-primary" @click="showRequestForm = !showRequestForm">Request Resume</button>
    <!-- <form v-if="showRequestForm" @submit.prevent="requestResume">
      <label>Your Email Address:</label>
      <input type="email" v-model="requestEmailAddress">
      <button type="submit" :disabled="!requestEmailAddress">Submit</button>
    </form> -->
  </div>
</template>
 
<script setup lang="ts">
  // Scaffolded with GPT-4
  import { ref } from 'vue';
  import { useExperienceCounter } from '../composables';
  import { PhGithubLogo, PhLinkedinLogo } from '@phosphor-icons/vue';

  const emit = defineEmits(['resumeRequested']);

  const showRequestForm = ref(false);
  const requestEmailAddress = ref('');
  const firstName = 'Kyle';
  const lastName = 'Dunbar';
  const title = 'Full Stack Developer';
  const githubUrl = 'https://github.com/fullstackdev-us';
  const linkedinUrl = 'https://www.linkedin.com/in/dunbark';

  const requestResume = () => {
    emit('resumeRequested', requestEmailAddress.value);
  }

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

.name-circle {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: #000;
    color: #FFFFFF;
    font-size: 2rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}
</style>