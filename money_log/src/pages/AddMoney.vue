<script setup>
import { ref } from 'vue';
import { useMoneyStore } from '../stores/money';
import '../assets/modal.css';

const props = defineProps({
  show: Boolean,
});
const emit = defineEmits(['close']);
const closeModal = () => emit('close');

const moneyStore = useMoneyStore();
const isModalOpen = ref(false);
const openModal = () => {
  isModalOpen.value = true;
  console.log('✅ 모달 열림!');
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
const modalTheme = ref('');

const submitModal = async () => {
  if (
    !day.value ||
    !month.value ||
    !modalAmount.value ||
    !modalCategory.value ||
    !modalTheme.value
  ) {
    alert('모든 값을 입력해 주세요!');
    return;
  }

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
    theme: modalTheme.value,
  };

  await moneyStore.addMoneyLog(newItem);
  await moneyStore.fetchMoneyLogs();
  closeModal();

  day.value = '';
  month.value = '';
  modalCategory.value = '';
  modalTheme.value = '';
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
        <div class="category-theme">
          <select
            v-model="modalCategory"
            class="modal-input"
            @change="modalTheme = ''"
          >
            <option disabled value="">Category</option>
            <option value="income">수입</option>
            <option value="expense">지출</option>
          </select>

          <select
            v-model="modalTheme"
            class="modal-input"
            :disabled="!modalCategory"
          >
            <option disabled value="">Theme</option>

            <!-- <option
              v-for="theme in incomeCategory"
              :key="theme.id"
              :value="theme.name"
            >
              {{ theme.name }}
            </option>

            <option
              v-for="theme in expenseCategory"
              :key="theme.id"
              :value="theme.name"
            >
              {{ theme.name }}
            </option> -->
            <option v-if="modalCategory === 'income'" value="salary">
              월급
            </option>
            <option v-if="modalCategory === 'income'" value="allowance">
              용돈
            </option>
            <option v-if="modalCategory === 'income'" value="bonus">
              이자
            </option>
            <option v-if="modalCategory === 'income'" value="other">
              기타
            </option>

            <option v-if="modalCategory === 'expense'" value="food">
              식비
            </option>
            <option v-if="modalCategory === 'expense'" value="transportation">
              교통비
            </option>
            <option v-if="modalCategory === 'expense'" value="play">
              유흥
            </option>
            <option v-if="modalCategory === 'expense'" value="utility">
              공과금
            </option>
            <option v-if="modalCategory === 'expense'" value="shopping">
              쇼핑
            </option>
            <option v-if="modalCategory === 'expense'" value="hosipital">
              의료비
            </option>
            <option v-if="modalCategory === 'expense'" value="subscription">
              구독
            </option>
            <option v-if="modalCategory === 'expense'" value="other">
              기타
            </option>
          </select>
        </div>
      </div>

      <input
        v-model="modalAmount"
        type="number"
        placeholder="Amount"
        class="modal-input"
      />

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
.input-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.modal-input {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.category-theme {
  display: flex;
  gap: 8px;
  width: 100%;
}

textarea.modal-textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-top: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: none;
}

.modal-submit-btn {
  background-color: #0b570e;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-top: 10px;
}

.modal-title {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
