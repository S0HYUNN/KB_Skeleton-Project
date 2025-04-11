<template>
  <div class="log-list">
    <div class="log-group">
      <div class="filter-area">
        <LogDetailFilter @filterUpdated="applyFilter" />
      </div>
      <hr />
      <div class="log-items">
        <div v-if="isLoading">로딩 중...</div>
        <div v-if="!isLoading && filteredMoneyList.length === 0">항목 없음</div>
        <LogDetailItem
          v-for="log in filteredMoneyList"
          :key="log.id"
          :log="log"
        />
      </div>
      <img
        src="@/assets/images/plus_button.svg"
        class="plus-icon"
        @click="openModal"
      />
    </div>
    <AddMoney
      :show="isModalVisible"
      @close="closeModal"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useMoneyStore } from "@/stores/money.js";
import LogDetailItem from "./LogDetailItem.vue";
import LogDetailFilter from "./LogDetailFilter.vue";
import AddMoney from "@/pages/AddMoney.vue";

const store = useMoneyStore();
const isLoading = computed(() => store.isLoading);
const moneyList = computed(() => store.sortedByDate);

const filterCriteria = ref({
  category: "all",
  period: "allmonth",
  year: "",
  searchQuery: "",
  sortOrder: "desc",
  theme: "allTheme", // 테마 필터 추가
});

// 필터 조건에 맞게 돈 목록을 필터링 및 정렬하는 computed 속성
const filteredMoneyList = computed(() => {
  let filtered = [...moneyList.value]; // store.moneyList를 복사하여 사용

  // 카테고리 필터링
  if (filterCriteria.value.category !== "all") {
    filtered = filtered.filter(
      (item) => item.category === filterCriteria.value.category
    );
  }

  // 기간 필터링 (선택한 월에 맞춰 필터링)
  if (
    filterCriteria.value.period !== "setting" &&
    filterCriteria.value.period !== "allmonth"
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
  // 테마 필터링
  if (filterCriteria.value.theme !== "allTheme") {
    filtered = filtered.filter(
      (item) => item.theme === filterCriteria.value.theme
    );
  }
  // 년도 필터링
  filtered = filtered.filter((item) => {
    const itemYear = new Date(item.date).getFullYear();
    return itemYear === parseInt(filterCriteria.value.year);
  });

  // 정렬
  if (filterCriteria.value.sortOrder === "asc") {
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return filtered;
});

const isModalVisible = ref(false); // 모달의 표시 여부

// 필터 업데이트 처리
const applyFilter = (newFilter) => {
  filterCriteria.value = newFilter;
};

// 모달 열기
const openModal = () => {
  console.log("모달 열림 시도");
  isModalVisible.value = true; // 모달 표시 상태를 true로 변경
};

// 모달 닫기
const closeModal = () => {
  console.log("모달 닫힘 시도");
  isModalVisible.value = false; // 모달 표시 상태를 false로 변경
};

// 모달에서 제출된 데이터 처리
const handleSubmit = async (newItem) => {
  await store.addMoneyLog(newItem); // 새로운 항목을 store에 추가
  await store.fetchMoneyLogs(); // 새로운 로그 목록을 가져오기
  closeModal(); // 모달 닫기
};

onMounted(async () => {
  const currentYear = new Date().getFullYear(); // 현재 년도
  filterCriteria.value.year = currentYear; // 기본값을 현재 연도로 설정
  await store.fetchMoneyLogs();
  console.log("Money logs fetched:", store.moneyList);
});
</script>

<style scoped>
.filter-area {
  background-color: white;
}

.log-group {
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  padding: 16px 20px;
  text-align: center;
  width: 350px;
  height: 630px;
  margin: 32px auto 16px auto;
  box-sizing: border-box;
  max-height: 80vh;
}

.log-items {
  height: 420px;
  overflow-y: auto;
  margin-top: 0.5rem;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

.log-items::-webkit-scrollbar {
  display: none;
}

hr {
  margin-top: 0.25rem;
  border: 1px solid #ddd;
  opacity: 0.5;
}

.plus-icon {
  margin-top: 30px;
  margin-right: -16rem;
}
</style>
