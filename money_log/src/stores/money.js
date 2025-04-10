import { defineStore } from 'pinia';
import { ref, computed, onMounted } from 'vue';
import { useDateStore } from '@/stores/date';
import axios from 'axios';

export const useMoneyStore = defineStore('money', () => {
  const moneyList = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const periodicExpenseList = ref([]);
  const dateStore = useDateStore();
  const incomeCategory = ref([]);
  const expenseCategory = ref([]);

  // error 초기화 함수
  const resetError = () => {
    error.value = null;
  };

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

  const fetchPeriodicExpenses = async () => {
    const currentYear = dateStore.currentDate.getFullYear();
    const currentMonth = String(dateStore.currentDate.getMonth() + 1).padStart(
      2,
      '0'
    );
    try {
      periodicExpenseList.value = [];
      const res = await axios.get('/api/periodicExpense', {
        params: { year: currentYear, month: currentMonth },
      });
      console.log('받은 고정 지출 데이터:', res.data);
      periodicExpenseList.value = res.data;
    } catch (err) {
      console.error('❌ 고정 지출 데이터 불러오기 실패:', err);
    }
    const res = await axios.get('/api/periodicExpense');
    periodicExpenseList.value = res.data;
  };

  const addMoneyLog = async (newItem) => {
    resetError();
    try {
      await axios.post('/api/money', newItem);
      await fetchMoneyLogs();
    } catch (err) {
      error.value = '항목 추가에 실패했어요.';
    }
  };

  const deleteMoneyLog = async (id) => {
    resetError();
    try {
      await axios.delete(`/api/money/${id}`);
      moneyList.value = moneyList.value.filter((item) => item.id !== id);
    } catch (err) {
      error.value = '삭제 실패했어요.';
    }
  };
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

  const addPeriodicExpense = async (newItem) => {
    try {
      const res = await axios.post('/api/periodicExpense', newItem);
      periodicExpenseList.value.push(res.data);
    } catch (err) {
      console.error('❌ 고정 지출 추가 실패:', err);
    }
  };
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

  const fetchCategories = async () => {
    try {
      const incomeRes = await axios.get('/api/incomeCategory');
      const expenseRes = await axios.get('/api/expenseCategory');

      incomeCategory.value = incomeRes.data;
      expenseCategory.value = expenseRes.data;

      console.log('수입 카테고리:', incomeCategory.value);
      console.log('지출 카테고리:', expenseCategory.value);
    } catch (err) {
      console.error('카테고리 로딩 실패:', err);
    }
  };
  fetchCategories;

  // 월별 항목 조회
  const getLogsByMonth = (year, month) => {
    return moneyList.value.filter((item) => {
      const date = new Date(item.date);
      return date.getFullYear() === year && date.getMonth() + 1 === month;
    });
  };

  // 월별 총합 계산
  const getMonthlySummary = (year, month) => {
    const logs = getLogsByMonth(year, month);

    const income = logs
      .filter((i) => i.category === 'income')
      .reduce((sum, cur) => sum + cur.amount, 0);

    const expense = logs
      .filter((i) => i.category === 'expense')
      .reduce((sum, cur) => sum + cur.amount, 0);

    // 고정 지출 합산 추가
    const periodicExpense = periodicExpenseList.value
      .filter((item) => {
        const date = new Date(item.date);
        return date.getFullYear() === year && date.getMonth() + 1 === month;
      })
      .reduce((sum, cur) => sum + cur.amount, 0);

    const totalExpense = expense + periodicExpense;

    return {
      income,
      expense: totalExpense,
      net: income - totalExpense,
    };
  };

  // 날짜별 그룹핑
  const groupByDate = computed(() => {
    const grouped = {};
    moneyList.value.forEach((item) => {
      const date = item.date.slice(0, 10);
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
    });
    return grouped;
  });

  // 날짜 기준 정렬 (최신이 위로)
  const sortedByDate = computed(() => {
    return [...moneyList.value].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  });

  onMounted(async () => {
    // 카테고리 데이터를 fetch
    await moneyStore.fetchCategories();
  });

  return {
    moneyList,
    isLoading,
    error,
    periodicExpenseList,
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
    incomeCategory,
    expenseCategory,
  };
});
