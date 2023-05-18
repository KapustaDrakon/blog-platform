import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';

import GetRequest from '../../services/GetRequest';

import classes from './EditProfile.module.scss';

const EditProfile = () => {
  const getRequest = new GetRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
  });

  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [isEdit, setIsEdit] = useState(false);
  const [errorText, setErrorText] = useState('');

  if (user.current === null) {
    return <Redirect to="/sign-in" />;
  }

  if (isEdit) {
    return <Redirect to="/" />;
  }

  const onSubmit = (data) => {
    data.token = user.current.token;
    data.email = data.email.toLowerCase();
    console.log('data > ', data);

    (async () => {
      return await getRequest
        .userEdit(data)
        .then((res) => {
          if (Object.keys(res).includes('errors')) {
            const entries = Object.entries(res.errors);
            const array = entries.map((arr) => {
              if (arr.includes('username')) {
                return 'Username is already taken';
              } else if (arr.includes('email')) {
                return 'Email is already taken';
              }
            });
            setErrorText(array);
            throw new Error();
          } else {
            console.log(res);
            localStorage.setItem('user', JSON.stringify(res.user));
            reset();
            setIsEdit(true);
            location.reload();
            return res;
          }
        })
        .catch(() => {});
    })();
  };

  return (
    <form className={classes['edit-profile']} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes['edit-profile__title']}>Edit Profile</h2>

      <div>
        <label htmlFor="edit-profile_username" className={classes['edit-profile__input-label']}>
          Username
        </label>
        <input
          type="text"
          className={
            !errors.username && !errorText.includes('Username is already taken')
              ? classes['edit-profile__input']
              : classes['edit-profile__input-error']
          }
          placeholder="Username"
          id="edit-profile_username"
          defaultValue={user.current.username}
          autoComplete="on"
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
          {errors?.username && <p className={classes['edit-profile__error']}>{errors?.username.message || 'Error'}</p>}
          {errorText.length !== 0 && errorText.includes('Username is already taken') ? (
            <p className={classes['edit-profile__error']}>Username is already taken</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="edit-profile_email-address" className={classes['edit-profile__input-label']}>
          Email address
        </label>
        <input
          type="text"
          className={
            !errors.email && !errorText.includes('Email is already taken')
              ? classes['edit-profile__input']
              : classes['edit-profile__input-error']
          }
          placeholder="Email address"
          id="edit-profile_email-address"
          defaultValue={user.current.email}
          autoComplete="on"
          {...register('email', {
            required: 'Is required to fill in',
            pattern: /[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+/,
          })}
        ></input>

        <div>
          {errors?.email && (
            <p className={classes['edit-profile__error']}>{errors?.email.message || 'Filled incorrectly'}</p>
          )}
          {errorText.length !== 0 && errorText.includes('Email is already taken') ? (
            <p className={classes['edit-profile__error']}>Email is already taken</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="edit-profile_new-password" className={classes['edit-profile__input-label']}>
          New password
        </label>
        <input
          type="password"
          className={!errors.password ? classes['edit-profile__input'] : classes['edit-profile__input-error']}
          placeholder="New password"
          id="edit-profile_new-password"
          {...register('password', {
            required: 'Is required to fill in',
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters.',
            },
            maxLength: {
              value: 40,
              message: 'Your password must be no more than 40 characters.',
            },
          })}
        ></input>

        <div>
          {errors?.password && <p className={classes['edit-profile__error']}>{errors?.password.message || 'Error'}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="edit-profile_avatar-image" className={classes['edit-profile__input-label']}>
          Avatar image (url)
        </label>
        <input
          type="text"
          className={!errors.image ? classes['edit-profile__input'] : classes['edit-profile__input-error']}
          placeholder="Avatar image"
          id="edit-profile_avatar-image"
          defaultValue={user.current.image}
          {...register('image', {
            required: 'Is required to fill in',
            pattern: /^https?:\/\/\S+(?:jpg|jpeg|png|svg|gif)$/,
          })}
        ></input>

        <div>
          {errors?.image && (
            <p className={classes['edit-profile__error']}>{errors?.image.message || 'Filled incorrectly'}</p>
          )}
        </div>
      </div>

      <button type="submit" className={classes['edit-profile__button-save']}>
        Save
      </button>
    </form>
  );
};

export default EditProfile;
