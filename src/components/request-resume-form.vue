<template>
  <div class="resume-form">
    <button v-if="!requesting" @click="requestResume" class="btn btn-primary">Request Resume</button>
    <div class="grid gap-3" v-else>
      <input  v-model="email" type="text" placeholder="Email Address" class="input input-bordered w-full" />
      <div class="grid grid-cols-2 gap-2">
        <button @click="submitEmail" class="btn btn-primary">Submit</button>
        <button @click="cancelRequestResume" class="btn btn-primary">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('')
const requesting = ref(false);

const requestResume = () => {
  requesting.value = true;
}

const cancelRequestResume = () => {
  requesting.value = false;
}

const submitEmail = () => {
  console.log(email.value)
  requesting.value = false;
}
</script>

<style lang="scss">
.resume-form {
  display: grid;
  row-gap: 1rem;
}
</style>