<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // ✅ 추가

import DailyMoneyLog from "@/components/DailyMoneyLog/DailyMoneyLog.vue";
import CustomCalendar from "@/components/CustomCalendar.vue";
import MonthlySummary from "@/components/MonthlySummary.vue";
import AddMoney from "@/pages/AddMoney.vue";

const nickname = ref("");
const isModalOpen = ref(false);
const isSettingsOpen = ref(false);
const router = useRouter(); // ✅ 라우터 인스턴스 생성

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:3000/user");
    if (!response.ok) throw new Error("닉네임 로딩 실패");
    const data = await response.json();
    nickname.value = data.nickname;
  } catch (error) {
    console.error("에러:", error);
  }
});

const openAddMoneyModal = () => {
  isModalOpen.value = true;
};
const closeAddMoneyModal = () => {
  isModalOpen.value = false;
};

const openSettings = () => {
  isSettingsOpen.value = true;
};
const closeSettings = () => {
  isSettingsOpen.value = false;
};

// ✅ 프로필 설정 페이지 이동
const goToProfileEdit = () => {
  router.push("/UserProfileEdit");
};
</script>

<template>
  <div class="main-page">
    <div class="nickname-header">
      <div class="nickname-title">{{ nickname }}'s Log</div>
      <img
        src="@/assets/images/setting.png"
        alt="설정"
        class="settings-icon"
        @click="openSettings"
      />
    </div>

    <DailyMoneyLog @start="openAddMoneyModal" />
    <CustomCalendar />
    <MonthlySummary />
    <AddMoney :show="isModalOpen" @close="closeAddMoneyModal" />
    <div
      v-if="isSettingsOpen"
      class="settings-overlay"
      @click.self="closeSettings"
    >
      <div class="settings-panel">
        <h2 class="settings-title">Setting Log</h2>
        <div class="setting-item" @click="goToProfileEdit">
          <span class="icon">⚙️</span>
          <span class="label">프로필 설정</span>
          <span class="arrow">&gt;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-page {
  background-color: #f1f1e8;
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 56px;
  gap: 18px;
  position: relative;
  overflow: hidden;
}

.nickname-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
}

.nickname-title {
  font-size: 25px;
  font-weight: bold;
  color: #0b570e;
  text-align: center;
  margin-top: 15px;
}

.settings-icon {
  position: absolute;
  top: -22px;
  right: 24px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.settings-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(74, 71, 71, 0.6);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.settings-panel {
  background-color: white;
  width: 70%;
  height: 100%;
  padding: 24px 16px;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.settings-title {
  font-size: 23px;
  font-weight: bold;
  color: #0b570e;
  margin-bottom: 24px;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dedcdc;
  padding: 12px 0;
  cursor: pointer;
}

.setting-item .icon {
  font-size: 18px;
  margin-right: 8px;
}

.setting-item .label {
  flex-grow: 1;
  color: #0b570e;
  font-weight: 600;
  font-size: 19px;
}

.setting-item .arrow {
  font-size: 18px;
  color: #aaa;
}
</style>
