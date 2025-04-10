<template>
  <div class="page-wrapper">
    <BaseHeader
      :showBack="true"
      :showHome="true"
      :showSettings="true"
      @openSettings="openSettings"
    />
    <div class="content-wrapper">
      <h2>Detail Log</h2>
      <div class="log-detail-page">
        <div class="log-group">
          <LogDetailList />
        </div>
      </div>
    </div>
    <SettingPanel v-if="isSettingsOpen" @close="isSettingsOpen = false" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import LogDetailList from "@/components/LogDetail/LogDetailList.vue";
import BaseHeader from "@/components/BaseHeader.vue";
import SettingPanel from "@/components/SettingPanel.vue";

const isSettingsOpen = ref(false);
const openSettings = () => {
  isSettingsOpen.value = true;
};
</script>

<style scoped>
h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2e7d32;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1f1e8;
  width: 100%;
  min-width: 402px;
  max-width: 402px;
  min-height: 100vh;
  position: relative;
}

.content-wrapper {
  width: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
}

.log-detail-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.log-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

::v-deep(.nav-wrapper img[alt="뒤로가기"]) {
  position: absolute;
  top: 20px;
  left: 20px;
}

::v-deep(.right-buttons) {
  position: absolute;
  top: 20px !important;
  right: 20px !important;
  display: flex;
  gap: 12px;
}
</style>
