import { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import ProfilePhotoSelector from '../Inputs/ProfilePhotoSelector';
import moment from 'moment';
import { toast } from 'react-hot-toast';

const ProfileForm = () => {
  const { user, updateUser } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState(user?.profileImageUrl || null);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const getUserProfile = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.PROFILE.GET_USER_PROFILE);
      if (response.data && response.data.user) {
        updateUser(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let profileImageUrl = profileImage;

      if (profileImage instanceof File) {
        const imgUploadRes = await uploadImage(profileImage);
        profileImageUrl = imgUploadRes.imageUrl || '';
      }

      const response = await axiosInstance.put(API_PATHS.PROFILE.UPDATE_PROFILE, {
        fullName,
        profileImageUrl,
      });

      if (response.data && response.data.user) {
        updateUser(response.data.user);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsEdit(false);
    }
  };

  useEffect(() => {
    if (!user?._id) getUserProfile();
    else setLoading(false);
  }, [user]);

  return (
    <div className="flex w-full max-w-md">
      <form className="w-full space-y-4" onSubmit={updateUserProfile}>
        {/* Profile Section */}
        <div className="flex flex-col space-x-10 md:flex-row">
          <div className="place-self-start">
            <ProfilePhotoSelector image={profileImage} setImage={setProfileImage} />
          </div>

          <div className="flex-1">
            {/* Full Name */}
            <div className="mb-4 flex flex-col space-y-2">
              <label htmlFor="full-name" className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                id="full-name"
                onChange={(e) => setFullName(e.target.value)}
                readOnly={!isEdit}
                defaultValue={user?.fullName}
                className={`rounded-md border p-3 text-sm focus:outline-none ${
                  isEdit
                    ? 'border-purple-500 bg-white text-gray-900'
                    : 'cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500'
                }`}
              />
            </div>

            {/* Email */}
            <div className="mb-2 flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                defaultValue={user?.email}
                readOnly
                className="cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 p-3 text-sm text-gray-500"
              />
            </div>

            <p className="text-xs text-gray-500">
              Account Created on <span>{moment(user?.createdAt).format('MMM Do, YYYY')}</span>
            </p>

            <p className="text-xs text-gray-400">
              @{user?.fullName.trim().replace(/ /g, '').toLowerCase() || ''}
            </p>

            <div className="mt-6">
              {isEdit ? (
                <div className="flex items-center gap-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-primary/90 cursor-pointer rounded-md px-5 py-2 text-white disabled:opacity-60"
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>

                  <button
                    type="button"
                    className="cursor-pointer rounded-md bg-gray-300 px-5 py-2 hover:bg-gray-300/85"
                    onClick={() => {
                      setIsEdit(false);
                      setProfileImage(user?.profileImageUrl);
                      setFullName(user?.fullName || '');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="bg-primary hover:bg-primary/85 cursor-pointer rounded-md px-6 py-2 text-white"
                  onClick={() => setIsEdit(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
