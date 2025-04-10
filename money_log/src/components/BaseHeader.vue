<template>
  <div class="nav-wrapper">
    <img
      v-if="showBack"
      src="@/assets/images/back.png"
      alt="뒤로가기"
      class="nav-button"
      @click="goBack"
    />
    <div class="right-buttons">
      <img
        v-if="showHome"
        src="@/assets/images/home.png"
        alt="홈"
        class="nav-button"
        @click="goHome"
      />
      <img
        v-if="showSettings"
        src="@/assets/images/setting.png"
        alt="설정"
        class="nav-button"
        @click="emit('openSettings')"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const emit = defineEmits(["openSettings"]);
const router = useRouter();

defineProps({
  showBack: { type: Boolean, default: true },
  showHome: { type: Boolean, default: true },
  showSettings: { type: Boolean, default: true },
});

const goBack = () => router.back();
const goHome = () => router.push("/MainPage");
</script>

<style scoped>
.nav-wrapper {
  position: relative;
  width: 100%;
  height: 40px;
}

.right-buttons {
  position: absolute;
  top: -25px;
  right: 25px;
  display: flex;
  gap: 12px;
}

.nav-button {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
