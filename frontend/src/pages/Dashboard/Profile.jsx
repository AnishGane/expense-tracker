import React, { useContext } from 'react';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { LuLogOut } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import ProfileForm from '../../components/Profile/ProfileForm';
import PageTitle from '../../components/PageTitle';

const Profile = () => {
  const navigate = useNavigate();
  const { clearUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  return (
    <DashboardLayout activeMenu="Profile">
      <PageTitle title="Profile" />
      <div className="mx-auto my-5">
        <div className="card bg-red-400">
          <div className="flex items-center justify-between">
            <h2>Profile</h2>
            <button
              onClick={handleLogout}
              className="bg-primary hover:bg-primary/80 flex cursor-pointer items-center justify-center gap-2 rounded-md px-5 py-2 text-white"
            >
              <LuLogOut size={18} />
              Logout
            </button>
          </div>

          <div className="mt-6">
            <ProfileForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
