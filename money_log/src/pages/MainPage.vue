<script setup>
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
</script>

<template>
  <div class="main-page">
    <div class="nickname-title">{{ nickname }}'s Log</div>
    <DailyMoneyLog />
    <CustomCalendar />
    <MonthlySummary />
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
  gap: 20px;
}

.nickname-title {
  font-size: 23px;
  font-weight: bold;
  color: #0b570e;
  margin-bottom: -10px;
}
</style>
