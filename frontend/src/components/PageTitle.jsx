import { useEffect } from 'react';

const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = `${title} - Expense Tracker`;
  }, [title]);

  return null;
};

export default PageTitle;
