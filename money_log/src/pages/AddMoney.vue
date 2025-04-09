<script setup>
import { ref, onMounted, computed } from 'vue';
import { useMoneyStore } from '../stores/money';

const props = defineProps({
  show: Boolean,
});
const emit = defineEmits(['close']);
const closeModal = () => emit('close');

const moneyStore = useMoneyStore();
const isModalOpen = ref(false);
const openModal = () => {
  isModalOpen.value = true;
  console.log('✅ 모달 열림!'); // 콘솔 확인용
};

const now = new Date();
const hh = String(now.getHours()).padStart(2, '0');
const mm = String(now.getMinutes()).padStart(2, '0');

const day = ref('');
const month = ref('');
const year = ref('2025');
const date = `${year.value}-${String(month.value).padStart(2, '0')}-${String(
  day.value
).padStart(2, '0')}T${hh}:${mm}:00`;

const modalCategory = ref('');
const modalAmount = ref('');
const modalContent = ref('');

const submitModal = async () => {
  if (
    !day.value ||
    !month.value ||
    !modalAmount.value ||
    !modalCategory.value
  ) {
    alert('모든 값을 입력해 주세요!');
    return;
  }

  // 현재 시간 반영
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');

  const date = `${year.value}-${String(month.value).padStart(2, '0')}-${String(
    day.value
  ).padStart(2, '0')}T${hh}:${mm}:00`;

  const newItem = {
    date,
    category: modalCategory.value,
    content: modalContent.value,
    amount: Number(modalAmount.value),
  };

  await moneyStore.addMoneyLog(newItem);
  await moneyStore.fetchMoneyLogs();
  closeModal();

  // 입력 초기화
  day.value = '';
  month.value = '';
  modalCategory.value = '';
  modalAmount.value = '';
  modalContent.value = '';
};
</script>

<template>
  <!-- 모달 -->
  <div v-if="show" class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h2 class="modal-title">DAILY MONEY LOG</h2>

      <div class="input-row modal-row">
        <select v-model="day" class="modal-input">
          <option disabled value="">Day</option>
          <option v-for="d in 31" :key="d">{{ d }}</option>
        </select>
        <select v-model="month" class="modal-input">
          <option disabled value="">Month</option>
          <option v-for="m in 12" :key="m">{{ m }}</option>
        </select>
        <select v-model="year" class="modal-input">
          <option disabled value="">Year</option>
          <option>2025</option>
        </select>
      </div>

      <div class="input-row modal-row">
        <select v-model="modalCategory" class="modal-input">
          <option disabled value="">Category</option>
          <option value="income">수입</option>
          <option value="expense">지출</option>
        </select>
        <input
          v-model="modalAmount"
          type="number"
          placeholder="Amount"
          class="modal-input"
        />
      </div>

      <textarea
        v-model="modalContent"
        class="modal-textarea"
        placeholder="Content"
      />

      <button class="modal-submit-btn" @click="submitModal">Submit</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  border-radius: 16px;
  padding: 24px 20px;
  width: 90%;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  animation: fadeIn 0.2s ease-in-out;
}

.modal-title {
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #1c4e32;
  margin-bottom: 16px;
}

.modal-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 6px;
}

.modal-input {
  flex: 1;
  padding: 8px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.modal-textarea {
  width: 100%;
  height: 60px;
  resize: none;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px;
  margin-bottom: 14px;
}

.modal-submit-btn {
  width: 100%;
  background-color: #0b570e;
  color: #fff;
  padding: 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
