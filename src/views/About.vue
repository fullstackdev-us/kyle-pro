<template>
  <div class="about">
    <div class="center-column">
      <div class="avatar">
        <div class="w-34 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="https://placekitten.com/200/200" alt="Kyle Dunbar" />
        </div>
      </div>
      <h1 class="text-4xl font-bold mt-3 mb-2">Kyle Dunbar</h1>
      <div class="about-summary">
        <p>{{ summary }}</p>
      </div>
      <button class="btn btn-primary mt-4">Request Resume</button>
      <!-- <form v-if="showRequestForm" @submit.prevent="requestResume">
        <label>Your Email Address:</label>
        <input type="email" v-model="requestEmailAddress">
        <button type="submit" :disabled="!requestEmailAddress">Submit</button>
      </form> -->
    </div>
  </div>
</template>

<script setup lang="ts">
  // Scaffolded with GPT-4
  const summary = 'Kyle Dunbar is a professional full stack developer with expertise in front-end and back-end development. He has designed, coded and tested many websites, Web applications, and mobile applications. Kyle\'s specialty is his ability to quickly adjust to the changing needs of the ever-evolving software industry and develop innovative solutions to complex problems. His passion for software engineering led him to constantly learn new technologies which allows him to stay ahead of the competition. He strives to provide clients with high-quality work, while also keeping up with the latest trends and technologies.';
</script>

<style lang="scss">
  .about {
    display: flex;
    justify-content: center;
    border-radius: 0.5rem;
    background-color: lightgrey;
    color: black;
    transition: background-color 0.3s ease;
    min-width: 32vw;
    padding: 1rem;

    &-summary {
      min-width: 350px;
      max-width: 500px;
      text-indent: 3rem;
    }
  }

  @media (prefers-color-scheme: dark) {
    .about {
        background-color: #222;
        color: #FFFFFF;
    }
  }

  .center-column {
    width: 100%;
    text-align: center;
  }
</style>