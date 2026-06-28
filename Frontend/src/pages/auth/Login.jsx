import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../utils/authContext';
import { useNavigate } from 'react-router-dom';

const Login = ({ switchToSignup }) => {
  const { login:loginWithPassword,sendLoginOTP,loginWithOTP } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isOTPEmailSent, setIsOTPEmailSent] = useState(false); 
  const [isOTPMode, setIsOTPMode] = useState(false); 
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
    getValues
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      otp: '',
      role: 'patient'
    }
  });

  const selectedRole = watch('role');

  const handleSendOTP = async () => {
    const email = getValues('email');
    const role = getValues('role');

    if (!email) {
      setError('email', { type: 'manual', message: 'Email is required to send OTP.' });
      return;
    }

    // NOTE: Removed the client-side check "if (role === 'admin')" 
    // to enable Admin OTP flow, relying on backend validation.
    
    setLoading(true);
    clearErrors();

    try {
      // Calls POST /api/auth/send-login-otp which now supports all three roles
      const result = await sendLoginOTP(email, role); 
      
      if (result.success) {
        setIsOTPEmailSent(true);
        setError('root', {
          type: 'manual',
          message: `Login OTP sent to ${email}. Check your inbox.`,
        });
      } else {
        setError('root', {
          type: 'manual',
          // Backend will return an error if a user doesn't exist or is an invalid type
          message: result.error || 'Failed to send OTP. Please check email/role.', 
        });
      }
    } catch (err) {
      setError('root', {
        type: 'manual',
        message: 'An error occurred while sending OTP.',
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    clearErrors();

    try {
      let result;
      
      if (isOTPMode) {
        // Calls the new loginWithOTP function from useAuth, which must be updated
        // to handle the 'admin' role and call /login/admin-with-otp.
        result = await loginWithOTP(data.email, data.otp, data.role); 
      } else {
        // Calls standard POST /api/auth/login
        result = await loginWithPassword(data.email, data.password, data.role);
      }
      
      if (result.success) {
        navigate('/dashboard'); 
      } else {
        setError('root', {
          type: 'manual',
          message: result.error || 'Login failed. Invalid credentials or OTP.',
        });
      }
    } catch (err) {
      setError('root', {
        type: 'manual',
        message: 'An error occurred during login. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to your account to continue your wellness journey
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Role Selection */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
            I am a
          </label>
          <select
            {...register('role', { required: 'Role is required' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors appearance-none bg-white"
            onChange={() => {
              // Reset OTP mode when role changes
              setIsOTPMode(false);
              setIsOTPEmailSent(false);
              clearErrors('root');
            }}
          >
            <option value="patient">Patient</option>
            <option value="practitioner">Practitioner</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Please enter a valid email address'
              }
            })}
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Conditional Input Field (Password or OTP) */}
        {isOTPMode ? (
          // OTP Input
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
              Login OTP
            </label>
            <div className="flex space-x-2">
              <input
                {...register('otp', {
                  required: 'OTP is required',
                  minLength: {
                    value: 6,
                    message: 'OTP must be 6 digits'
                  },
                  maxLength: {
                    value: 6,
                    message: 'OTP must be 6 digits'
                  }
                })}
                type="text"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Enter 6-digit OTP"
                disabled={!isOTPEmailSent}
              />
              <button
                type="button"
                onClick={handleSendOTP}
                // Removed the "selectedRole === 'admin'" check from disabled prop
                disabled={loading} 
                className={`flex-shrink-0 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  isOTPEmailSent
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : 'bg-green-600 text-white hover:bg-green-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isOTPEmailSent ? 'Resend OTP' : 'Send OTP'}
              </button>
            </div>
            {errors.otp && (
              <p className="mt-1 text-sm text-red-600">{errors.otp.message}</p>
            )}
          </div>
        ) : (
          // Password Input
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:focus:border-green-500 transition-colors"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
        )}

        {/* Forgot Password / Toggle OTP */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => {
              setIsOTPMode(!isOTPMode);
              setIsOTPEmailSent(false); // Reset OTP status when switching modes
              clearErrors(['root', 'otp', 'password']);
            }}
            className="text-sm text-green-600 hover:text-green-500 transition-colors font-medium"
            // Removed the check that prevented Admin from switching back
          >
            {isOTPMode ? 'Switch to Password Login' : 'Login with OTP'}
          </button>
          
          {!isOTPMode && (
             <button
              type="button"
              className="text-sm text-green-600 hover:text-green-500 transition-colors"
              // TODO: Implement Forgot Password functionality here
            >
              Forgot your password?
            </button>
          )}
        </div>

        {/* Root Error */}
        {errors.root && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            <span className="text-sm">{errors.root.message}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || (isOTPMode && !isOTPEmailSent)}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Signing in...
            </div>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Switch to Signup */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={switchToSignup}
              className="text-green-600 hover:text-green-500 font-medium transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;