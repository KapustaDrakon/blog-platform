import React from 'react';

import classes from './EditProfile.module.scss';

const EditProfile = () => {
  return (
    <form className={classes['edit-profile']}>
      <h2 className={classes['edit-profile__title']}>Edit Profile</h2>

      <div>
        <label htmlFor="edit-profile_username" className={classes['edit-profile__input-label']}>
          Username
        </label>
        <input
          type="text"
          className={classes['edit-profile__input']}
          placeholder="Username"
          id="edit-profile_username"
          autoFocus
        ></input>
      </div>

      <div>
        <label htmlFor="edit-profile_email-address" className={classes['edit-profile__input-label']}>
          Email address
        </label>
        <input
          type="text"
          className={classes['edit-profile__input']}
          placeholder="Email address"
          id="edit-profile_email-addres"
        ></input>
      </div>

      <div>
        <label htmlFor="edit-profile_new-password" className={classes['edit-profile__input-label']}>
          New password
        </label>
        <input
          type="password"
          className={classes['edit-profile__input']}
          placeholder="New password"
          id="edit-profile_new-password"
        ></input>
      </div>

      <div>
        <label htmlFor="edit-profile_avatar-image" className={classes['edit-profile__input-label']}>
          Avatar image (url)
        </label>
        <input
          type="text"
          className={classes['edit-profile__input']}
          placeholder="Avatar image"
          id="edit-profile_avatar-image"
        ></input>
      </div>

      <button type="submit" className={classes['edit-profile__button-login']}>
        Save
      </button>
    </form>
  );
};

export default EditProfile;
