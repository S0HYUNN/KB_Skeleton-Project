<template>
  <div class="search-bar">
    <div class="search-wrapper">
      <img
        src="@/assets/images/MagnifyingGlass2.svg"
        class="search-icon"
        @click="handleSearch"
      />
      <input
        type="text"
        v-model="searchQuery"
        placeholder="키워드를 입력하세요"
        class="search-input"
        @input="updateFilter"
        @keydown.enter="handleSearch"
      />
    </div>
  </div>
  <div class="filter-line">
    <div class="filter-year">2025</div>
    <div class="filter-item">
      <select v-model="themeFilter" @change="updateFilter">
        <option value="allTheme">카테고리</option>
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
    <div class="filter-item">
      <select v-model="selectedOption" @change="updateFilter">
        <option value="all">유형</option>
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
    </div>
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
        <option value="allmonth">월 선택</option>
      </select>
    </div>
    <span class="sort-icon" @click="toggleSortOrder">
      <img
        :src="sortOrder === 'asc' ? vectorUp : vectorDown"
        alt="정렬 아이콘"
        class="sort-icon-img"
      />
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import vectorUp from "@/assets/images/vector_up.png";
import vectorDown from "@/assets/images/vector_down.png";

const selectedOption = ref("all");
const selectedPeriod = ref("allmonth");
const searchQuery = ref("");
const selectedYear = ref("");
const sortOrder = ref("desc");
const themeFilter = ref("allTheme");

const emit = defineEmits();

const updateFilter = () => {
  emit("filterUpdated", {
    category: selectedOption.value,
    period: selectedPeriod.value,
    year: "2025",
    searchQuery: searchQuery.value,
    sortOrder: sortOrder.value,
    theme: themeFilter.value,
  });
};

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  updateFilter();
};

const handleSearch = () => {
  updateFilter();
};

onMounted(() => {
  selectedYear.value = "2025";
});
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.search-wrapper {
  display: flex;
  align-items: center;
  border: 2px solid #ebbb42;
  border-radius: 20px;
  padding: 4px 10px;
  width: 270px;
  background-color: white;
}

.search-input {
  width: 270px;
  border: 2px solid #ebbb42;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 11px;
  line-height: 1.2;
  outline: none;
}

.search-icon {
  width: 16px;
  height: 16px;
  margin-left: 8px;
  margin-right: 5px;
  cursor: pointer;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 11px;
  background-color: transparent;
}

.filter-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 10px;
}

.filter-year {
  font-size: 20px;
  font-weight: bold;
  color: #2e7d32;
  margin-top: -2px;
}

.filter-item {
  border: 1px solid #dad8d8;
  border-radius: 0;
  background-color: white;

  padding: 0;
  display: flex;
  align-items: center;
}

.filter-item select {
  border: none;
  background: transparent;
  outline: none;

  font-size: 10px;
  color: #0b570e;

  padding: 2px 6px;
  height: auto;
  line-height: 1.2;
}

.sort-icon {
  cursor: pointer;
}

.sort-icon-img {
  width: 18px;
  height: 17px;
}
</style>
