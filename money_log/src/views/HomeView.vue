<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const moneyList = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/money');
    // const res = await axios.get('http://localhost:3000/money?date_gte=2025-04-01&date_lte=2025-04-03');
    moneyList.value = res.data;
    console.log('💰 가져온 가계부 데이터:', moneyList.value);
  } catch (err) {
    console.error('데이터를 불러오는데 실패했어요 😢', err);
  }
});
</script>

<template>
  <div>
    <h1>Nickname's Log</h1>
    <p>데이터 콘솔 확인해보세요!</p>
  </div>
</template>
