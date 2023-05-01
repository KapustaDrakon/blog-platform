import React from 'react';
import { Link } from 'react-router-dom';

import profile from '../../assets/images/Profile-Image.svg';

import classes from './Header.module.scss';

const Header = () => {
  return (
    <div className={classes.header}>
      <Link to="/articles" className={classes.header__title}>
        Realworld Blog
      </Link>
      <div className={classes.header__buttons}>
        <Link to="/sign_in" className={`${classes['header__button-signin']} ${classes.button}`}>
          Sign In
        </Link>
        <Link to="/sign_up" className={`${classes['header__button-signup']}`}>
          Sigh Up
        </Link>
        <Link to="/create_article" className={`${classes['header__button-create-article']}`}>
          Create article
        </Link>
        <Link to="/profile" className={`${classes['header__button-profile']} ${classes.button}`}>
          John Doe
          <img className={classes['header__button-profile-image']} src={profile} />
        </Link>
        <button className={`${classes['header__button-logout']}`}>Log Out</button>
      </div>
    </div>
  );
};

export default Header;
