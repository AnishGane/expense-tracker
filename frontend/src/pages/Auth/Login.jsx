import React, { useContext, useState } from 'react';
import AuthLayout from '../../components/Layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    setError('');

    // Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        console.log(user);
        updateUser(user);
        navigate('/dashboard');
        toast.success('Logged in successfully');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong while logging in. Please try again.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className="flex h-3/4 flex-col justify-center md:h-full lg:w-[70%]">
        <h3 className="text-3xl font-medium text-black">Welcome Back</h3>
        <p className="mt-[5px] mb-6 text-sm text-slate-700">Please enter your details to log in</p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="e.g: johndoe@gmail.com"
            type="email"
            label="Email Address"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Min of 8 characters"
            type="password"
            label="Password"
          />

          {error && <p className="pb-2.5 text-sm text-red-500">{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p className="mt-3 text-[13px] text-slate-800">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-semibold underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
