<script setup>
import { ref } from 'vue';
import DailyMoneyLog2 from '@/components/DailyMoneyLog/DailyMoneyLog2.vue';
import MoneyList from '../components/MoneyList.vue';
import AddMoney from '@/pages/AddMoney.vue';
import PeriodMoney from './PeriodMoney.vue';
import TodayMoney from '@/components/TodayMoney.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import SettingPanel from '@/components/SettingPanel.vue';

const isModalOpen = ref(false);
const openModal = () => (isModalOpen.value = true);
const closeModal = () => (isModalOpen.value = false);

const isSettingsOpen = ref(false);
const openSettings = () => {
  isSettingsOpen.value = true;
};
</script>

<template>
  <div class="main-page">
    <BaseHeader
      :showBack="true"
      :showHome="false"
      :showSettings="true"
      @openSettings="openSettings"
    />
    <TodayMoney />
    <DailyMoneyLog2 @start="openModal" />

    <MoneyList />
    <AddMoney :show="isModalOpen" @close="closeModal" />
    <PeriodMoney />
    <SettingPanel v-if="isSettingsOpen" @close="isSettingsOpen = false" />
  </div>
</template>

<style scoped>
.main-page {
  background-color: #f1f1e8;
  width: 100%;
  min-width: 402px;
  max-width: 402px;
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
}

::v-deep(.nav-wrapper img[alt='뒤로가기']) {
  position: absolute;
  top: -25px;
  left: 20px;
}

::v-deep(.nav-wrapper) {
  position: relative;
  width: 100%;
  height: 15px;
}

::v-deep(.right-buttons) {
  position: absolute;
  top: -25px !important;
  right: 25px !important;
  display: flex;
  gap: 12px;
}
</style>
