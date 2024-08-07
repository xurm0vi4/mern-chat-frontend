import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/auth';

import './styles.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => Boolean(state.auth.data));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { firstName: '', lastName: '', password: '' },
    mode: 'onBlur',
  });

  const onSubmit = async (values) => {
    try {
      const data = await dispatch(loginUser(values));

      if (!data.payload) {
        alert('Log in failed');
      }

      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  if (isAuth) {
    navigate('/chats');
  }
  return (
    <form className="login" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="login__title">Log In</h2>
      <label>
        First name
        <input
          className="login__input"
          type="text"
          placeholder="Enter your first name"
          {...register('firstName', { required: 'Enter your first name', maxLength: 20 })}
        />
        {errors?.firstName && <p className="login__error">{errors.firstName?.message}</p>}
      </label>
      <label>
        Last name
        <input
          className="login__input"
          type="text"
          placeholder="Enter your last name"
          {...register('lastName', { required: 'Enter your last name', maxLength: 20 })}
        />
        {errors?.lastName && <p className="login__error">{errors.lastName?.message}</p>}
      </label>
      <label>
        Password
        <input
          className="login__input"
          type="password"
          placeholder="Enter your password"
          {...register('password', {
            required: 'Enter you password',
            minLength: { value: 5, message: 'Password length must be 5 or more' },
          })}
        />
        {errors?.password && <p className="login__error">{errors.password?.message}</p>}
      </label>

      <button className="login__button" type="submit">
        Log In
      </button>
      <div className="login__signup">
        Don't have an account?{' '}
        <Link to="/registration" className="login__signup-link">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default Login;
