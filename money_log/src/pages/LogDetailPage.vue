<template>
  <div class="page-wrapper">
    <!-- BaseHeader를 다른 div로 감싸기 -->
    <div class="header-wrapper">
      <BaseHeader></BaseHeader>
    </div>

    <!-- 상세 내용 부분 -->
    <div class="content-wrapper">
      <h2>Detail Log</h2>
      <div class="log-detail-page">
        <div class="log-group">
          <!-- 항목 리스트 -->
          <LogDetailList></LogDetailList>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LogDetailList from '@/components/LogDetail/LogDetailList.vue';
import BaseHeader from '@/components/BaseHeader.vue';
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
}

.header-wrapper {
  width: 100%; /* BaseHeader가 화면 전체 너비를 차지하도록 설정 */
  padding: 12px 0;
}

.content-wrapper {
  width: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px; /* 화면 하단 여백 */
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
</style>
