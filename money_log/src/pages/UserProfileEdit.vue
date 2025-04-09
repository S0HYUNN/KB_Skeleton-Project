<template>
  <div class="profilEdit-page">
    <div class="content-container">
      <div class="icon-container"></div>
      <img src="@/assets/images/note_icon.svg" alt="노트 아이콘" class="icon" />
      <h1 class="title">회원 정보 수정</h1>
      <h2 class="subtitle">새로운 이름으로 Money Log를 <br />이어가볼까요?</h2>
      <input
        type="text"
        v-model="name"
        placeholder="10글자 이내로 입력해주세요"
        maxlength="10"
        class="input-field"
      />
      <button @click="save" class="save-button">저장하기</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const name = ref('');

    const save = () => {
      // 저장 로직을 여기에 추가
      alert(`저장된 이름: ${name.value}`);
    };

    return {
      name,
      save,
    };
  },
});
</script>

<style scoped>
.profilEdit-page {
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
  margin-left: 100px;
}

.icon-container {
  margin-top: -80px;
  width: 106px;
  height: 92px;
  margin-bottom: 20px;
}

.title {
  font-size: 28px;
  font-weight: 800;
  color: #0a630e;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 18px;
  color: #0a630e;
  margin-bottom: 20px;
  font-weight: 600;
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

.save-button {
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

.save-button:hover {
  background-color: #276b2a;
}
</style>
