import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDateStore = defineStore('date', () => {
  const currentDate = ref(new Date());

  const changeDate = (direction) => {
    const newDate = new Date(currentDate.value);
    newDate.setDate(newDate.getDate() + direction);
    currentDate.value = newDate;
  };

  return {
    currentDate,
    changeDate,
  };
});
