<template>
  <div class="main-layout">
    <BaseHeader />
    <h1 class="main-title">Spending Log</h1>
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

        <!-- 하단 텍스트 -->
        <div class="bottom-text">
          <div class="income">총 수입: {{ income.toLocaleString() }}원</div>
          <div class="expense">총 지출: {{ expense.toLocaleString() }}원</div>
        </div>
      </div>
    </div>
    <div class="log-card">
      <div class="spend-title">
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useMoneyStore } from '../stores/money';
import { storeToRefs } from 'pinia';
import BaseHeader from '@/components/BaseHeader.vue';

ChartJS.register(ArcElement);

const store = useMoneyStore();
const { sortedByDate } = storeToRefs(store); //날짜별로 정렬
const recentLogs = computed(() => sortedByDate.value.slice(0, 3)); //최근 지출 3개 선정

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

.main-title {
  text-align: center;
  margin-bottom: 10px;
  color: #2e7d32;
  font-weight: 600;
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
  padding: 10px;
}
.first {
  margin-top: 10px;
}

.expense {
  color: #ff5748;
}
.income {
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

/* -----최근 지출 log 스타일 시작 부분*/
.recent-logs-card {
  background-color: #ffffff;
  padding: 12px;
  width: 100%;
  font-family: 'Pretendard', sans-serif;
  background-color: #f1f1e8;
}

.spend-title > div {
  background-color: #ffffff;
  padding: 10px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #2e7d32;
  margin-bottom: 10px;
  text-align: left;
  border-bottom: 1px solid #dedcdc;
  padding-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.log-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dedcdc;
}

.log-item:last-child {
  border-bottom: none; /* 마지막 줄에는 선 없게 */
}

.date {
  color: #17893f;
  font-weight: 600;
  width: 36px;
}

.content {
  flex: 1;
  color: #2e7d32;
  margin-left: 4px;
  font-weight: 600;
}

.amount {
  font-weight: 500;
  min-width: 75px;
  text-align: right;
  font-weight: 600;
}
</style>
