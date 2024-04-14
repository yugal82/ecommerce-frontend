import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUserAsync, selectLoggedInUser } from '../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const Signup = () => {
  const dispatch = useDispatch();
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
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Create your new account
          </h2>
        </div>
        <form
          noValidate
          className="space-y-6 mt-6"
          onSubmit={handleSubmit((data) => {
            dispatch(createUserAsync({ email: data.email, password: data.password }));
            reset({ email: '', password: '', confirmPassword: '' });
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 font-semibold text-sm">{errors?.email?.message}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                {...register('password', {
                  required: 'Password is a mandatory field',
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    message: `- at least 8 characters\n
                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                    - Can contain special characters\n`,
                  },
                })}
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 font-semibold text-sm">{errors?.password?.message}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-white">
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                {...register('confirmPassword', {
                  required: 'Please confirm your password.',
                  validate: (value, formValue) => value === formValue.password || 'Password not matching',
                })}
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 font-semibold text-sm">{errors?.confirmPassword?.message}</p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm"
            >
              Create account
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{' '}
          <Link to="/login" className="font-semibold leading-6 text-primary hover:text-secondary">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
