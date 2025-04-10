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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const router = useRouter();
const logName = ref('');

onMounted(() => {
  const storedUserId = localStorage.getItem('userId');
  if (!storedUserId) {
    const newUserId = uuidv4();
    localStorage.setItem('userId', newUserId);
    console.log('새로운 userId 생성:', newUserId);
  }
});

const startLog = async () => {
  if (logName.value) {
    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('userId가 localStorage에 없습니다.');
        alert('오류가 발생했습니다. 다시 시도해주세요.');
        return;
      }

      // 사용자 ID가 있는지 확인하기 위해 서버에 GET 요청을 보냅니다.
      try {
        const userCheckResponse = await axios.get(
          `http://localhost:3000/user/${encodeURIComponent(String(userId))}`,
          {
            validateStatus: function (status) {
              return status >= 200 && status < 500; // 200 ~ 499 상태 코드는 성공으로 처리
            },
          }
        );

        // 만약 사용자 ID가 없으면 새로운 사용자를 POST 합니다.
        if (userCheckResponse.status === 404) {
          console.log('GET 404: 사용자를 찾을 수 없음');
          // 새로운 사용자 생성 (POST)
          const createUserResponse = await axios.post(
            'http://localhost:3000/user',
            {
              id: userId, // UUID를 id로 사용
              nickname: logName.value,
            }
          );
          console.log('새로운 사용자 생성 성공:', createUserResponse.data);
          router.push('/MainPage');
          alert('로그 시작!');
        } else if (userCheckResponse.status === 200) {
          // 기존 사용자 닉네임 업데이트 (PATCH)
          const response = await axios.patch(
            `http://localhost:3000/user/${userId}`,
            {
              nickname: logName.value,
            }
          );
          console.log('닉네임 업데이트 성공:', response.data);
          router.push('/MainPage');
          alert('로그 시작!');
        } else {
          console.error('GET 요청 실패:', userCheckResponse.status);
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      } catch (getError) {
        console.error('GET 요청 실패:', getError);
        if (getError.response) {
          console.error('GET 요청 실패 응답:', getError.response); // 응답 내용 출력
        }
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('전체 오류:', error); // 전체 오류 출력
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
  margin-top: 300px;
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
