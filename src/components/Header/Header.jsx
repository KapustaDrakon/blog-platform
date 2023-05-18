import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//import profile from '../../assets/images/Profile-Image.svg';

import classes from './Header.module.scss';

const Header = () => {
  const buttonLogOut = () => {
    setIsLogin(false);
    setUser(null);
    localStorage.clear();
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

  return (
    <div className={classes.header}>
      <Link to="/articles" className={classes.header__title}>
        Realworld Blog
      </Link>

      <div className={classes['header__buttons-container']}>
        {isLogin ? (
          <div className={classes.header__buttons}>
            <Link to="/create-article" className={`${classes['header__button-create-article']}`}>
              Create article
            </Link>
            <Link to="/profile" className={`${classes['header__button-profile']} ${classes.button}`}>
              {user.username}
              <img className={classes['header__button-profile-image']} src={user.image} />
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

export default Header;

/*
import React from 'react';
import { Link } from 'react-router-dom';

import profile from '../../assets/images/Profile-Image.svg';

import classes from './Header.module.scss';

class Header extends React.Component {
  state = {
    isLogin: false,
    user: JSON.parse(localStorage.getItem('user')),
  };

  buttonLogOut = () => {
    this.setState({
      isLogin: false,
      user: null,
    });
    localStorage.clear();
    localStorage.setItem('isLogin', false);
    console.log('вышел > ', false);

    //location.reload();
  };

  buttonSignIn = () => {
    //setLoad(false);
    localStorage.setItem('isLogin', false);
  };

  //const [load, setLoad] = useState(JSON.parse(localStorage.getItem('isLogin')));

  //console.log('user > ', user);

  render() {
    console.log('----------------------------------------------------');
    console.log('user > ', JSON.parse(localStorage.getItem('user')));
    console.log('login > ', this.state.isLogin);
    console.log('load > ', JSON.parse(localStorage.getItem('isLogin')));

    if (JSON.parse(localStorage.getItem('user')) !== null) {
      return (
        <div className={classes.header}>
          <Link to="/articles" className={classes.header__title}>
            Realworld Blog
          </Link>

          <div className={classes['header__buttons-container']}>
            <div className={classes.header__buttons}>
              <Link to="/create-article" className={`${classes['header__button-create-article']}`}>
                Create article
              </Link>
              <Link to="/profile" className={`${classes['header__button-profile']} ${classes.button}`}>
                {JSON.parse(localStorage.getItem('user')).username}
                <img className={classes['header__button-profile-image']} src={profile} />
              </Link>
              <button className={`${classes['header__button-logout']}`} onClick={() => this.buttonLogOut()}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.header}>
          <Link to="/articles" className={classes.header__title}>
            Realworld Blog
          </Link>

          <div className={classes['header__buttons-container']}>
            <div className={classes.header__buttons}>
              <Link
                to="/sign-in"
                className={`${classes['header__button-signin']} ${classes.button}`}
                onClick={() => this.buttonSignIn()}
              >
                Sign In
              </Link>
              <Link to="/sign-up" className={`${classes['header__button-signup']}`}>
                Sigh Up
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Header;
*/
