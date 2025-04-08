<template>
  <div class="money-page">
    <!-- 날짜 타이틀 -->
    <div class="date-title">24 April 2025</div>

    <!-- DAILY MONEY LOG 카드 -->
    <div class="log-card">
      <p class="log-title">DAILY MONEY LOG</p>
      <p class="log-subtext">
        언제든 돌아볼 수 있게,
        <span class="highlight">머니 로그</span>에 기록해요
      </p>
      <button class="add-btn">ADD</button>
    </div>
  </div>
</template>

<script setup>
// 지금은 상단 UI만 구성 중!
</script>

<style scoped>
.money-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
}

.date-title {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 16px;
}

.log-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  padding: 20px;
  width: 90%;
  max-width: 350px;
  text-align: center;
  margin-bottom: 24px;
}

.log-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #1c4e32;
}

.log-subtext {
  font-size: 14px;
  color: #555;
  margin-bottom: 16px;
}

.highlight {
  color: 0B570E;
  font-weight: bold;
}

.add-btn {
  background-color: #1c4e32;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 14px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #16653f;
}
</style>
