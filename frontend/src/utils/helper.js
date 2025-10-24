import moment from 'moment';

export const validateEmail = (email) => {
  const regex =
    /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,63})@[A-Za-z](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])(?:\.[A-Za-z]{2,})+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return;

  const words = name.split(' ');
  let initials = '';
  for (let i = 0; i < words.length; i++) {
    initials += words[i].charAt(0).toUpperCase();
  }
  return initials;
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return '';

  const [integerPart, fractionalPart] = num.toString().split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};

export const prepareExpenseChartData = (data = []) => {
  if (!data.length) return [];

  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item, index) => ({
    // Make label unique (date + short category or index)
    month: `${moment(item.date).format('Do MMM')} (${item.category.slice(0, 4)})`,
    amount: Number(item.amount),
    category: item.category,
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  if (!data.length) return [];

  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item, index) => ({
    // Make label unique (date + short category or index)
    month: `${moment(item.date).format('Do MMM')} (${item.source.slice(0, 3)})`,
    amount: Number(item.amount),
    source: item.source,
  }));

  return chartData;
};
