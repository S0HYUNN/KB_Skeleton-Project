<!-- components/SettingPanel.vue -->
<template>
  <div class="settings-overlay" @click.self="$emit('close')">
    <div class="settings-panel">
      <h2 class="settings-title">Setting Log</h2>
      <div class="setting-item" @click="goToProfileEdit">
        <span class="icon">⚙️</span>
        <span class="label">프로필 설정</span>
        <span class="arrow">&gt;</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goToProfileEdit = () => {
  router.push("/UserProfileEdit");
};
</script>

<style scoped>
.settings-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
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
  max-width: 402px;
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
