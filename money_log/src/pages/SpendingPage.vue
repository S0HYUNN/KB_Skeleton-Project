<template>
  <div class="main-layout">
    <h1>Spending Log</h1>
    <div class="log-card">
      <div class="chart-wrapper">
        <div class="circle-header">이번 달 요약</div>

        <!-- 도넛 차트와 중앙 텍스트 -->
        <div class="chart-center-box">
          <div class="center-text">순이익<br /></div>
        </div>

        <!-- 오른쪽 텍스트 -->
        <div class="bottom-text">
          <div class="income-text"></div>
          <div class="expense-text"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="log-card">
    <div class="spend-title">
      최근 지출 Log
      <div class="first">20일 옷쇼핑 <span class="expend">-60,000</span></div>
      <div class="second">20일 옷쇼핑 <span class="expend">-60,000</span></div>
      <div class="thrid">20일 옷쇼핑 <span class="income">-60,000</span></div>
    </div>
  </div>
</template>

<style scoped>
.spend-page {
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

.circle {
  width: 116px;
  height: 113px;
  background-color: #eee;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.circle-card {
  width: 250px;
  border-radius: 16px;
  padding: 16px;
  text-align: center;
}

.circle-header {
  font-size: 18px;
  font-weight: bold;
  color: #228b22; /* 진한 초록 */
  margin-bottom: 10px;
}

.circle-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.income-text,
.spend-text {
  position: absolute;
  top: 5%;
  transform: translateY(-50%);
  font-size: 13px;
  font-weight: bold;
  white-space: nowrap;
}

.income-text {
  font-family: Bold;
  left: -15px;
  color: #4169e1; /* 로얄 블루 */
}

.spend-text {
  right: -14px;
  color: #ff4c4c;
}

.income-text span,
.spend-text span {
  font-size: 14px;
}

.donut-chart {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: conic-gradient(#4169e1 70%, #ff7f50 30%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.donut-chart::before {
  content: '';
  width: 90px;
  height: 90px;
  background-color: #f8f8f8;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
}

.center-text {
  position: relative;
  z-index: 2;
  font-weight: bold;
  font-size: 14px;
  line-height: 1.4;
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

.spend-title {
  color: #2e7d32;
}

.spend-title > div {
  background-color: #f5f5f5;
  border-top: solid 1px black;
  padding: 10px;
}
.first {
  margin-top: 10px;
}

.expend {
  color: #ff5748;
}
.income {
  color: #5864ff;
}
</style>
