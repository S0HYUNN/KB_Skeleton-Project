<template>
  <div class="log-list">
    <div class="log-group">
      <!-- 필터 영역 -->
      <div class="filter-area">
        <LogDetailFilter @filterUpdated="applyFilter" />
      </div>
      <hr />

      <!-- 항목 목록 -->
      <div class="log-items">
        <div v-if="isLoading">로딩 중...</div>
        <div v-if="!isLoading && filteredMoneyList.length === 0">항목 없음</div>

        <!-- 항목들을 나열 -->
        <LogDetailItem
          v-for="log in filteredMoneyList"
          :key="log.id"
          :log="log"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useMoneyStore } from '@/stores/money.js';
import LogDetailItem from './LogDetailItem.vue';
import LogDetailFilter from './LogDetailFilter.vue';

const store = useMoneyStore();
const isLoading = computed(() => store.isLoading);
const moneyList = computed(() => store.sortedByDate);

const filterCriteria = ref({
  category: 'all',
  period: 'allmonth',
  searchQuery: '',
  sortOrder: 'desc',
});

// 필터 조건에 맞게 돈 목록을 필터링 및 정렬하는 computed 속성
const filteredMoneyList = computed(() => {
  let filtered = [...moneyList.value]; // store.moneyList를 복사하여 사용

  // 카테고리 필터링
  if (filterCriteria.value.category !== 'all') {
    filtered = filtered.filter(
      (item) => item.category === filterCriteria.value.category
    );
  }

  // 기간 필터링 (선택한 월에 맞춰 필터링)
  if (
    filterCriteria.value.period !== 'setting' &&
    filterCriteria.value.period !== 'allmonth'
  ) {
    filtered = filtered.filter((item) => {
      const itemDate = new Date(item.date);
      const selectedMonth = new Date(`${filterCriteria.value.period}-01`);
      return itemDate.getMonth() === selectedMonth.getMonth();
    });
  }
  // 검색 필터링 (제목에 검색어가 포함된 항목만 필터링)
  if (filterCriteria.value.searchQuery) {
    filtered = filtered.filter((item) =>
      item.content
        .toLowerCase()
        .includes(filterCriteria.value.searchQuery.toLowerCase())
    );
  }

  // 정렬
  if (filterCriteria.value.sortOrder === 'asc') {
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return filtered;
});

// 필터 업데이트 처리
const applyFilter = (newFilter) => {
  filterCriteria.value = newFilter;
};

onMounted(async () => {
  await store.fetchMoneyLogs();
  console.log('Money logs fetched:', store.moneyList);
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
