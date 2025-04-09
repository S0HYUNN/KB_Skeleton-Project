<template>
  <div class="spend-page">
    <h1>Spending Log</h1>
    <div class="circle-card log-card">
      <div class="circle-header">4월 지출</div>
      <div class="circle-wrapper">
        <div class="income-text">총 수입<br /><span>+1,250,000</span></div>

        <div class="donut-chart">
          <div class="center-text">순수익<br />+9825</div>
        </div>
        <div class="spend-text">총 지출<br /><span>-382,000</span></div>
      </div>
    </div>

    <div class="log-card">
      <div class="spend-title">
        최근 지출 Log
        <div class="first">20일 옷쇼핑 <span class="expend">-60,000</span></div>
        <div class="second">
          20일 옷쇼핑 <span class="expend">-60,000</span>
        </div>
        <div class="thrid">20일 옷쇼핑 <span class="income">-60,000</span></div>
      </div>
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

.income-text {
  font-family: Bold;
  left: -15px;
  color: #4169e1; /* 로얄 블루 */
}

.spend-text {
  right: -14px;
  color: #ff4c4c;
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
