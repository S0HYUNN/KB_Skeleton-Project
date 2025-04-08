<template>
  <div class="start-page">
    <div class="content-container">
      <img src="@/assets/money_icon.svg" alt="Money Icon" class="money-icon" />
      <h1 class="main-title">반가워요!</h1>
      <h2 class="sub-title">당신만의 Money Log를<br />시작해볼까요?</h2>
      <p class="description">
        편하게 시작하고<br />기록은 저희가 도와드릴게요!
      </p>
      <img
        src="@/assets/money_image.png"
        alt="Money Image"
        class="money-image"
      />
      <button class="next-button" @click="goToNextStep">다음으로</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToNextStep() {
      this.$router.push('/next-page');
    },
  },
};
</script>

<style scoped>
.start-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f5f5dc;
}

.content-container {
  text-align: center;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.main-title {
  font-size: 28px;
  font-weight: 600;
  color: #0a630e;
  margin-bottom: 10px;
}

.sub-title {
  font-size: 24px;
  font-weight: 600;
  color: #0a630e;
  margin-bottom: 20px;
}

.description {
  font-size: 14px;
  color: #000000;
  margin-bottom: 20px;
}

.money-icon {
  width: 136px;
  height: 136px;
  margin-bottom: 10px;
}

.money-image {
  width: 100%;
  max-width: 331px;
  height: auto;
  margin-bottom: 20px;
}

.next-button {
  background-color: #276b2a;
  color: #dedcdc;
  border: none;
  border-radius: 5px;
  width: 326px;
  height: 52px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 26px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
}

.next-button:hover {
  background-color: #218838;
}
</style>
