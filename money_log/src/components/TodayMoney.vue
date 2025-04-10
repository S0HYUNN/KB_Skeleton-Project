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

  // 새로 변경된 날짜를 기준으로 년도와 월을 가져옴
  const currentYear = currentDate.value.getFullYear();
  const currentMonth = String(currentDate.value.getMonth() + 1).padStart(
    2,
    '0'
  ); // 현재 월

  // filteredFixedMoneyList는 computed 속성이므로 .value를 통해 접근
  filteredFixedMoneyList.value = moneyStore.periodicExpenseList.filter(
    (item) => {
      const itemDate = new Date(item.date);
      const itemYear = itemDate.getFullYear(); // 항목의 연도
      const itemMonth = String(itemDate.getMonth() + 1).padStart(2, '0'); // 항목의 월

      return itemYear === currentYear && itemMonth === currentMonth;
    }
  );

  console.log(`현재 날짜: ${currentDate.value.toISOString().split('T')[0]}`);
};

// 날짜를 "dd MMM yyyy" 형태로 포맷팅
const formattedDate = computed(() => {
  const date = currentDate.value;
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
});
</script>

<template>
  <div class="date-selector">
    <!-- 왼쪽 화살표 -->
    <button @click="changeDate(-1)" class="arrow-button"><</button>

    <!-- 날짜 표시 -->
    <h2 class="date-display">{{ formattedDate }}</h2>

    <!-- 오른쪽 화살표 -->
    <button @click="changeDate(1)" class="arrow-button">></button>
  </div>
</template>

<style scoped>
.date-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.arrow-button {
  font-size: 25px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: gray;
}

.date-display {
  font-size: 25px;
  font-weight: 600;
  color: #1c4e32;
  margin-bottom: 10px;
}
</style>
