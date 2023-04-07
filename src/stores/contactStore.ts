import { defineStore } from "pinia";
import { ref } from "vue";

const useContactStore = defineStore('contact', () => {
  const submittedEmail = ref('');
  const resumeRequested = ref(false);
  const loading = ref(false);

  function requestResume(email: string) {
    submittedEmail.value = email;
    resumeRequested.value = true;

    setTimeout(() => { 
      loading.value = true; 
    }, 2000);
  }

  return { submittedEmail, resumeRequested, loading, requestResume };
});

export default useContactStore;