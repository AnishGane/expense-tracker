import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, placeholder, className, type, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={`${className}`}>
      <label htmlFor={label} className="text-sm text-slate-800 dark:text-white">
        {label}
      </label>

      <div className="input-box">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e)}
          required
        />

        {type === 'password' && (
          <>
            {showPassword ? (
              <FaRegEyeSlash
                className="text-primary cursor-pointer"
                size={22}
                onClick={() => togglePassword()}
              />
            ) : (
              <FaRegEye
                className="text-primary cursor-pointer"
                size={22}
                onClick={() => togglePassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
