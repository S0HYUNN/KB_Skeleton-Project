<template>
  <div class="daily-log-card">
    <p class="log-title">DAILY MONEY LOG</p>
    <p class="log-subtext">
      오늘도 <span class="highlight">머니 로그</span> 완료?
    </p>
    <button class="start-button" @click="handleStartClick">START</button>
  </div>
</template>

<script setup>
const handleStartClick = () => {
  console.log('🟢 START 버튼 클릭됨');
};
</script>

<style scoped>
.daily-log-card {
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  padding: 16px 20px;
  text-align: center;
  width: 354px;
  height: 128px;
  margin: 32px auto 16px auto; /* 위로 조금 띄우고 아래 여유도 줌 */
  box-sizing: border-box;
}

.log-title {
  font-size: 18px;
  font-weight: 600;
  color: #0b570e;
  margin-bottom: 4px;
}

.log-subtext {
  font-size: 14px;
  color: #0b570e;
  font-weight: 600;
  margin-bottom: 12px;
}

.highlight {
  color: #dc9417;
  font-weight: bold;
}

.start-button {
  background-color: #0b570e;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.start-button:hover {
  background-color: #094821;
}
</style>
