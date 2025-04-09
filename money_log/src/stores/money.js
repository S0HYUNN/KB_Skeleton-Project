import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useMoneyStore = defineStore('money', () => {
  const moneyList = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const periodicExpenseList = ref([]); //고정 지출용 ref 추가

  // error 초기화 함수
  const resetError = () => {
    error.value = null;
  };

  // action: 전체 가계부 항목 불러오기
  const fetchMoneyLogs = async (params = {}) => {
    isLoading.value = true;
    resetError();
    try {
      const res = await axios.get('/api/money', { params });
      moneyList.value = res.data;
    } catch (err) {
      error.value = '가계부 데이터를 불러오지 못했어요.';
      console.error('🚨 fetch 에러:', err);
    } finally {
      isLoading.value = false;
    }
  };
  // 고정 지출 데이터 가져오기
  const fetchPeriodicExpenses = async () => {
    const res = await axios.get('/api/periodicExpense');
    periodicExpenseList.value = res.data;
  };

  // action: 항목 추가
  const addMoneyLog = async (newItem) => {
    resetError();
    try {
      const res = await axios.post('/api/money', newItem);
      moneyList.value.push(res.data);
    } catch (err) {
      error.value = '항목 추가에 실패했어요.';
    }
  };

  // action: 항목 삭제
  const deleteMoneyLog = async (id) => {
    resetError();
    try {
      await axios.delete(`/api/money/${id}`);
      moneyList.value = moneyList.value.filter((item) => item.id !== id);
    } catch (err) {
      error.value = '삭제 실패했어요.';
    }
  };

  // action: 항목 수정
  const updateMoneyLog = async (id, updatedItem) => {
    resetError();
    try {
      const res = await axios.put(`/api/money/${id}`, updatedItem);
      const index = moneyList.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        moneyList.value[index] = res.data;
      } else {
        console.warn(`❗수정하려는 항목(id: ${id})을 찾을 수 없습니다.`);
      }
    } catch (err) {
      error.value = '수정에 실패했어요.';
    }
  };
  // 고정 지출 추가 함수
  const addPeriodicExpense = async (newItem) => {
    try {
      const res = await axios.post('/api/periodicExpense', newItem);
      periodicExpenseList.value.push(res.data);
    } catch (err) {
      console.error('❌ 고정 지출 추가 실패:', err);
    }
  };
  // 고정 지출 삭제 함수
  const deletePeriodicExpense = async (id) => {
    try {
      await axios.delete(`/api/periodicExpense/${id}`);
      periodicExpenseList.value = periodicExpenseList.value.filter(
        (item) => item.id !== id
      );
    } catch (err) {
      console.error('❌ 고정 지출 삭제 실패:', err);
    }
  };

  // ✅ 월별 항목 조회
  const getLogsByMonth = (year, month) => {
    return moneyList.value.filter((item) => {
      const date = new Date(item.date);
      return date.getFullYear() === year && date.getMonth() + 1 === month;
    });
  };

  // ✅ 월별 총합 계산
  const getMonthlySummary = (year, month) => {
    const logs = getLogsByMonth(year, month);
    const income = logs
      .filter((i) => i.category === 'income')
      .reduce((sum, cur) => sum + cur.amount, 0);
    const expense = logs
      .filter((i) => i.category === 'expense')
      .reduce((sum, cur) => sum + cur.amount, 0);
    return {
      income,
      expense,
      net: income - expense,
    };
  };

  // ✅ 날짜별 그룹핑 (예: 캘린더용)
  const groupByDate = computed(() => {
    const grouped = {};
    moneyList.value.forEach((item) => {
      const date = item.date.slice(0, 10); // yyyy-mm-dd
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
    });
    return grouped;
  });

  // ✅ 날짜 기준 정렬 (최신이 위로)
  const sortedByDate = computed(() => {
    return [...moneyList.value].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  });

  return {
    moneyList,
    isLoading,
    error,
    fetchMoneyLogs,
    fetchPeriodicExpenses,
    addMoneyLog,
    deleteMoneyLog,
    updateMoneyLog,
    getLogsByMonth,
    getMonthlySummary,
    groupByDate,
    sortedByDate,
    periodicExpenseList,
    addPeriodicExpense,
    deletePeriodicExpense,
  };
});
