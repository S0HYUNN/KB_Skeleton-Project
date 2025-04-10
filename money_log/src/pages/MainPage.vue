<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import DailyMoneyLog from "@/components/DailyMoneyLog/DailyMoneyLog.vue";
import CustomCalendar from "@/components/CustomCalendar.vue";
import MonthlySummary from "@/components/MonthlySummary.vue";
import AddMoney from "@/pages/AddMoney.vue";
import BaseHeader from "@/components/BaseHeader.vue";
import SettingPanel from "@/components/SettingPanel.vue";
import axios from "axios";

const nickname = ref("Nickname");
const isModalOpen = ref(false);
const isSettingsOpen = ref(false);
const router = useRouter();

onMounted(async () => {
  try {
    // localStorage에서 userId 가져오기
    const userId = localStorage.getItem("userId");

    // userId가 없으면 Guest로 설정하고 API 호출 건너뛰기
    if (!userId) {
      console.log("사용자 ID가 없습니다. Guest로 설정합니다.");
      nickname.value = "Guest";
      return;
    }

    // API 호출하여 닉네임 가져오기
    const response = await axios.get(`http://localhost:3000/user/${userId}`);
    nickname.value = response.data.nickname;
    localStorage.setItem("nickname", response.data.nickname);
  } catch (error) {
    console.error("닉네임 가져오기 실패:", error);
    nickname.value = "Guest"; // 에러 발생 시 기본값 설정
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

const goToProfileEdit = () => {
  router.push("/UserProfileEdit");
};
</script>

<template>
  <div class="main-page">
    <BaseHeader
      :showBack="false"
      :showHome="false"
      :showSettings="true"
      @openSettings="
        () => {
          console.log('열기!');
          openSettings();
        }
      "
    />

    <div class="nickname-header">
      <div class="nickname-title">{{ nickname }}'s Log</div>
    </div>

    <DailyMoneyLog @start="openAddMoneyModal" />
    <CustomCalendar />
    <MonthlySummary />
    <AddMoney :show="isModalOpen" @close="closeAddMoneyModal" />
    <SettingPanel v-if="isSettingsOpen" @close="isSettingsOpen = false" />
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
  font-size: 26px;
  font-weight: bold;
  color: #0b570e;
  text-align: center;
  margin-top: -40px;
  margin-bottom: 4px;
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
