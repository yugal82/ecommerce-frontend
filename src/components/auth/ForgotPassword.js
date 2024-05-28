import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../features/auth/authSlice';

const ForgotPassword = () => {
  // const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className="p-6 lg:px-8 h-screen">
      {user && <Navigate to="/" replace={true} />}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">Forgot Password?</h2>
          <p className="text-center text-lg tracking-tight text-gray-300">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>
        <form
          className="space-y-6 mt-6"
          onSubmit={handleSubmit((data) => {
            reset({ email: '' });
          })}
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                {...register('email', {
                  required: 'Email is a mandatory field',
                  pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi, message: 'Email not valid' },
                })}
                type="email"
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 font-semibold text-sm">{errors?.email?.message}</p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
            >
              Send Email
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Know you password?{' '}
          <Link to="/login" className="font-semibold leading-6 text-primary hover:text-secondary">
            Log into your account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
