import React from 'react';

import classes from './SignIn.module.scss';

const SignIn = () => {
  return (
    <form className={classes['sign-in']}>
      <h2 className={classes['sign-in__title']}>Sign In</h2>

      <div>
        <label htmlFor="sign-in_email-address" className={classes['sign-in__input-label']}>
          Email address
        </label>
        <input
          type="text"
          className={classes['sign-in__input']}
          placeholder="Email address"
          id="sign-in_email-addres"
          autoFocus
        ></input>
      </div>

      <div>
        <label htmlFor="sign-in_password" className={classes['sign-in__input-label']}>
          Password
        </label>
        <input
          type="password"
          className={classes['sign-in__input']}
          placeholder="Password"
          id="sign-in_password"
        ></input>
      </div>

      <div className={classes['sign-in__button-container']}>
        <button type="submit" className={classes['sign-in__button-login']}>
          Login
        </button>
        <p className={classes['sign-in__havent']}>
          Don’t have an account? <a className={classes['sign-in__signup']}>Sign Up</a>.
        </p>
      </div>
    </form>
  );
};

export default SignIn;
