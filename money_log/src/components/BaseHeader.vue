<template>
  <div class="nav-wrapper">
    <!-- 뒤로가기(왼쪽) -->
    <img
      src="@/assets/back.png"
      alt="뒤로가기"
      class="nav-button"
      @click="goBack"
    />

    <!-- 홈,설정(오른쪽) -->
    <div class="right-buttons">
      <img
        src="@/assets/home.png"
        alt="홈"
        class="nav-button"
        @click="goHome"
      />
      <img
        src="@/assets/setting.png"
        alt="설정"
        class="nav-button"
        @click="goSettings"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back();
};

const goHome = () => {
  router.push('/');
};

const goSettings = () => {
  //설정 페이지
};
</script>

<style scoped>
.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
}

.right-buttons {
  display: flex;
  gap: 12px;
}

.nav-button {
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
}
</style>
