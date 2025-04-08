<script setup>
import { onMounted, computed } from 'vue';
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

// // 2️⃣ 테스트용 추가 함수
// const addTestItem = () => {
//   const newItem = {
//     date: '2025-04-08',
//     category: 'expense',
//     content: '테스트 항목',
//     amount: 1111,
//   };
//   moneyStore.addMoneyLog(newItem);
// };

// // 3️⃣ 삭제 테스트
// const deleteTestItem = () => {
//   const deleteId = 8; // 실제 존재하는 ID를 확인해서 바꿔줘!
//   moneyStore.deleteMoneyLog(deleteId);
// };

// // 4️⃣ 수정 테스트
// const updateTestItem = () => {
//   const updated = {
//     date: '2025-04-08',
//     category: 'expense',
//     content: '수정된 항목',
//     amount: 9999,
//   };
//   const updateId = 2; // 수정할 항목 ID
//   moneyStore.updateMoneyLog(updateId, updated);
// };
</script>

<template>
  <div class="money-page">
    <!-- 상단 날짜 -->
    <header class="top-bar">
      <div class="date-text">24 April 2025</div>
    </header>

    <!-- DAILY MONEY LOG 카드 -->
    <section class="log-card">
      <div class="log-title">DAILY MONEY LOG</div>
      <div class="log-subtext">
        언제든 돌아볼 수 있게, <span class="highlight">머니 로그</span>에
        기록해요
      </div>
      <button class="add-btn">ADD</button>
    </section>

    <!-- 정렬 탭 -->
    <section class="sort-tabs">
      <button class="sort-btn active">시간 순</button>
      <button class="sort-btn">금액 순</button>
      <button class="sort-btn">지출/수입 순</button>
    </section>

    <!-- 로그 리스트 -->
    <section class="log-card-list">
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
          <span class="total">ID: {{ item.id }}</span>
        </div>
        <div v-if="index !== filteredLogs.length - 1" class="divider"></div>
      </div>
    </section>

    <section class="fixed-expense-box">
      <div class="box-header">
        <span class="box-title">고정 지출 추가</span>
        <!-- <img src="@/assets/icons/pin-icon.svg" alt="핀" class="pin-icon" /> -->
      </div>

      <div class="input-row">
        <input type="date" class="fixed-input" placeholder="Date" />
        <input type="text" class="fixed-input" placeholder="Content" />
        <input type="number" class="fixed-input" placeholder="Amount" />
      </div>

      <button class="fixed-add-btn">ADD</button>
    </section>
  </div>
</template>

<style scoped>
.money-page {
  max-width: 393px;
  margin: 0 auto;
  padding: 60px 20px;
  background-color: #f7f3e8;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}

.top-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.date-text {
  font-size: 20px;
  font-weight: 1000;
  color: #0b570e;
}

.log-card {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.08);
  padding: 24px 20px;
  text-align: center;
  margin-bottom: 32px;
}

.log-title {
  font-size: 20px;
  font-weight: 800;
  color: #1c4e32;
  margin-bottom: 10px;
}

.log-subtext {
  font-size: 15px;
  font-weight: 600;
  color: #0b570e;
  margin-bottom: 20px;
}

.highlight {
  font-weight: bold;
  color: #fcc600;
}

.add-btn {
  background-color: #0b570e;
  color: white;
  width: 150px;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-btn:hover {
  background-color: #165f3f;
}

/* 정렬 탭 */
.sort-tabs {
  display: flex;
  justify-content: space-around;
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

.amount {
  font-weight: bold;
  font-size: 14px;
}

.total {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.expense .amount {
  color: #e74c3c;
}

.income .amount {
  color: #4d59ff;
}
.fixed-expense-form {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.08);
  margin-top: 24px;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.form-input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Segoe UI', sans-serif;
  background-color: #fafafa;
}

.add-fixed-btn {
  background-color: #1c4e32;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-fixed-btn:hover {
  background-color: #165f3f;
}
.log-card-list {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  padding: 12px 16px;
  margin-bottom: 24px;
  height: 320px;
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
  font-size: 11px;
  color: #6a6a6a;
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
.fixed-expense-box {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  padding: 20px 18px;
  position: relative;
  margin-top: 32px;
}

.box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.box-title {
  font-weight: 800;
  color: #1c4e32;
  font-size: 17px;
}

.pin-icon {
  width: 20px;
  height: 20px;
}

.input-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: nowrap; /* ✅ 줄바꿈 방지 */
}

.fixed-input {
  flex: 1 1 0;
  min-width: 0;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f9f9f9;
}

.fixed-add-btn {
  display: block;
  background-color: #1c4e32;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin: 0 auto;
  font-size: 14px;
  width: 50%;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.fixed-add-btn:hover {
  background-color: #165f3f;
}

/* test */
.test-panel {
  margin-bottom: 24px;
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.test-panel h2 {
  font-size: 16px;
  font-weight: bold;
  color: #1c4e32;
  margin-bottom: 12px;
}

.test-panel button {
  margin-right: 8px;
  padding: 6px 12px;
  background-color: #fff;
  border: 1px solid #1c4e32;
  border-radius: 6px;
  font-size: 13px;
  color: #1c4e32;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.test-panel button:hover {
  background-color: #eaf7ed;
}

.money-page ul {
  margin-top: 8px;
  padding-left: 16px;
}

.money-page li {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}
</style>
