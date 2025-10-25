import React from 'react';
import StatsInfoCard from '../StatsInfoCard';
import { LuTrendingUpDown } from 'react-icons/lu';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Heading and the Login & Signup Content */}
      <div className="h-screen w-screen px-12 pt-8 pb-12 md:w-[60vw]">
        <h2 className="text-lg font-semibold text-black">Expense Tracker</h2>
        {children}
      </div>

      {/* Right side container with image */}
      <div className="relative hidden h-screen w-[40vw] overflow-hidden bg-violet-50 bg-cover bg-center bg-no-repeat p-8 md:block">
        <div className="absolute -top-7 -left-5 h-48 w-48 rounded-[40px] bg-purple-600"></div>
        <div className="absolute top-[30%] -right-10 h-56 w-48 rounded-[40px] border-[20px] border-fuchsia-600"></div>
        <div className="absolute -bottom-7 -left-5 h-48 w-48 rounded-[40px] bg-purple-600"></div>

        <div className="z-20 grid grid-cols-1">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Expenses and Incomes"
            value="430,000"
            color="bg-primary"
          />
        </div>

        <img
          src="/images/cardImage.webp"
          className="absolute bottom-10 w-64 shadow-lg shadow-blue-400/15 lg:w-[90%]"
          alt="bg-auth-img"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
