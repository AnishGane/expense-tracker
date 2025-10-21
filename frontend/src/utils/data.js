import { LuLayoutDashboard, LuHandCoins, LuWalletMinimal, LuLogOut } from 'react-icons/lu';

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
    label: 'Logout',
    path: 'logout',
    icon: LuLogOut,
  },
];
