import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import GetRequest from '../../services/GetRequest';

import classes from './CreateAcc.module.scss';

const CreateAcc = () => {
  const getRequest = new GetRequest();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: 'onSubmit',
  });

  const [isRegisted, setIsRegisted] = useState(false);
  const [errorText, setErrorText] = useState('');

  if (isRegisted) {
    return <Redirect to="/sign-in" />;
  }

  const onSubmit = (data) => {
    console.log(data);
    data.email = data.email.toLowerCase();
    console.log(data);
    (async () => {
      return await getRequest
        .userRegister(data)
        .then((res) => {
          if (Object.keys(res).includes('errors')) {
            const entries = Object.entries(res.errors);
            console.log(entries);
            const array = entries.map((arr) => {
              if (arr.includes('username')) {
                if (arr.includes('is already taken.')) {
                  return 'Username is already taken';
                } else if (arr.includes('is invalid')) {
                  return 'Username is invalid';
                }
              } else if (arr.includes('email')) {
                return 'Email is already taken';
              }
            });
            setErrorText(array);
            throw new Error();
          } else {
            reset();
            setIsRegisted(true);
            return res;
          }
        })
        .catch(() => {});
    })();
  };

  return (
    <form className={classes['create-account']} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes['create-account__title']}>Create new account</h2>

      <div>
        <label htmlFor="create_username" className={classes['create-account__input-label']}>
          Username
        </label>
        <input
          type="text"
          className={
            !errors.username &&
            !errorText.includes('Username is already taken') &&
            !errorText.includes('Username is invalid')
              ? classes['create-account__input']
              : classes['create-account__input-error']
          }
          placeholder="Username"
          id="create_username"
          autoFocus
          {...register('username', {
            required: 'Is required to fill in',
            minLength: {
              value: 3,
              message: 'Your username needs to be at least 3 characters.',
            },
            maxLength: {
              value: 20,
              message: 'Your username must be no more than 20 characters.',
            },
          })}
        ></input>

        <div>
          {errors?.username && (
            <p className={classes['create-account__error']}>{errors?.username.message || 'Error'}</p>
          )}
          {errorText.length !== 0 && errorText.includes('Username is already taken') ? (
            <p className={classes['create-account__error']}>Username is already taken</p>
          ) : null}
          {errorText.length !== 0 && errorText.includes('Username is invalid') ? (
            <p className={classes['create-account__error']}>Username is invalid</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="create_email-address" className={classes['create-account__input-label']}>
          Email address
        </label>
        <input
          type="text"
          className={
            !errors.email && !errorText.includes('Email is already taken')
              ? classes['create-account__input']
              : classes['create-account__input-error']
          }
          placeholder="Email address"
          id="create_email-address"
          {...register('email', {
            pattern: /[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+/,
            required: 'Is required to fill in',
          })}
        ></input>

        <div>
          {errors?.email && (
            <p className={classes['create-account__error']}>{errors?.email.message || 'Filled incorrectly'}</p>
          )}
          {errorText.length !== 0 && errorText.includes('Email is already taken') ? (
            <p className={classes['create-account__error']}>Email is already taken</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="create_password" className={classes['create-account__input-label']}>
          Password
        </label>
        <input
          type="password"
          className={!errors.password ? classes['create-account__input'] : classes['create-account__input-error']}
          placeholder="Password"
          id="create_password"
          {...register('password', {
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters.',
            },
            maxLength: {
              value: 40,
              message: 'Your password must be no more than 40 characters.',
            },
            required: 'Is required to fill in',
            pattern: /^\S*$/,
          })}
        ></input>

        <div>
          {errors?.password && (
            <p className={classes['create-account__error']}>{errors?.password.message || 'Error'}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="create_repeat-password" className={classes['create-account__input-label']}>
          Repeat Password
        </label>
        <input
          type="password"
          className={
            !errors.repeat_password ? classes['create-account__input'] : classes['create-account__input-error']
          }
          placeholder="Password"
          id="create_repeat-password"
          {...register('repeat_password', {
            required: 'Is required to fill in',
            message: 'Passwords must match',
            validate: (value) => {
              if (watch('password') != value) {
                return 'Passwords must match';
              }
            },
          })}
        ></input>

        <div>
          {errors?.repeat_password && (
            <p className={classes['create-account__error']}>{errors?.repeat_password.message}</p>
          )}
        </div>
      </div>

      <div className={classes['create-account__devider']}></div>

      <div>
        <div className={classes['create-account__check-container']}>
          <input
            type="checkbox"
            id="create_check"
            className={classes['create-account__input-check']}
            defaultChecked
            {...register('agree', {
              required: 'Is required to tick',
            })}
          ></input>
          <label className={classes['create-account__check-label']} htmlFor="create_check">
            I agree to the processing of my personal information
          </label>
        </div>

        <div>{errors.agree && <p className={classes['create-account__error']}>{errors.agree.message}</p>}</div>
      </div>

      <div className={classes['create-account__button-container']}>
        <button type="submit" className={classes['create-account__button-create']}>
          Create
        </button>
        <p className={classes['create-account__already']}>
          Already have an account?{' '}
          <Link to="/sign-in" className={classes['create-account__signin']}>
            Sign In
          </Link>
          .
        </p>
      </div>
    </form>
  );
};

export default CreateAcc;
