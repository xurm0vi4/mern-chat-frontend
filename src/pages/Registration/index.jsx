import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../redux/slices/auth';

import './styles.css';

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => Boolean(state.auth.data));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { firstName: '', lastName: '', password: '', confirmPassword: '' },
    mode: 'onBlur',
  });

  const onSubmit = async (values) => {
    try {
      const data = await dispatch(registerUser(values));
      console.log(data);

      if (!data.payload) {
        alert('Sign up failed');
      }

      if ('token' in data.payload) {
        localStorage.setItem('token', data.payload.token);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  if (isAuth) {
    navigate('/chats');
  }

  return (
    <form className="registration" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="registration__title">Sign up</h2>
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
            required: 'Enter your password',
            minLength: { value: 5, message: 'Password length must be 5 or more' },
          })}
        />
        {errors?.password && <p className="login__error">{errors.password?.message}</p>}
      </label>
      <label>
        Confirm password
        <input
          className="login__input"
          type="password"
          placeholder="Confirm your password"
          {...register('confirmPassword', { required: 'Confirm your password' })}
        />
        {errors?.confirmPassword && (
          <p className="login__error">{errors.confirmPassword?.message}</p>
        )}
      </label>
      <button className="registration__button">Sign Up</button>
      <div className="registration__login">
        Have an account?{' '}
        <Link to="/" className="registration__login-link">
          Log In
        </Link>
      </div>
    </form>
  );
};

export default Registration;
