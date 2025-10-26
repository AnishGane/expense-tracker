import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === 'logout') {
      handleLogout();
      return;
    }

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  return (
    <div className="sticky top-0 z-20 min-h-screen w-64 border-r border-gray-200 bg-white p-5">
      <div className="mt-3 mb-7 flex flex-col items-center justify-center gap-3">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="user profile"
            className="size-20 rounded-full bg-slate-400 object-cover"
          />
        ) : (
          <CharAvatar fullName={user?.fullName} width="w-20" height="h-20" style="text-xl" />
        )}
        <div className="text-center">
          <h5 className="leading-6 font-medium text-gray-950">{user?.fullName || ''}</h5>
          <p className="text-xs text-gray-400">
            @{user?.fullName.trim().replace(/ /g, '').toLowerCase() || ''}
          </p>
        </div>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={index}
          onClick={() => handleClick(item.path)}
          className={`mb-3 flex w-full cursor-pointer items-center gap-4 rounded-sm px-6 py-3 text-[15px] ${
            activeMenu === item.label
              ? 'bg-primary text-white'
              : 'transition-all duration-300 hover:bg-gray-200/50'
          }`}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
      <div className="absolute bottom-24 px-5 text-center md:bottom-7">
        <p className="text-[15px]">{user?.email}</p>
        <code className="text-sm text-gray-600">&lt; Be Happy & Code /&gt;</code>
      </div>
    </div>
  );
};

export default SideMenu;
