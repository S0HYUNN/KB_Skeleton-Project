<script setup>
import { ref, onMounted, computed } from 'vue';
import { useMoneyStore } from '../stores/money';
import '../assets/modal.css';

import VectorUp from '@/assets/images/Vector_up.png';
import VectorDown from '@/assets/images/Vector_down.png';

const moneyStore = useMoneyStore();

const editingItem = ref(null);
const isEditModalOpen = ref(false);

const sortType = ref('time');
const sortOrder = ref('desc');

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
};

const setSort = (type) => {
  sortType.value = type;
};

const openEditModal = (item) => {
  const [datePart] = item.date.split('T');
  const [year, month, day] = datePart.split('-');
  editingItem.value = {
    ...item,
    year,
    month,
    day,
  };
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

const updateItem = async () => {
  const { year, month, day, ...rest } = editingItem.value;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const date = `${year}-${String(month).padStart(2, '0')}-${String(
    day
  ).padStart(2, '0')}T${hh}:${mm}:00`;
  const updatedItem = { ...rest, date };
  await moneyStore.updateMoneyLog(editingItem.value.id, updatedItem);
  await moneyStore.fetchMoneyLogs();
  closeEditModal();
};

const deleteItem = async (id) => {
  const confirmed = window.confirm('정말 삭제하시겠습니까?');
  if (confirmed) {
    await moneyStore.deleteMoneyLog(id);
    await moneyStore.fetchMoneyLogs();
    closeEditModal();
  }
};

onMounted(async () => {
  await moneyStore.fetchMoneyLogs();
});

const filteredLogs = computed(() => {
  const filtered = moneyStore.moneyList.filter((item) =>
    item.date.includes('2025-04-01')
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortType.value === 'amount') {
      return sortOrder.value === 'asc'
        ? a.amount - b.amount
        : b.amount - a.amount;
    } else if (sortType.value === 'category') {
      return sortOrder.value === 'asc'
        ? a.category.localeCompare(b.category)
        : b.category.localeCompare(a.category);
    } else {
      return sortOrder.value === 'asc'
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
  });

  return sorted;
});

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toTimeString().slice(0, 5);
};

const isFixedMoneyModalOpen = ref(false);
const openFixedMoneyModal = () => {
  isFixedMoneyModalOpen.value = true;
};
const closeFixedMoneyModal = () => {
  isFixedMoneyModalOpen.value = false;
};
</script>

<template>
  <div class="card-container">
    <section class="sort-tabs">
      <button class="sort-icon-btn" @click="toggleSortOrder">
        <img
          :src="sortOrder === 'asc' ? VectorUp : VectorDown"
          alt="정렬 방향"
          class="sort-icon-img"
        />
      </button>
      <button
        class="sort-btn"
        :class="{ active: sortType === 'time' }"
        @click="setSort('time')"
      >
        시간 순
      </button>
      <button
        class="sort-btn"
        :class="{ active: sortType === 'amount' }"
        @click="setSort('amount')"
      >
        금액 순
      </button>
      <button
        class="sort-btn"
        :class="{ active: sortType === 'category' }"
        @click="setSort('category')"
      >
        지출/수입 순
      </button>
    </section>

    <div class="log-card-list">
      <div class="log-scroll-area">
        <div
          class="log-entry"
          v-for="(item, index) in filteredLogs"
          :key="item.id"
        >
          <div class="row top-row">
            <span class="content">{{ item.content }}</span>
            <span
              class="amount"
              :class="item.category === 'income' ? 'income' : 'expense'"
            >
              {{ item.category === 'income' ? '+' : '-'
              }}{{ item.amount.toLocaleString() }}원
            </span>
          </div>
          <div class="row bottom-row">
            <span class="time">{{ formatTime(item.date) }}</span>
            <div class="info-right">
              <span class="entry-id">ID: {{ item.id }}</span>
              <div class="icon-inline">
                <i
                  class="fas fa-pen icon-btn edit-icon"
                  @click="openEditModal(item)"
                ></i>
              </div>
            </div>
          </div>
          <div v-if="index !== filteredLogs.length - 1" class="divider"></div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="isEditModalOpen"
    class="modal-overlay"
    @click.self="closeEditModal"
  >
    <div class="modal">
      <h2 class="modal-title">수정하기</h2>

      <div class="input-row modal-row">
        <select v-model="editingItem.category" class="modal-input">
          <option disabled value="">Category</option>
          <option value="income">수입</option>
          <option value="expense">지출</option>
        </select>
        <input
          v-model="editingItem.amount"
          type="number"
          class="modal-input"
          placeholder="Amount"
        />
      </div>
      <textarea
        v-model="editingItem.content"
        class="modal-textarea"
        placeholder="Content"
      />
      <div class="button-row">
        <button class="modal-submit-btn flex-7" @click="updateItem">
          수정 완료
        </button>
        <button
          class="modal-delete-btn flex-3"
          @click="deleteItem(editingItem.id)"
        >
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fas::before {
  font-family: 'Font Awesome 5 Free' !important;
  font-weight: 900 !important;
}

.card-container {
  width: 90%;
}

.sort-tabs {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 16px;
}

.sort-btn {
  background: none;
  border: none;
  padding: 6px 2px;
  font-size: 14px;
  color: #888;
  font-weight: 500;
  cursor: pointer;
}

.sort-btn.active {
  color: #1c4e32;
  border-bottom: 2px solid #1c4e32;
}

.log-card-list {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  padding: 12px 20px;
  margin-bottom: 24px;
  max-height: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.log-scroll-area {
  overflow-y: auto;
  max-height: 400px;
  padding-right: 4px;
  scrollbar-width: none;
}

.log-scroll-area::-webkit-scrollbar {
  display: none;
}

.log-entry {
  padding: 10px 8px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-row {
  color: #0b570e;
  font-weight: 10000;
  font-size: 18px;
  margin-bottom: 0px;
}

.bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: #6a6a6a;
  margin-top: 4px;
}

.amount {
  font-weight: bold;
  font-size: 14px;
}

.amount.income {
  color: #4d59ff;
}

.amount.expense {
  color: #e74c3c;
}

.divider {
  height: 1px;
  background-color: #eee;
  margin: 10px 0;
}

.button-row {
  display: flex;
  gap: 8px;
}

.flex-7 {
  flex: 7;
}

.flex-3 {
  flex: 3;
}

.modal-submit-btn,
.modal-delete-btn {
  background-color: #0b570e;
  color: #fff;
  padding: 10px;
  height: 40px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}
.modal-submit-btn {
  width: 100%;
  background-color: #0b570e;
  color: #fff;
  padding: 10px;
  margin-top: 0;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.modal-delete-btn {
  background-color: #fff;
  color: #0b570e;
  border: 1px solid #0b570e;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s;
}

.modal-delete-btn:hover {
  background-color: #eaf7ed;
}
.sort-icon-btn {
  border: none;
  background-color: #f1f1e8;
}
.sort-icon-img {
  border: none;
  outline: none;
  background: none;
  width: 12px;
  height: 12px;
}
.log-entry {
  position: relative;
  padding: 3px 8px;
}

.edit-icon {
  position: absolute;
  top: 1px;
  right: -4px;
  color: #0b570e;
  cursor: pointer;
  z-index: 1;
  color: #808080;
}
</style>
