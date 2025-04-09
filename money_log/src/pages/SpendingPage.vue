<template>
  <div class="main-layout">
    <h1>Spending Log</h1>
    <div class="log-card">
      <div class="chart-wrapper">
        <div class="circle-header">{{ months }}월달 요약</div>

        <!-- 도넛 차트와 중앙 텍스트 -->
        <div class="chart-center-box">
          <DoughnutChart :data="chartData" :options="chartOptions" />
          <div class="center-text">
            순이익<br />
            <strong>{{ net.toLocaleString() }}원</strong>
          </div>
        </div>

        <!-- 오른쪽 텍스트 -->
        <div class="bottom-text">
          <div class="income-text">
            총 수입: {{ income.toLocaleString() }}원
          </div>
          <div class="expense-text">
            총 지출: {{ expense.toLocaleString() }}원
          </div>
        </div>
      </div>
    </div>
    <div class="recent-logs-card">
      <h2 class="title">최근 지출 Log</h2>
      <ul>
        <li v-for="log in recentLogs" :key="log.id" class="log-item">
          <span class="date">{{ new Date(log.date).getDate() }}일</span>
          <span class="content">{{ log.content }}</span>
          <span
            class="amount"
            :class="log.category === 'income' ? 'income' : 'expense'"
          >
            {{ log.category === 'income' ? '+' : '-' }}
            {{ log.amount.toLocaleString() }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useMoneyStore } from '../stores/money';

ChartJS.register(ArcElement);

const store = useMoneyStore();

const income = ref(0);
const expense = ref(0);
const net = ref(0);
const months = ref(0);

onMounted(async () => {
  await store.fetchMoneyLogs(); //데이터 불러오기

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; //현재 년도와 월 불러오기

  const summary = store.getMonthlySummary(year, month);
  income.value = summary.income;
  expense.value = summary.expense;
  net.value = summary.net;

  months.value = month;
});

const chartData = computed(() => ({
  datasets: [
    {
      label: '이번 달 요약',
      data: [income.value, expense.value],
      backgroundColor: ['#4D59FF', '#FF8548'],
      borderColor: ['#4D59FF', '#FF8548'],
      borderWidth: 1,
    },
  ],
}));

// 차트 옵션
const chartOptions = {
  responsive: true,
  cutout: '65%',
};

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = Doughnut;
</script>
<style scoped>
.main-layout {
  padding: 20px;
  background-color: #f1f1e8;
  width: 18rem;
}

.spend-page h1 {
  margin-bottom: 20px;
  color: #2e7d32;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
}

.circle-header {
  font-size: 18px;
  font-weight: bold;
  color: #228b22; /* 진한 초록 */
  margin-bottom: 10px;
}

.log-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  padding: 20px;
  width: 100%;
  max-width: 350px;
  text-align: center;
  margin-bottom: 24px;
  flex: 1;
  justify-content: center;
}

.spend-title > div {
  background-color: #f5f5f5;
  border-top: solid 1px black;
  padding: 10px;
}
.first {
  margin-top: 10px;
}

.expense-text {
  color: #ff5748;
}
.income-text {
  color: #5864ff;
}

.chart-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 700px;
  margin: 0 auto;
  gap: 1.2rem;
}

.chart-center-box {
  position: relative;
  width: 150px;
  height: 150px;
  aspect-ratio: 1 / 1;
}

.center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 0.8rem;
  font-weight: bold;
  color: #111;
}

.bottom-text {
  width: 130px;
  text-align: center;
  font-size: 0.85rem;
  line-height: 1.4;
}
</style>
