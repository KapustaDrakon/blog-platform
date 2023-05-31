import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import profile from '../../assets/images/Profile-Image.svg';

import classes from './Header.module.scss';

const Header = ({ initial }) => {
  const buttonLogOut = () => {
    setIsLogin(false);
    setUser(null);
    localStorage.removeItem('user');
    location.reload();
  };

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    if (!isLogin) return;
    setUser(JSON.parse(localStorage.getItem('user')));
  }, [isLogin]);

  useEffect(() => {
    if (!localStorage.getItem('user')) return;
    setIsLogin(true);
  });

  const imageFunc = () => {
    if (user.image) return user.image;
    else return profile;
  };

  return (
    <div className={classes.header}>
      <Link to="/articles" className={classes.header__title} onClick={() => initial()}>
        Realworld Blog
      </Link>

      <div className={classes['header__buttons-container']}>
        {isLogin ? (
          <div className={classes.header__buttons}>
            <Link to="/new-article" className={`${classes['header__button-create-article']}`}>
              Create article
            </Link>
            <Link to="/profile" className={`${classes['header__button-profile']} ${classes.button}`}>
              {user.username}
              <img alt="profile" className={classes['header__button-profile-image']} src={imageFunc()} />
            </Link>
            <button className={`${classes['header__button-logout']}`} onClick={() => buttonLogOut()}>
              Log Out
            </button>
          </div>
        ) : (
          <div className={classes.header__buttons}>
            <Link to="/sign-in" className={`${classes['header__button-signin']} ${classes.button}`}>
              Sign In
            </Link>
            <Link to="/sign-up" className={`${classes['header__button-signup']}`}>
              Sigh Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

Header.defaultProps = {
  initial: () => {},
};

Header.propTypes = {
  initial: PropTypes.func,
};

export default Header;
