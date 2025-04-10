<template>
  <div class="filters">
    <!-- 년도 필터 -->
    <div class="filter-item-year">
      <select v-model="selectedYear" @change="updateFilter">
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
        <option value="2028">2028</option>
        <option value="2029">2029</option>
        <option value="2030">2030</option>
      </select>
    </div>
    <!-- 테마 필터 -->
    <div class="filter-item-theme">
      <select v-model="themeFilter" @change="updateFilter">
        <option value="allTheme">전체</option>
        <option value="월급">월급</option>
        <option value="용돈">용돈</option>
        <option value="기타">기타</option>
        <option value="식비">식비</option>
        <option value="교통비">교통비</option>
        <option value="유흥">유흥</option>
        <option value="공과금">공과금</option>
        <option value="쇼핑">쇼핑</option>
      </select>
    </div>
  </div>
  <div class="filters">
    <!-- 정렬 기준 설정 -->
    <div class="sort-btn">
      <span @click="toggleSortOrder" class="sort-icon">
        <img
          :src="sortOrder === 'asc' ? vectorUp : vectorDown"
          alt="정렬 아이콘"
          class="sort-icon-img"
        />
      </span>
    </div>

    <!-- 카테고리 필터 -->
    <div class="filter-item">
      <select v-model="selectedOption" @change="updateFilter">
        <option value="all">전체</option>
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
    </div>

    <!-- 기간 필터 -->
    <div class="filter-item">
      <select v-model="selectedPeriod" @change="updateFilter">
        <option value="january">1월</option>
        <option value="february">2월</option>
        <option value="march">3월</option>
        <option value="april">4월</option>
        <option value="may">5월</option>
        <option value="june">6월</option>
        <option value="july">7월</option>
        <option value="august">8월</option>
        <option value="september">9월</option>
        <option value="october">10월</option>
        <option value="november">11월</option>
        <option value="december">12월</option>
        <option value="allmonth">전체</option>
        <option value="setting">사용자설정</option>
      </select>
    </div>

    <!-- 검색 필터 -->
    <div class="filter-item search-wrapper">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="제목 검색"
        class="search-input"
        @input="updateFilter"
        @keydown.enter="handleSearch"
      />
      <img
        src="@/assets/images/MagnifyingGlass2.svg"
        class="search-icon"
        @click="handleSearch"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import vectorUp from '@/assets/images/vector_up.png';
import vectorDown from '@/assets/images/vector_down.png';

const selectedOption = ref('all');
const selectedPeriod = ref('allmonth');
const searchQuery = ref('');
const selectedYear = ref(''); // 기본값 설정
const sortOrder = ref('desc'); // 'asc'는 오름차순, 'desc'는 내림차순
const themeFilter = ref('allTheme'); // 테마 필터
// filterUpdated 이벤트 정의
const emit = defineEmits();

// 필터 업데이트 함수
const updateFilter = () => {
  emit('filterUpdated', {
    category: selectedOption.value,
    period: selectedPeriod.value,
    year: selectedYear.value,
    searchQuery: searchQuery.value,
    sortOrder: sortOrder.value,
    theme: themeFilter.value, // 테마 필터 추가
  });
};

// 정렬 방향을 토글하는 함수
const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  updateFilter(); // 정렬 방향 변경 시에도 필터 업데이트
};

// 검색 처리 함수
const handleSearch = () => {
  updateFilter(); // 검색어가 입력되었을 때 필터 업데이트
};
onMounted(() => {
  const currentYear = new Date().getFullYear(); // 현재 년도
  selectedYear.value = currentYear; // 기본값을 현재 연도로 설정
});
</script>

<style scoped>
.filters {
  display: flex;
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
  border-radius: 5px;
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
  align-items: center;
  margin-left: auto; /* 오른쪽으로 밀어내기 */
}

.search-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.filter-item-year {
  margin-bottom: 5px;
  margin-left: 0;
}

.filter-item-year select {
  font-size: 20px;
  height: 40px;
  color: #2e7d32;
  font-weight: 900;
}
.filter-item-theme {
  display: flex;
  align-items: center;
  margin-left: 10.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #fff;
}
</style>
