// src/components/Auth/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../api/api';
import { IRegisterErrors, IRegisterFormData } from '../../utils/types';


const Register: React.FC = () => {
  const [formData, setFormData] = useState<IRegisterFormData>({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password1: '',
    password2: '',
  });

  const [errors, setErrors] = useState<IRegisterErrors>({});
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = await registerUser(formData).unwrap();
      if (data.status === 'success') {
        navigate('/login');
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'data' in err) {
        const errorData = (err as { data: { errors: string; status: string } }).data;
        if (errorData.status === 'error' && errorData.errors) {
          setErrors(JSON.parse(errorData.errors));
        }
      }
    }
  };

  const renderError = (field: string) => {
    return (
      <div className="h-5">
        {errors[field]?.map((error, index) => (
          <p key={index} className="text-red-500 text-sm">
            {error.message}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-4 py-4 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">

        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register a new account
        </h2>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-1" onSubmit={handleRegister}>

          <div>
            <label htmlFor="first_name" className="block text-left text-sm font-medium leading-6 text-gray-900">
              First Name
            </label>
            <div className="mt-1">
              <input
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="given-name"
                // required
                value={formData.first_name}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {renderError('first_name')}
            </div>
          </div>

          <div>
            <label htmlFor="last_name" className="block text-left text-sm font-medium leading-6 text-gray-900">
              Last Name
            </label>
            <div className="mt-1">
              <input
                id="last_name"
                name="last_name"
                type="text"
                autoComplete="family-name"
                // required
                value={formData.last_name}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {renderError('last_name')}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-left text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                // required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {renderError('email')}
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-left text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                // required
                value={formData.username}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {renderError('username')}
            </div>
          </div>

          <div>
            <label htmlFor="password1" className="block text-left text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password1"
                name="password1"
                type="password"
                autoComplete="new-password"
                // required
                value={formData.password1}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {renderError('password1')}
            </div>
          </div>

          <div>
            <label htmlFor="password2" className="block text-left text-sm font-medium leading-6 text-gray-900">
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                id="password2"
                name="password2"
                type="password"
                autoComplete="new-password"
                // required
                value={formData.password2}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {renderError('password2')}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
