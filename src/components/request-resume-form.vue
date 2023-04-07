<template>
  <div class="resume-form">
    <button class="btn btn-primary">Request Resume</button>
    <!-- <form v-if="showRequestForm" @submit.prevent="requestResume">
      <label>Your Email Address:</label>
      <input type="email" v-model="requestEmailAddress">
      <button type="submit" :disabled="!requestEmailAddress">Submit</button>
    </form> -->
  </div>
</template>

<style lang="scss">
.resume-form {
  display: grid;
  row-gap: 1rem;
}
</style>