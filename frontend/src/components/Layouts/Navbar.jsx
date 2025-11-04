import React, { useContext, useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { UserContext } from '../../context/UserContext';
import CharAvatar from '../Cards/CharAvatar';

const Navbar = ({ activeMenu }) => {
  const { user } = useContext(UserContext);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="sticky top-0 z-30 flex gap-5 border border-b border-gray-200/50 bg-white px-7 py-4 backdrop-blur-[2px]">
      <button
        className="block cursor-pointer text-black lg:hidden"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <div className="flex w-full items-center justify-between gap-2">
        <Link to="/dashboard">
          <img src="/images/Logo.webp" alt="Website Logo" width={160} className="cursor-pointer" />
        </Link>
        <div className="flex items-center justify-center gap-4">
          <p className="hidden text-sm text-gray-500 md:block">
            {moment().format('dddd, MMMM D, YYYY')}
          </p>

          {user?.profileImageUrl ? (
            <img
              src={user?.profileImageUrl}
              alt={user?.fullName}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <CharAvatar fullName={user?.fullName} width={8} height={8} />
          )}
        </div>
      </div>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
