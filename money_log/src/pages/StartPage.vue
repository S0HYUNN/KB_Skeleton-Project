<template>
  <div class="start-page">
    <div class="content-container">
      <div class="icon-container"></div>
      <img src="@/assets/money_icon.svg" alt="Money Icon" class="money-icon" />
      <h1 class="main-title">반가워요!</h1>
      <h2 class="sub-title">당신만의 Money Log를<br />시작해볼까요?</h2>
      <p class="description">
        편하게 시작하고<br />기록은 저희가 도와드릴게요!
      </p>
      <div class="image-wrapper">
        <img
          src="@/assets/money_image.png"
          alt="Money Image"
          class="money-image"
        />
      </div>
      <button class="next-button" @click="goToNextStep">다음으로</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const router = useRouter();

    const goToNextStep = () => {
      router.push('/next-page');
    };

    return {
      goToNextStep,
    };
  },
});
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
  margin: 0 auto;
}

.icon-container {
  margin-top: 8px;
  margin-bottom: -50px;
}

.main-title {
  font-size: 26px;
  font-weight: 600;
  color: #0a630e;
  margin-bottom: -5px;
  margin-top: -30px;
}

.sub-title {
  font-size: 25px;
  font-weight: 780;
  color: #0a630e;
  margin-bottom: -5px;
  line-height: 1.2;
}

.description {
  font-size: 13px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 15px;
  margin-top: 20px;
  line-height: 1.2;
}

.money-icon {
  width: 136px;
  height: 136px;
  margin-bottom: 10px;
}

.image-wrapper {
  text-align: center; /* 이미지 중앙 정렬 */
  margin-left: -30px;
}

.money-image {
  width: 330px; /* 필요에 따라 조정 */
  height: auto;
  margin: 0 auto; /* 중앙 정렬 */
  display: block; /* 블록 요소로 변경 */
}

.next-button {
  background-color: #276b2a;
  color: #dedcdc;
  border: none;
  border-radius: 13px;
  width: 326px;
  height: 52px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 26px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  margin-left: -28px;
}

.next-button:hover {
  background-color: #276b2a;
}
</style>
