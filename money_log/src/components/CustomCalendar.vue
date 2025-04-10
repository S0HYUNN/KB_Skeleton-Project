<template>
  <div class="calendar-wrapper">
    <div class="calendar-icon" @click="goToMoneyPage">
      <img src="@/assets/images/Calendar.svg" alt="Calendar Icon" />
    </div>
    <VCalendar
      v-model="currentDate"
      is-expanded
      :attributes="calendarAttrs"
      :show-title="true"
      :show-arrows="true"
      locale="en-US"
      :first-day-of-week="1"
      :masks="{ weekdays: 'WWW' }"
      :min-date="new Date('2025-01-01')"
      :max-date="new Date('2025-12-31')"
      class="v-calendar-core"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import 'v-calendar/style.css';

const router = useRouter();

const currentDate = ref(new Date());

const calendarAttrs = ref([
  {
    dates: { repeat: { weekdays: [2, 3, 4, 5, 6, 7] } },
    content: { style: { color: '#0B570E' } },
  },
  {
    dates: { repeat: { weekdays: [1] } },
    content: { style: { color: '#FF5748' } },
  },
  {
    dates: new Date(),
    highlight: {
      style: {
        backgroundColor: 'rgba(11, 87, 14, 0.3)',
        borderRadius: '60%',
        transform: 'scale(1.2)',
      },
    },
  },
]);

const goToMoneyPage = () => {
  router.push('/money');
};
</script>

<style scoped>
.calendar-wrapper {
  position: relative;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  padding: 16px;
  width: 362px;
  height: 400px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -8px;
}

.calendar-icon {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
}

.calendar-icon img {
  width: 18px;
  height: 18px;
}

.v-calendar-core {
  width: 100%;
  height: 100%;
}

:deep(.vc-pane) {
  border: none !important;
  border-radius: 20px;
}

:deep(.vc-title) {
  color: #0b570e;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
}

:deep(.vc-weekday) {
  color: #0b570e !important;
  font-weight: 600;
  font-size: 13px;
}

:deep(.vc-weekdays) {
  margin-bottom: 8px;
  position: relative;
  padding: 4px 0;
}

:deep(.vc-weekdays)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #dedcdc;
}

:deep(.vc-weekdays)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #dedcdc;
}

:deep(.vc-weeks) {
  row-gap: 10px !important;
  column-gap: 8px !important;
  padding: 0 6px !important;
  margin-top: 12px;
}

:deep(.vc-day-content) {
  font-size: 16px !important;
  padding: 10px 0 !important;
  width: 40px !important;
  height: 40px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.vc-title-wrapper),
:deep(.vc-arrows),
:deep(.vc-title),
:deep(.vc-arrow) {
  background-color: transparent !important;
  box-shadow: none !important;
}
</style>
