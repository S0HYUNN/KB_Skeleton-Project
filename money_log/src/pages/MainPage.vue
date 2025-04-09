<script setup>
import DailyMoneyLog from '@/components/DailyMoneyLog';
</script>

<template>
  <div class="main-page">
    <DailyMoneyLog />
  </div>
</template>

<style scoped>
.main-page {
  background-color: #f1f1e8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
}
</style>
