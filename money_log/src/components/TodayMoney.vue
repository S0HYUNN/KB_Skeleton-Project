<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDateStore } from '@/stores/date';
import '../assets/modal.css';

const dateStore = useDateStore(); // store 사용

const formattedDate = computed(() => {
  const date = dateStore.currentDate;
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
});

// 날짜 전후로 이동하는 함수
const changeDate = (direction) => {
  dateStore.changeDate(direction); // store의 날짜 변경 함수 호출
};

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div class="date-selector">
    <button @click="changeDate(-1)" class="arrow-button"><</button>
    <h2 class="date-display">{{ formattedDate }}</h2>
    <button @click="changeDate(1)" class="arrow-button">></button>
    <img
      src="@/assets/images/PushPin.png"
      alt="핀"
      class="pin-icon"
      @click="openModal"
    />
  </div>

  <!-- 모달 -->
  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h2 class="modal-title">고정 머니 Log</h2>
      <hr />
      <!-- 고정 지출 항목을 모달에 표시 -->
      <div v-if="filteredFixedMoneyList.length">
        <div
          v-for="item in filteredFixedMoneyList"
          class="fixed-money-item"
          :key="item.id"
        >
          <span class="fixed-name">{{ item.content }}</span>
          <span class="fixed-amount">-{{ item.amount.toLocaleString() }}</span>
          <i class="fas fa-trash icon-btn" @click="deleteItem(item.id)"></i>
        </div>
      </div>
      <div v-else>
        <p>이 날짜에는 고정 지출이 없습니다.</p>
      </div>
      <button class="modal-submit-btn" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<style scoped>
.fas::before {
  font-family: 'Font Awesome 5 Free' !important;
  font-weight: 900 !important;
}
.date-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-left: 50px;
}

.arrow-button {
  font-size: 25px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.date-display {
  font-size: 25px;
  font-weight: 600;
  color: #1c4e32;
  margin-bottom: 10px;
}
.pin-wrapper {
  position: absolute;
  top: -14px;
  right: -14px;
  background-color: white;
  border-radius: 50%;
  padding: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pin-icon {
  margin-left: 20px;
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.fixed-input {
  flex: 1 1 0;
  min-width: 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f9f9f9;
}

.fixed-add-btn {
  display: block;
  background-color: #0b570e;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin: 0 auto;
  font-size: 14px;
  width: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.fixed-add-btn:hover {
  background-color: #165f3f;
}

.fixed-money-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-weight: 500;
  font-size: 15px;
  border-bottom: 1px solid #ddd;
}

.fixed-name {
  color: #1c4e32;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.fixed-amount {
  color: #e74c3c;
  margin-left: auto;
}
.modal .fa-trash {
  color: #999;
  cursor: pointer;
  font-size: 15px;
  margin-left: 15px;
}
</style>
