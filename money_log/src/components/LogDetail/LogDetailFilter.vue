<template>
  <div class="filters">
    <div class="filter-item">
      <span class="filter-icon">⇅</span>
      <select v-model="selectedOption">
        <option>전체</option>
        <option>1개월</option>
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
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
}

.filter-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.filter-icon {
  font-size: 18px;
}

select,
.search-input {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
}

.search-input {
  width: 150px;
}
</style>
