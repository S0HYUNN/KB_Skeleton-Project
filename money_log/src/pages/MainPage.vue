<script setup>
<<<<<<< HEAD
import { ref, onMounted } from 'vue';
import DailyMoneyLog from '@/components/DailyMoneyLog/DailyMoneyLog.vue';
import CustomCalendar from '@/components/CustomCalendar.vue';
import MonthlySummary from '@/components/MonthlySummary.vue';

const nickname = ref('');

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/user');
    if (!response.ok) throw new Error('닉네임 로딩 실패');
    const data = await response.json();
    nickname.value = data.nickname;
  } catch (error) {
    console.error('에러:', error);
  }
});
=======
import { ref, onMounted } from "vue";
import DailyMoneyLog from "@/components/DailyMoneyLog/DailyMoneyLog.vue";
import CustomCalendar from "@/components/CustomCalendar.vue";
import MonthlySummary from "@/components/MonthlySummary.vue";
import AddMoney from "@/pages/AddMoney.vue";

const nickname = ref("");
const isModalOpen = ref(false);

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:3000/user");
    if (!response.ok) throw new Error("닉네임 로딩 실패");
    const data = await response.json();
    nickname.value = data.nickname;
  } catch (error) {
    console.error("에러:", error);
  }
});

const openAddMoneyModal = () => {
  isModalOpen.value = true;
};
const closeAddMoneyModal = () => {
  isModalOpen.value = false;
};
>>>>>>> main
</script>

<template>
  <div class="main-page">
    <div class="nickname-title">{{ nickname }}'s Log</div>
<<<<<<< HEAD
    <DailyMoneyLog />
    <CustomCalendar />
    <MonthlySummary />
=======
    <DailyMoneyLog @start="openAddMoneyModal" />
    <CustomCalendar />
    <MonthlySummary />
    <AddMoney :show="isModalOpen" @close="closeAddMoneyModal" />
>>>>>>> main
  </div>
</template>

<style scoped>
.main-page {
  background-color: #f1f1e8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 56px;
<<<<<<< HEAD
  gap: 20px;
=======
  gap: 18px;
>>>>>>> main
}

.nickname-title {
  font-size: 23px;
  font-weight: bold;
  color: #0b570e;
<<<<<<< HEAD
  margin-bottom: -10px;
=======
>>>>>>> main
}
</style>
