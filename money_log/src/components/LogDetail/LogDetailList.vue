<template>
  <div class="log-list">
    <!-- 항목 목록 영역 -->
    <div class="log-group">
      <!-- 필터 영역 (고정) -->
      <div class="filter-area">
        <LogDetailFilter></LogDetailFilter>
      </div>
      <hr />

      <!-- 항목 목록 -->
      <div class="log-items">
        <div v-if="isLoading">로딩 중...</div>
        <div v-if="!isLoading && moneyList.length === 0">항목 없음</div>

        <!-- 항목들을 나열 -->
        <LogDetailItem v-for="log in moneyList" :key="log.id" :log="log" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useMoneyStore } from '@/stores/money.js';
import LogDetailItem from './LogDetailItem.vue';
import LogDetailFilter from './LogDetailFilter.vue';

const store = useMoneyStore();
const isLoading = computed(() => store.isLoading);
const moneyList = computed(() => store.sortedByDate);

onMounted(() => {
  store.fetchMoneyLogs();
});
</script>

<style scoped>
/* 필터 영역 (고정) */
.filter-area {
  background-color: white;
}

/* 항목 목록 그룹 */
.log-group {
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  padding: 16px 20px;
  text-align: center;
  width: 330px;
  margin: 32px auto 16px auto;
  box-sizing: border-box;
  max-height: 80vh; /* 최대 높이 설정, 화면 높이 기준으로 적당히 조정 */
}

/* 항목 목록 */
.log-items {
  max-height: 550px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 추가 */
  margin-top: 0.5rem;
}

hr {
  margin-top: 0.25rem;
  border: 1px solid #ddd;
  opacity: 0.5;
}
</style>
