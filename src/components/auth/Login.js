import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, selectError, selectLoggedInUser } from '../../features/auth/authSlice';
import Footer from '../Footer';

const Login = () => {
  const dispatch = useDispatch();
  const loginError = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className="p-6 lg:px-8">
        {user && <Navigate to="/" replace={true} />}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Log in to your account
            </h2>
          </div>
          <form
            className="space-y-6 mt-6"
            onSubmit={handleSubmit((data) => {
              dispatch(loginAsync(data));
              reset({ email: '', password: '' });
            })}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email', { required: 'Email is a mandatory field' })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
                />
                <p className="text-red-500 font-semibold text-sm">{errors?.email?.message}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-semibold text-primary hover:text-secondary">
                    Forgot password?
                  </Link>
                </div>
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
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
                />
                <p className="text-red-500 font-semibold text-sm">{errors?.password?.message}</p>
                {loginError && <p className="text-red-500 font-semibold text-sm">{loginError}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
              >
                Log in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-primary hover:text-secondary">
              Create an account
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
