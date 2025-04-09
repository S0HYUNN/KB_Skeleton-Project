<template>
    <RouterView />
  </template>
  
  <script setup>
  
  import { RouterView, RouterLink } from 'vue-router';
  import { useMoneyStore } from './stores/money';
  
  const store = useMoneyStore;
  </script>