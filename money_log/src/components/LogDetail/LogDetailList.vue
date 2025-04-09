<template>
  <div class="log-list">
    <div v-if="isLoading">로딩 중...</div>
    <div v-if="!isLoading && moneyList.length === 0">항목 없음</div>
    <div class="log-group">
      <LogDetailFilter></LogDetailFilter>
      <hr />
      <!-- 날짜별로 나누지 않고, 하나의 리스트 박스 안에 모든 log-item 나열 -->
      <LogDetailItem v-for="log in moneyList" :key="log.id" :log="log" />
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
const moneyList = computed(() => store.moneyList);

onMounted(() => {
  store.fetchMoneyLogs();
});
</script>

<style scoped>
.log-group {
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  padding: 16px 20px;
  text-align: center;
  width: 330px;
  height: 70%;
  margin: 32px auto 16px auto;
  box-sizing: border-box;
}
hr {
  margin-top: 8px;
  border: 1px solid #ddd;
  opacity: 0.5;
}
</style>
