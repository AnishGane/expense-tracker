import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Navbar = ({ activeMenu }) => {
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

      <div className='flex items-center gap-2 justify-between w-full'>
        <Link to="/dashboard">
          <img src="/images/Logo.webp" alt="Website Logo" width={160} className="cursor-pointer" />
        </Link>
        <p className="text-sm text-gray-500">{moment().format('dddd, MMMM D, YYYY')}</p>
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
