import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import GetRequest from '../../services/GetRequest';

import classes from './SignIn.module.scss';

const SignIn = (props) => {
  const getRequest = new GetRequest();
  const { setWasEntered } = props;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
  });

  const [isLogin, setIsLogin] = useState(false);
  const [errorText, setErrorText] = useState('');

  if (isLogin) {
    return <Redirect to="/" />;
  }

  const onSubmit = (data) => {
    data.email = data.email.toLowerCase();
    (async () => {
      return await getRequest
        .userLogin(data)
        .then((res) => {
          if (Object.keys(res).includes('errors')) {
            const entries = Object.entries(res.errors);
            const array = entries.map((arr) => {
              if (arr.includes('email or password')) {
                return 'Email or password is invalid';
              }
            });
            setErrorText(array);
            throw new Error();
          } else {
            localStorage.setItem('user', JSON.stringify(res.user));
            reset();
            setWasEntered(true);
            setIsLogin(true);
            //location.reload();
            return res;
          }
        })
        .catch(() => {});
    })();
  };

  return (
    <form className={classes['sign-in']} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes['sign-in__title']}>Sign In</h2>

      <div>
        <label htmlFor="sign-in_email-address" className={classes['sign-in__input-label']}>
          Email address
        </label>
        <input
          type="text"
          autoComplete="on"
          className={
            !errors.email && !errorText.includes('Email or password is invalid')
              ? classes['sign-in__input']
              : classes['sign-in__input-error']
          }
          placeholder="Email address"
          id="sign-in_email-address"
          autoFocus
          {...register('email', {
            required: 'Is required to fill in',
            pattern: /[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+/,
          })}
        ></input>

        <div>
          {errors?.email && (
            <p className={classes['sign-in__error']}>{errors?.email.message || 'Filled incorrectly'}</p>
          )}
          {errorText.length !== 0 && errorText.includes('Email or password is invalid') ? (
            <p className={classes['sign-in__error']}>Email or password is invalid</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="sign-in_password" className={classes['sign-in__input-label']}>
          Password
        </label>
        <input
          type="password"
          className={
            !errors.password && !errorText.includes('Email or password is invalid')
              ? classes['sign-in__input']
              : classes['sign-in__input-error']
          }
          placeholder="Password"
          id="sign-in_password"
          {...register('password', {
            required: 'Is required to fill in',
          })}
        ></input>

        <div>
          {errors?.password && <p className={classes['sign-in__error']}>{errors?.password.message || 'Error'}</p>}
        </div>
      </div>

      <div className={classes['sign-in__button-container']}>
        <button type="submit" className={classes['sign-in__button-login']}>
          Login
        </button>
        <p className={classes['sign-in__havent']}>
          Don’t have an account?{' '}
          <Link to="/sign-up" className={classes['sign-in__sign-up']}>
            Sign Up
          </Link>
          .
        </p>
      </div>
    </form>
  );
};

export default SignIn;
