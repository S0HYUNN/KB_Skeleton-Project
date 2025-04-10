<script setup>
import { ref, computed } from 'vue';
import { useMoneyStore } from '@/stores/money';

const moneyStore = useMoneyStore();

const currentDate = ref(new Date()); // 현재 날짜를 ref로 설정

// 날짜 전후로 이동하는 함수
const changeDate = (direction) => {
  const newDate = new Date(currentDate.value);
  newDate.setDate(newDate.getDate() + direction); // 방향에 따라 날짜 이동 (+1은 다음날, -1은 이전날)
  currentDate.value = newDate;
};

// 날짜를 "dd MMM yyyy" 형태로 포맷팅
const formattedDate = computed(() => {
  const date = currentDate.value;
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
});

// filteredFixedMoneyList는 currentDate를 기준으로 고정 지출 항목 필터링
const filteredFixedMoneyList = computed(() => {
  const currentYear = currentDate.value.getFullYear();
  const currentMonth = String(currentDate.value.getMonth() + 1).padStart(
    2,
    '0'
  ); // 현재 월

  return moneyStore.periodicExpenseList.filter((item) => {
    const itemDate = new Date(item.date);
    const itemYear = itemDate.getFullYear(); // 항목의 연도
    const itemMonth = String(itemDate.getMonth() + 1).padStart(2, '0'); // 항목의 월

    return itemYear === currentYear && itemMonth === currentMonth;
  });
});
</script>

<template>
  <div class="date-selector">
    <button @click="changeDate(-1)" class="arrow-button"><</button>
    <h2 class="date-display">{{ formattedDate }}</h2>
    <button @click="changeDate(1)" class="arrow-button">></button>
  </div>

  <div v-if="filteredFixedMoneyList.length">
    <h3>고정 지출 항목</h3>
    <ul>
      <li v-for="item in filteredFixedMoneyList" :key="item.id">
        {{ item.content }} - {{ item.amount.toLocaleString() }}원
      </li>
    </ul>
  </div>
  <div v-else>
    <p>이 날짜에는 고정 지출이 없습니다.</p>
  </div>
</template>

<style scoped>
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
