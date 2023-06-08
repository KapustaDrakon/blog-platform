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
  const { article, wasEntered, changeArticlesLike } = props;
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
    setOnDelete(!onDelete);
  };

  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [isDelete, setIsDelete] = useState(false);
  const [likeCount, setLikeCount] = useState(article.favoritesCount);
  const [onDelete, setOnDelete] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      const likeButtons = document.getElementsByName(`like-${article.title}`);
      [...likeButtons].map((like) => (like.disabled = true));
    }
  }, [wasEntered]);

  if (isDelete) {
    return <Redirect to="/" />;
  }

  const articleDelete = () => {
    (async () => {
      return await getRequest
        .deleteArticle(article.slug, user.current.token)
        .then((res) => {
          if (Object.keys(res).includes('errors')) {
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

  const changeLike = () => {
    article.favorited = !article.favorited;
    if (article.favorited) {
      setLikeCount(++article.favoritesCount);
    } else setLikeCount(--article.favoritesCount);
    (async () => {
      return await getRequest.likeArticle(article.favorited, article.slug, user.current.token).then((res) => {
        if (Object.keys(res).includes('errors')) {
          throw new Error();
        } else {
          return res;
        }
      });
    })();
    changeArticlesLike(article.slug, article.favorited, likeCount);
  };

  return (
    <div className={classes.article__container}>
      <div className={classes.article_width}>
        <div className={classes['article__title-container']}>
          <h2 className={classes['article__title-all']}>{article.title}</h2>

          <label className={classes['article__likes-label']}>
            {article.favorited ? (
              <button
                type="button"
                id={`like-${article.title}`}
                name={`like-${article.title}`}
                className={classes['article__likes-checked']}
                onClick={() => changeLike()}
              />
            ) : (
              <button
                type="button"
                id={`like-${article.title}`}
                name={`like-${article.title}`}
                className={classes.article__likes}
                onClick={() => changeLike()}
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
        {user.current !== null && wasEntered ? (
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
                {onDelete ? (
                  <div className="article__label" id={`${article.slug}-label-delete`}>
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
                  </div>
                ) : null}
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
};

ShowArticle.propsTypes = {
  article: PropTypes.object,
};

export default ShowArticle;
