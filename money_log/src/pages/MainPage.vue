<script setup>
import { ref, onMounted } from 'vue';
import DailyMoneyLog from '@/components/DailyMoneyLog/DailyMoneyLog.vue';
import CustomCalendar from '@/components/CustomCalendar.vue';
import MonthlySummary from '@/components/MonthlySummary.vue';
import AddMoney from '@/pages/AddMoney.vue';
import axios from 'axios';

const nickname = ref('');
const isModalOpen = ref(false);

onMounted(async () => {
  try {
    // localStorage에서 userId 가져오기
    const userId = localStorage.getItem('userId');

    // userId가 없으면 Guest로 설정하고 API 호출 건너뛰기
    if (!userId) {
      console.log('사용자 ID가 없습니다. Guest로 설정합니다.');
      nickname.value = 'Guest';
      return;
    }

    // API 호출하여 닉네임 가져오기
    const response = await axios.get(`http://localhost:3000/user/${userId}`);
    nickname.value = response.data.nickname;
  } catch (error) {
    console.error('닉네임 가져오기 실패:', error);
    nickname.value = 'Guest'; // 에러 발생 시 기본값 설정
  }
});
const openAddMoneyModal = () => {
  isModalOpen.value = true;
};
const closeAddMoneyModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div class="main-page">
    <DailyMoneyLog />
  </div>
</template>

<style scoped>
.main-page {
  background-color: #f1f1e8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
}
</style>

