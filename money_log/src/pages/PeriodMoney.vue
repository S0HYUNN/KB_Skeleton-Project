<template>
  <div class="period-money-box">
    <div class="box-header">
      <span class="box-title">고정 지출 추가</span>
      <div class="pin-wrapper">
        <img
          src="@/assets/images/PushPin.png"
          alt="핀"
          class="pin-icon"
          @click="openFixedMoneyModal"
        />
      </div>
    </div>

    <div class="input-row">
      <input
        v-model="fixedDate"
        type="date"
        class="fixed-input"
        placeholder="Date"
      />
      <input
        v-model="fixedContent"
        type="text"
        class="fixed-input"
        placeholder="Content"
      />
      <input
        v-model="fixedAmount"
        type="number"
        class="fixed-input"
        placeholder="Amount"
      />
    </div>

    <button class="fixed-add-btn" @click="handleAddFixed">ADD</button>
  </div>

  <!-- 고정 머니 Log 모달 -->
  <div
    v-if="isFixedMoneyModalOpen"
    class="modal-overlay"
    @click.self="closeFixedMoneyModal"
  >
    <div class="modal">
      <h2 class="modal-title">고정 머니 Log</h2>
      <hr />
      <div
        class="fixed-money-item"
        v-for="(item, index) in filteredFixedMoneyList"
        :key="index.id"
      >
        <span class="fixed-name">{{ item.content }}</span>
        <span class="fixed-amount">-{{ item.amount.toLocaleString() }}</span>
        <i class="fas fa-trash icon-btn" @click="deleteItem(item.id)"></i>
      </div>
      <button class="modal-submit-btn" @click="closeFixedMoneyModal">
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useMoneyStore } from '@/stores/money';
import '../assets/modal.css';

const moneyStore = useMoneyStore();

const fixedMoneyList = computed(() => moneyStore.periodicExpenseList);

const filteredFixedMoneyList = computed(() => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');

  return moneyStore.periodicExpenseList.filter((item) => {
    const itemDate = new Date(item.date);
    const itemYear = itemDate.getFullYear();
    const itemMonth = String(itemDate.getMonth() + 1).padStart(2, '0');
    return itemYear === currentYear && itemMonth === currentMonth;
  });
});

const fixedDate = ref('');
const fixedContent = ref('');
const fixedAmount = ref('');

const isFixedMoneyModalOpen = ref(false);

const openFixedMoneyModal = () => {
  isFixedMoneyModalOpen.value = true;
};

const closeFixedMoneyModal = () => {
  isFixedMoneyModalOpen.value = false;
};

const handleAddFixed = async () => {
  if (!fixedDate.value || !fixedContent.value || !fixedAmount.value) {
    alert('모든 값을 입력해 주세요!');
    return;
  }

  await moneyStore.addPeriodicExpense({
    date: fixedDate.value,
    content: fixedContent.value,
    category: 'expense',
    amount: Number(fixedAmount.value),
  });

  await moneyStore.fetchPeriodicExpenses();

  fixedDate.value = '';
  fixedContent.value = '';
  fixedAmount.value = '';
};

const deleteItem = async (id) => {
  const confirmed = window.confirm('정말 삭제하시겠습니까?');
  if (confirmed) {
    await moneyStore.deletePeriodicExpense(id);
    await moneyStore.fetchPeriodicExpenses();
  }
};

onMounted(async () => {
  await moneyStore.fetchPeriodicExpenses();
});
</script>

<style scoped>
.fas::before {
  font-family: 'Font Awesome 5 Free' !important;
  font-weight: 900 !important;
}

.period-money-box {
  position: relative;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  padding: 20px 18px;
  margin-top: 24px;
  width: 90%;
}

.box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.box-title {
  font-weight: 800;
  color: #1c4e32;
  font-size: 17px;
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
  width: 20px;
  height: 20px;
}

.input-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: nowrap;
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
