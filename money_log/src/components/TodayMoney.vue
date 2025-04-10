<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDateStore } from '@/stores/date';
import '../assets/modal.css';

const dateStore = useDateStore();

const formattedDate = computed(() => {
  const date = dateStore.currentDate;
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
});

const changeDate = (direction) => {
  dateStore.changeDate(direction);
};

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div class="date-selector">
    <button @click="changeDate(-1)" class="arrow-button"><</button>
    <h2 class="date-display">{{ formattedDate }}</h2>
    <button @click="changeDate(1)" class="arrow-button">></button>
  </div>
</template>

<style scoped>
.fas::before {
  font-family: 'Font Awesome 5 Free' !important;
  font-weight: 900 !important;
}
.date-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.arrow-button {
  font-size: 25px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.date-display {
  font-size: 25px;
  font-weight: 600;
  color: #1c4e32;
  margin-bottom: 10px;
}
</style>
