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

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));
  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.data).format('Do MMM'),
    amount: item?.amount,
    source: item?.source,
  }));
  return chartData;
};
