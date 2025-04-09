<script setup>
import { ref, onMounted, computed } from 'vue';
import { useMoneyStore } from '../stores/money';

const moneyStore = useMoneyStore();

// 1️⃣ 페이지 처음 로드될 때 데이터 불러오기
onMounted(async () => {
  await moneyStore.fetchMoneyLogs();
  console.log('📦 불러온 moneyList:', moneyStore.moneyList.value);
  //   moneyStore.fetchMoneyLogs();
});

// ✅ 2. 4월 1일 항목만 시간 오름차순 정렬
const filteredLogs = computed(() => {
  return moneyStore.moneyList
    .filter((item) => item.date.includes('2025-04-01'))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
});

// ✅ 시간만 잘라서 표시 (예: 08:00)
const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toTimeString().slice(0, 5); // "08:00" 형식
};
</script>

<template>
  <div class="card-container">
    <!-- 정렬 탭 -->
    <section class="sort-tabs">
      <button class="sort-btn active">시간 순</button>
      <button class="sort-btn">금액 순</button>
      <button class="sort-btn">지출/수입 순</button>
    </section>

    <!-- 로그 리스트 -->
    <div class="log-card-list">
      <div class="log-scroll-area">
        <div
          class="log-entry"
          v-for="(item, index) in filteredLogs"
          :key="item.id"
        >
          <div class="row top-row">
            <span class="content">{{ item.content }}</span>
            <span
              class="amount"
              :class="item.category === 'income' ? 'income' : 'expense'"
            >
              {{ item.category === 'income' ? '+' : '-'
              }}{{ item.amount.toLocaleString() }}원
            </span>
          </div>
          <div class="row bottom-row">
            <span class="time">{{ formatTime(item.date) }}</span>

            <div class="info-right">
              <span class="entry-id">ID: {{ item.id }}</span>
            </div>
          </div>

          <div v-if="index !== filteredLogs.length - 1" class="divider"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fas::before {
  font-family: 'Font Awesome 5 Free' !important;
  font-weight: 900 !important;
}

.card-container {
  width: 80%;
}

.sort-tabs {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 16px;
}

.sort-btn {
  background: none;
  border: none;
  padding: 6px 10px;
  font-size: 14px;
  color: #888;
  font-weight: 500;
  cursor: pointer;
}

.sort-btn.active {
  color: #1c4e32;
  border-bottom: 2px solid #1c4e32;
}

.log-card-list {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  padding: 12px 20px; /* ✅ 가로 패딩 늘림 */
  margin-bottom: 24px;
  max-height: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.log-scroll-area {
  overflow-y: auto;
  max-height: 400px;
  padding-right: 4px;
  scrollbar-width: none;
}

.log-scroll-area::-webkit-scrollbar {
  display: none;
}

.log-entry {
  padding: 10px 8px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-row {
  color: #0b570e;
  font-weight: 10000;
  font-size: 18px;
  margin-bottom: 0px;
}

.bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: #6a6a6a;
  margin-top: 4px;
}

.amount {
  font-weight: bold;
  font-size: 14px;
}

.amount.income {
  color: #4d59ff;
}

.amount.expense {
  color: #e74c3c;
}

.divider {
  height: 1px;
  background-color: #eee;
  margin: 10px 0;
}
</style>
