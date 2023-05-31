import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from '../ArcticleItem/ArticleItem.module.scss';
import GetRequest from '../../services/GetRequest';
import './ShowArticle.css';

const ShowArticle = (props) => {
  const getRequest = new GetRequest();
  const { article, initial } = props;
  let idxTag = 0;

  const dateCreated = (date) => {
    if (date !== undefined) {
      if (date !== '' && Number(date.split('', 4).join('')) >= 1970) {
        return format(new Date(date), 'MMMM dd, yyyy');
      }
    }
    return date;
  };

  const showDelete = () => {
    const label = document.querySelector('.article__label');
    if (label.classList.contains('article__label_show')) {
      label.classList.remove('article__label_show');
    } else {
      label.classList.add('article__label_show');
    }
  };

  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [errorText, setErrorText] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const [likeCount, setLikeCount] = useState(article.favoritesCount);

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      const likeButtons = document.getElementsByName(`like-${article.title}`);
      [...likeButtons].map((like) => (like.disabled = true));
    }
  });

  if (isDelete) {
    return <Redirect to="/" />;
  }

  const articleDelete = () => {
    (async () => {
      return await getRequest
        .deleteArticle(article.slug, user.current.token)
        .then((res) => {
          if (Object.keys(res).includes('errors')) {
            setErrorText('error');
            console.log('error > ', errorText);
            throw new Error();
          } else if (res === 'ok') {
            setIsDelete(true);
            location.reload();
            return res;
          }
        })
        .catch(() => {});
    })();
  };

  const changeLike = (event) => {
    if (event.target.checked) {
      setLikeCount(likeCount + 1);
    } else setLikeCount(likeCount - 1);
    (async () => {
      return await getRequest
        .likeArticle(event.target.checked, article.slug, user.current.token)
        .then((res) => {
          if (Object.keys(res).includes('errors')) {
            setErrorText('error');
            console.log('error > ', errorText);
            throw new Error();
          } else {
            return res;
          }
        })
        .finally(() => initial());
    })();
  };

  return (
    <div className={classes.article__container}>
      <div className={classes.article_width}>
        <div className={classes['article__title-container']}>
          <h2 className={classes['article__title-all']}>{article.title}</h2>

          <label className={classes['article__likes-label']}>
            {article.favorited ? (
              <input
                type="checkbox"
                id={`like-${article.title}`}
                name={`like-${article.title}`}
                className={classes.article__likes}
                defaultChecked
                onChange={(event) => changeLike(event)}
              />
            ) : (
              <input
                type="checkbox"
                id={`like-${article.title}`}
                name={`like-${article.title}`}
                className={classes.article__likes}
                onChange={(event) => changeLike(event)}
              />
            )}
            <span className={classes['article__like-count']}>{likeCount}</span>
          </label>
        </div>
        <div className={classes['article__tags-all']}>
          {article.tagList.map((tag) => {
            return (
              <div className={classes.article__tag} key={idxTag++}>
                <div className={classes['article__tag-name']}>{tag}</div>
              </div>
            );
          })}
        </div>

        <p className={classes['article__description-all']}>{article.description}</p>

        <div className={classes['article__body']}>
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
      </div>

      <div className={classes['article__author-and-buttons']}>
        <div className={classes['article__author-and-image']}>
          <div className={classes['article__author-container']}>
            <span className={classes.article__author}>{article.author.username}</span>
            <span className={classes.article__date}>{dateCreated(article.createdAt)}</span>
          </div>
          <img
            className={classes['article__author-image']}
            src={article.author.image}
            alt={`${article.author}-image`}
          ></img>
        </div>
        {user.current !== null ? (
          user.current.username === article.author.username ? (
            <div className={classes['article__buttons']}>
              <button
                type="button"
                className={classes['article__button-delete']}
                id="button-delete"
                onClick={showDelete}
              >
                Delete
              </button>
              <div className="article__label-position">
                <label className="article__label">
                  <div className="article__label-arrow"></div>
                  <div className="article__label-container">
                    <div className="article__label-warning-container">
                      <div className="article__label-warning"></div>
                    </div>
                    Are you sure to delete this article?
                  </div>
                  <div className="article__buttons">
                    <button type="button" className="article__button-no" onClick={showDelete}>
                      No
                    </button>
                    <button type="button" className="article__button-yes" onClick={articleDelete}>
                      Yes
                    </button>
                  </div>
                </label>
              </div>
              <Link to={`/articles/${article.slug}/edit`} className={classes['article__button-edit']}>
                Edit
              </Link>
            </div>
          ) : null
        ) : null}
      </div>
    </div>
  );
};

ShowArticle.defaultProps = {
  article: {},
  initial: () => {},
};

ShowArticle.propsTypes = {
  article: PropTypes.object,
  initial: PropTypes.func,
};

export default ShowArticle;
