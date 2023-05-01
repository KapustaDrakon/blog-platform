import React from 'react';

import classes from './CreateAcc.module.scss';

const CreateAcc = () => {
  return (
    <form className={classes['create-account']}>
      <h2 className={classes['create-account__title']}>Create new account</h2>

      <div>
        <label htmlFor="create_username" className={classes['create-account__input-label']}>
          Username
        </label>
        <input
          type="text"
          className={classes['create-account__input']}
          placeholder="Username"
          id="create_username"
          autoFocus
        ></input>
      </div>

      <div>
        <label htmlFor="create_email-address" className={classes['create-account__input-label']}>
          Email address
        </label>
        <input
          type="text"
          className={classes['create-account__input']}
          placeholder="Email address"
          id="create_email-address"
        ></input>
      </div>

      <div>
        <label htmlFor="create_password" className={classes['create-account__input-label']}>
          Password
        </label>
        <input
          type="password"
          className={classes['create-account__input']}
          placeholder="Password"
          id="create_password"
        ></input>
      </div>

      <div>
        <label htmlFor="create_repeat-password" className={classes['create-account__input-label']}>
          Repeat Password
        </label>
        <input
          type="password"
          className={classes['create-account__input']}
          placeholder="Password"
          id="create_repeat-password"
        ></input>
      </div>

      <div className={classes['create-account__devider']}></div>

      <div className={classes['create-account__check-container']}>
        <input type="checkbox" id="create_check" className={classes['create-account__input-check']}></input>
        <label className={classes['create-account__check-label']} htmlFor="create_check">
          I agree to the processing of my personal information
        </label>
      </div>

      <div className={classes['create-account__button-container']}>
        <button type="submit" className={classes['create-account__button-create']}>
          Create
        </button>
        <p className={classes['create-account__already']}>
          Already have an account? <a className={classes['create-account__signin']}>Sign In</a>.
        </p>
      </div>
    </form>
  );
};

export default CreateAcc;
