<template>
  <div class="filters">
    <div class="sort-btn">
      <span @click="toggleSortOrder" class="sort-icon">
        <img
          :src="sortOrder === 'asc' ? vectorUp : vectorDown"
          alt="정렬 아이콘"
          class="sort-icon-img"
        />
      </span>
    </div>
    <div class="filter-item">
      <select v-model="selectedOption">
        <option>전체</option>
        <option>수입</option>
        <option>지출</option>
      </select>
    </div>
    <div class="filter-item">
      <select v-model="selectedPeriod">
        <option>1주일</option>
        <option>1개월</option>
      </select>
    </div>
    <div class="filter-item search-wrapper">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="검색"
        class="search-input"
      />
      <img src="@/assets/images/MagnifyingGlass.svg" class="search-icon" />
      <!-- 또는 FontAwesome, 이미지도 가능 -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import vectorUp from '@/assets/images/vector_up.png';
import vectorDown from '@/assets/images/vector_down.png';

const selectedOption = ref('전체');
const selectedPeriod = ref('1주일');
const searchQuery = ref('');
const sortOrder = ref('desc'); // 'asc'는 오름차순, 'desc'는 내림차순

// 정렬 방향을 토글하는 함수
const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
};
</script>

<style scoped>
.filters {
  display: flex;
  margin-top: 12px;
  align-items: center;
  justify-content: flex-start;
}
.sort-btn {
  color: #888;
  font-weight: 500;
  cursor: pointer;
  margin-right: 0.25rem;
}
.filter-item {
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 5px; /* 더 둥글게 설정 */
  background-color: #fff;
  margin-right: 0.25rem;
}

.sort-icon {
  font-size: 14px;
  color: #4caf50;
  cursor: pointer;
}

select,
.search-input {
  border: none;
  background-color: transparent;
  font-size: 10px; /* 폰트 크기 조정 */
  color: #333;
  padding: auto 3px;
  outline: none;
}

.search-input {
  width: 120px;
  padding-right: 8px; /* 아이콘과의 간격을 설정할 수 있습니다. */
}

select:focus,
.search-input:focus {
  border: none;
  box-shadow: 0 0 0 2px #4caf50;
}
.sort-icon-img {
  width: 14px;
  height: 10px;
  object-fit: contain;
  background-color: white;
}
.search-wrapper {
  display: flex;
  align-items: center; /* 수평 정렬 */
  margin-left: auto; /* 오른쪽으로 밀어내기 */
}

.search-icon {
  width: 16px; /* 아이콘 크기 조정 */
  height: 16px; /* 아이콘 크기 조정 */
  object-fit: contain;
}
</style>
