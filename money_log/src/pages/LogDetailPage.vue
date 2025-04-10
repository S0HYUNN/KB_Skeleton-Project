<!-- LogDetailFilter.vue -->
<template>
  <div class="main-page">
    <h2>Detail Log</h2>
    <div class="log-detail-page">
      <div class="log-group">
        <!-- 항목 리스트 -->
        <LogDetailList></LogDetailList>
      </div>
    </div>
  </div>
</template>

<script setup>
import LogDetailList from '@/components/LogDetail/LogDetailList.vue';
</script>

<style scoped>
h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2e7d32;
}

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
