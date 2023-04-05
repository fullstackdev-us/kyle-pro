<template>
  <div class="business-card">
    <h2>{{ firstName }} {{ lastName }}</h2>
    <ul>
      <li><a :href="githubUrl" target="_blank" rel="noopener noreferrer">Github</a></li>
      <li><a :href="linkedinUrl" target="_blank" rel="noopener noreferrer">Linkedin</a></li>
    </ul>
  </div>
  <button @click="showRequestForm = !showRequestForm">Request Resume</button>
    <form v-if="showRequestForm" @submit.prevent="requestResume">
      <label>Your Email Address:</label>
      <input type="email" v-model="requestEmailAddress">
      <button type="submit" :disabled="!requestEmailAddress">Submit</button>
    </form>
</template>
 
<script lang="ts">
// Scaffolded with GPT-4
import { ref, onMounted } from 'vue';

export default {
  name: 'BusinessCard',
  setup(props,context) {
    const showRequestForm = ref(false);
    const requestEmailAddress = ref('');
    const firstName = 'Kyle';
    const lastName = 'Dunbar';
    const githubUrl = 'https://github.com/fullstackdev-us';
    const linkedinUrl = 'https://www.linkedin.com/in/dunbark';

    const requestResume = () => {
      context.emit('resumeRequested', requestEmailAddress.value);
    }

    onMounted(() => {
      console.log('component mounted');
    });

    return {
      showRequestForm,
      requestEmailAddress,
      firstName,
      lastName,
      githubUrl,
      linkedinUrl,
      requestResume
    };
  }
};
</script>

<style scoped>
.business-card {
    padding: 0.5rem;
    border-radius: 1rem;
    background-color: lightgrey;
    color: black;
    transition: background-color 0.3s ease;
    min-width: 40vw;
}

@media (prefers-color-scheme: dark) {
  .business-card {
      background-color: #222;
      color: #FFFFFF;
  }
}
</style>