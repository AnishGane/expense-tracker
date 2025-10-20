import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/Layouts/AuthLayout';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
  };
  return (
    <AuthLayout>
      <div className="mt-10 flex h-auto flex-col justify-center md:mt-0 md:h-full lg:w-[75%]">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
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
