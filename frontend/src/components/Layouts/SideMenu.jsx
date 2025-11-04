import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <div className="sticky top-0 z-20 min-h-screen w-64 border-r border-gray-200 bg-white p-5">
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
        <p className="text-sm text-gray-800">{user?.fullName}</p>
        <p className="text-[15px] mb-8">{user?.email}</p>
        <code className="text-sm text-gray-600">&lt; Be Happy & Code /&gt;</code>
      </div>
    </div>
  );
};

export default SideMenu;
