<template>
  <div class="summary-container">
    <div class="summary-icon" @click="goToMoneyPage">
      <img :src="spendingIcon" alt="Spending Icon" />
    </div>
    <div class="summary-wrapper" v-if="summary">
      <div class="summary-title">이번 달 누적 수입/지출 요약</div>
      <div class="amount-row">
        <span class="income">💰 +{{ formatNumber(summary.income) }} 원</span>
        <span class="spending">🧾 -{{ formatNumber(summary.expense) }} 원</span>
      </div>
      <div class="total">
        TOTAL : {{ summary.net >= 0 ? "+" : "" }}{{ formatNumber(summary.net) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import spendingIcon from "@/assets/images/Spending.svg";

const summary = ref(null);
const router = useRouter();

const goToMoneyPage = () => {
  router.push("/Spending");
};

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:3000/summary");
    if (!response.ok) throw new Error("불러오기 실패");
    const data = await response.json();
    summary.value = data.monthly;
  } catch (error) {
    console.error("에러:", error);
  }
});

function formatNumber(num) {
  return num?.toLocaleString() ?? "0";
}
</script>

<style scoped>
.summary-container {
  position: relative;
  width: 100%;
  max-width: 362px;
}

.summary-wrapper {
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.summary-icon {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
}

.summary-icon img {
  width: 18px;
  height: 18px;
}

.summary-title {
  font-size: 15px;
  font-weight: 600;
  color: #0b570e;
  text-align: center;
}

.amount-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 14px;
  font-weight: 600;
}

.income {
  color: #3759e4;
  font-weight: bold;
}

.spending {
  color: #ff5748;
  font-weight: bold;
}

.total {
  font-size: 15px;
  font-weight: bold;
  color: #0b570e;
  text-align: center;
  border-top: 2px solid #0b570e;
  padding-top: 4px;
}
</style>
