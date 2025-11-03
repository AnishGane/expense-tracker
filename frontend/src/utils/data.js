import { LuLayoutDashboard, LuHandCoins, LuWalletMinimal, LuUser } from 'react-icons/lu';
import { RiLightbulbLine } from 'react-icons/ri';

export const SIDE_MENU_DATA = [
  {
    id: '01',
    label: 'Dashboard',
    path: '/dashboard',
    icon: LuLayoutDashboard,
  },
  {
    id: '02',
    label: 'Income',
    path: '/income',
    icon: LuWalletMinimal,
  },
  {
    id: '03',
    label: 'Expense',
    path: '/expense',
    icon: LuHandCoins,
  },
  {
    id: '04',
    label: 'ExpenseForecast',
    path: '/expenseforecast',
    icon: RiLightbulbLine,
  },
  {
    id: '05',
    label: 'Insights',
    path: '/insights',
    icon: RiLightbulbLine,
  },
  {
    id: '06',
    label: 'Profile',
    path: '/profile',
    icon: LuUser,
  },
];
