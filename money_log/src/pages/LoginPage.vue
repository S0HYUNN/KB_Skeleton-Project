<template>
  <div class="login-page">
    <div class="content-container">
      <div class="icon-container"></div>
      <img src="@/assets/images/note_icon.svg" alt="노트 아이콘" class="icon" />
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
import { useRouter } from 'vue-router'; // useRouter import
import axios from 'axios';
const router = useRouter(); // useRouter 사용
const logName = ref('');
const startLog = async () => {
  if (logName.value) {
    try {
      // 사용자 ID를 localStorage에서 가져오기 (예시)
      const userId = localStorage.getItem('userId');

      // 사용자 ID가 없으면 새로운 사용자를 생성하고 ID를 저장
      if (!userId) {
        // 새로운 사용자 생성 (POST)
        const createUserResponse = await axios.post(
          'http://localhost:3000/user',
          {
            nickname: logName.value,
          }
        );
        const newUserId = createUserResponse.data.id; // 새로 생성된 사용자 ID
        localStorage.setItem('userId', newUserId); // localStorage에 저장

        console.log('새로운 사용자 생성 성공:', createUserResponse.data);
        router.push('/');
        alert('로그 시작!');
      } else {
        // 기존 사용자 닉네임 업데이트 (PATCH)
        if (userId) {
          const response = await axios.patch(
            `http://localhost:3000/user/${userId}`,
            {
              nickname: logName.value,
            }
          );
          console.log('닉네임 업데이트 성공:', response.data);
        }
        router.push('/');
        alert('로그 시작!');
      }
    } catch (error) {
      console.error('닉네임 저장/업데이트 실패:', error);
      alert('닉네임 저장/업데이트에 실패했습니다.');
    }
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
