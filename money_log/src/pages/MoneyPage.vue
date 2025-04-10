<script setup>
import { ref } from 'vue';
import DailyMoneyLog2 from '@/components/DailyMoneyLog/DailyMoneyLog2.vue';
import MoneyList from '../components/MoneyList.vue';
import AddMoney from '@/pages/AddMoney.vue';
import PeriodMoney from './PeriodMoney.vue';
import TodayMoney from '@/components/TodayMoney.vue';

const isModalOpen = ref(false);
const openModal = () => (isModalOpen.value = true);
const closeModal = () => (isModalOpen.value = false);
</script>

<template>
  <div class="main-page">
    <TodayMoney />
    <DailyMoneyLog2 @start="openModal" />

    <MoneyList />
    <AddMoney :show="isModalOpen" @close="closeModal" />
    <PeriodMoney />
  </div>
</template>

<style scoped>
.main-page {
  background-color: #f1f1e8;
  width: 100%;
  min-width: 402px;
  max-width: 402px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
}
</style>
