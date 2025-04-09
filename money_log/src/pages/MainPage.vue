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
import DailyMoneyLog from "@/components/DailyMoneyLog";
>>>>>>> cc8110b (Fix: 에러 해결)
</script>

<template>
  <div class="main-page">
<<<<<<< HEAD
    <div class="nickname-title">{{ nickname }}'s Log</div>
    <DailyMoneyLog />
    <CustomCalendar />
    <MonthlySummary />
=======
    <DailyMoneyLog />
>>>>>>> cc8110b (Fix: 에러 해결)
  </div>
</template>

<style scoped>
.main-page {
  background-color: #f1f1e8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
<<<<<<< HEAD
  padding-top: 56px;
  gap: 20px;
}

.nickname-title {
  font-size: 23px;
  font-weight: bold;
  color: #0b570e;
  margin-bottom: -10px;
=======
  padding-top: 48px;
>>>>>>> cc8110b (Fix: 에러 해결)
}
</style>
