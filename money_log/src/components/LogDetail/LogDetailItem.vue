<template>
  <div class="log-item" :class="log.category">
    <div class="log-header">
      <div class="log-date-category">
        <!-- 날짜 -->
        <span class="log-date">{{ formattedDate }}</span>
        <!-- 카테고리 -->
        <span class="log-category">{{ formattedCategory }}</span>
      </div>
      <!-- 금액을 오른쪽에 배치 -->
      <span :class="log.category" class="log-amount">{{
        formattedAmount
      }}</span>
    </div>
    <div class="log-footer">
      <!-- 시간 -->
      <span class="log-time">{{ formattedTime }}</span>
    </div>
    <div class="log-balance">
      <span>잔액: {{ formattedBalance }}</span>
    </div>
    <hr />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  log: {
    type: Object,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

// 금액 포맷팅 (수입은 +, 지출은 - 붙이기)
const formattedAmount = computed(() => {
  const amount = props.log.amount;
  const sign = props.log.category === 'income' ? '+' : '-';
  const formatted = new Intl.NumberFormat('ko-KR').format(amount);
  return `${sign}${formatted}원`;
});

// 날짜 포맷팅 (월.일)
const formattedDate = computed(() => {
  const d = new Date(props.log.date);
  return `${d.getMonth() + 1}.${d.getDate()}`; // ex) 4.6
});

// 시간 포맷팅
const formattedTime = computed(() => {
  const d = new Date(props.log.date);
  return `${d.getHours().toString().padStart(2, '0')}:${d
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
});

// 카테고리 포맷팅 (수입/지출)
const formattedCategory = computed(() =>
  props.log.category === 'income' ? '수입' : '지출'
);

// 잔액 포맷팅
const formattedBalance = computed(() => {
  return new Intl.NumberFormat('ko-KR').format(props.balance);
});
</script>

<style scoped>
/* 박스 제거 */
.log-item {
  padding: 12px;
  border: none;
  background: none;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.log-header {
  display: flex;
  justify-content: space-between; /* 날짜와 금액을 양옆으로 배치 */
}

.log-date-category {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.log-date {
  font-size: 16px;
  font-weight: bold;
  color: #2e7d32;
}

.log-category {
  font-size: 14px;
  color: #888;
}

.log-amount {
  font-weight: bold;
  font-size: 16px;
}

.log-amount.income {
  color: #2e7d32; /* 수입은 초록색 */
}

.log-amount.expense {
  color: #d32f2f; /* 지출은 빨간색 */
}

.log-footer {
  display: flex;
  justify-content: flex-start; /* 시간은 왼쪽에 배치 */
  font-size: 14px;
  color: #888;
}

.log-time {
  font-size: 14px;
  color: #888;
}

.log-balance {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

hr {
  margin-top: 8px;
  border: 1px solid #ddd;
  opacity: 0.5;
}
</style>
