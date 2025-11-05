import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/Layouts/AuthLayout';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';
import { API_PATHS } from '../../utils/apiPaths';

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // handle the signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageUrl = '';

    if (!fullName) {
      setError('Full name is required.');
      return;
    }
    if (fullName.length < 3) {
      setError('Full name must be at least 3 characters long.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter valid email address.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setError('');

    // Sign Up API Call
    try {
      // Upload Image if Present
      if (profilePic) {
        try {
          const imgUploadRes = await uploadImage(profilePic);
          profileImageUrl = imgUploadRes.imageUrl || '';
        } catch (uploadError) {
          const errorMessage = uploadError?.message || 'Failed to upload profile image';
          setError(errorMessage);
          return; // Stop execution if image upload fails
        }
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl: profileImageUrl || '',
      });

      const { token, user } = response.data;
      if (token && user) {
        localStorage.setItem('token', token);
        updateUser(user);
        // Navigate to dashboard after successful signup (auto-login)
        navigate('/dashboard');
      } else {
        setError('Registration successful but login failed. Please try logging in.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Something went wrong while signing up. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <AuthLayout>
      <div className="mt-10 flex h-auto flex-col justify-center md:mt-0 md:h-full lg:w-[75%]">
        <h3 className="text-3xl font-medium text-black">Create an Account</h3>
        <p className="mt-[5px] mb-6 text-xs text-slate-700">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                placeholder="John Doe"
                type="text"
                label="Full Name *"
                className="md:w-1/2"
              />
              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                placeholder="e.g: johndoe@gmail.com"
                type="email"
                label="Email Address *"
                className="md:w-1/2"
              />
            </div>
            <div>
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                placeholder="Min of 8 characters"
                type="password"
                label="Password *"
              />
            </div>
          </div>

          {error && <p className="pb-2.5 text-sm text-red-500">{error}</p>}

          <button type="submit" className="btn-primary">
            SIGN UP
          </button>

          <p className="mt-3 text-[13px] text-slate-800">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
