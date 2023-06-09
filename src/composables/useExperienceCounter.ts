import { onMounted, onUnmounted, ref, watch } from "vue";
import { Counts, UseExperienceCounterOptions } from "./types";

export default function useExperienceCounter(options?: UseExperienceCounterOptions) {
  const tick = ref(0);
  const experience = ref('');

  onMounted(() => {
    setInterval(() => {
      tick.value++;
    }, 1000);
  });
  
  onUnmounted(() => {
    clearInterval(tick.value);
  });

  const format = (count: Counts) => {
    let value = '';

    if (options) {
      for (var key in options) {
        if (count.hasOwnProperty(key)) {
          console.log(key);
          value += `${count[key as keyof Counts]} ${key}, `;
        }
      }
    } else {
      value = `${count.years} years, ${count.months} months, ${count.days} days, ${count.hours} hours, ${count.minutes} minutes, ${count.seconds} seconds`;
    }

    if (value.endsWith(', ')) {
      value = value.substring(0, value.length - 2);
    }

    return value;
  };

  watch(tick, () => {
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

    experience.value = format({ years, months, days, hours, minutes, seconds });
  });

  return experience;
}