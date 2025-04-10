import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDateStore = defineStore('date', () => {
  const currentDate = ref(new Date()); // 날짜 상태

  // 날짜 변경 액션
  const changeDate = (direction) => {
    const newDate = new Date(currentDate.value);
    newDate.setDate(newDate.getDate() + direction); // 날짜 이동
    currentDate.value = newDate;
  };

  return {
    currentDate,
    changeDate,
  };
});
