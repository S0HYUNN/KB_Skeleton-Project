<template>
  <div class="filters">
    <div class="filter-item">
      <span class="filter-icon">⇅</span>
      <select v-model="selectedOption">
        <option>전체</option>
        <option>수입</option>
        <option>지출</option>
        <!-- 추가적인 옵션들 넣기 -->
      </select>
    </div>
    <div class="filter-item">
      <select v-model="selectedPeriod">
        <option>전체</option>
        <option>1개월</option>
        <!-- 기간 옵션 -->
      </select>
    </div>
    <div class="filter-item">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="검색"
        class="search-input"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedOption = ref('전체');
const selectedPeriod = ref('전체');
const searchQuery = ref('');
</script>

<style scoped>
.filters {
  display: flex;
  gap: 8px; /* 필터 간 간격을 조금 좁힘 */
  margin-bottom: 12px;
  align-items: center;
}

.filter-item {
  border: 1px solid #ccc;
  border-radius: 12px; /* 더 둥글게 설정 */
  padding: 4px 6px; /* 더 작게 설정 */
  font-size: 12px; /* 폰트 크기 축소 */
}

.filter-icon {
  border: 1px solid #ccc;
  border-radius: 12px; /* 더 둥글게 설정 */
  padding: 4px 6px; /* 더 작게 설정 */
  font-size: 16px; /* 아이콘 크기 조정 */
}

select,
.search-input {
  border: 1px solid #ccc;
  border-radius: 12px; /* 더 둥글게 설정 */
  padding: 6px 10px; /* 더 작은 패딩 */
  font-size: 12px; /* 폰트 크기 축소 */
  color: #333;
  background-color: #fff;
}

.search-input {
  width: 120px; /* 검색창을 더 좁게 설정 */
}
</style>
