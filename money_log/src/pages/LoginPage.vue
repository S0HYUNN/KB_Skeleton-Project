<template>
  <div class="login-page">
    <div class="content-container">
      <div class="icon-container"></div>
      <img src="@/assets/note_icon.svg" alt="노트 아이콘" class="icon" />
      <h2>나만의 머니로그, <br />어떻게 부를까요?</h2>
      <input
        type="text"
        v-model="logName"
        placeholder="10글자 이내로 입력해 주세요"
        maxlength="10"
        class="input-field"
      />
      <button @click="startLog" class="start-button">내 로그 시작!</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const logName = ref('');

const startLog = () => {
  if (logName.value) {
    // 로그 시작하는 로직을 여기에 추가
    console.log(`로그 시작: ${logName.value}`);
  } else {
    alert('로그 이름을 입력해 주세요.');
  }
};
</script>

<style scoped>
.start-page {
  max-width: 402px;
  margin: 0;
  padding: 0;
  background-color: #f1f1e8;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-container {
  text-align: center;
  padding: 40px;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  height: 741px;
  margin: 50px 100px;
  margin-left: 25px;
}

.icon-container {
  filter: drop-shadow(offset-x offset-y blur color);
  margin-top: -80px;
  width: 106px;
  height: 92px;
  margin-bottom: 20px;
}

h2 {
  font-size: 28px;
  font-weight: 800;
  color: #0a630e;
  margin-top: 20px;
  margin-bottom: 25px;
  line-height: 1.2;
}

.input-field {
  border: 2px solid #0b570e;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 16px;
  width: 331px;
  height: 62px;
  margin-left: -28px;
  border-radius: 13px;
  padding-left: 20px;
}
.input-field::placeholder {
  color: #9b9696;
}

.start-button {
  background-color: #276b2a;
  color: #f1f1e8;
  border: none;
  border-radius: 13px;
  width: 326px;
  height: 52px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 26px;
  margin-top: 290px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  margin-left: -28px;
}

.start-button:hover {
  background-color: #276b2a;
}
</style>
