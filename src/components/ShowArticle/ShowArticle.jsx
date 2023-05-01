import React from 'react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

import classes from '../ArcticleItem/ArticleItem.module.scss';

import classes2 from './ShowArticle.module.scss';

const ShowArticle = (props) => {
  const { article } = props;
  let idxTag = 0;

  const dateCreated = (date) => {
    if (date !== undefined) {
      if (date !== '' && Number(date.split('', 4).join('')) >= 1970) {
        return format(new Date(date), 'MMMM dd, yyyy');
      }
    }
    return date;
  };

  return (
    <div className={classes.article__container}>
      <div className={classes.article_width}>
        <div className={classes['article__title-container']}>
          <h2 className={classes.article__title}>{article.title}</h2>

          <label className={classes['article__likes-label']}>
            <input type="checkbox" className={classes.article__likes} />
            <span className={classes['article__like-count']}>{article.favoritesCount}</span>
          </label>
        </div>
        <div className={classes['article__tags']}>
          {article.tagList.map((tag) => {
            return (
              <div className={classes.article__tag} key={idxTag++}>
                {tag}
              </div>
            );
          })}
        </div>

        <p className={classes.article__description}>{article.description}</p>

        <div className={classes2['article__body']}>
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
        <div className={classes['article__buttons']}>
          <button className={classes['article__button-delete']}>Delete</button>
          <button className={classes['article__button-edit']}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default ShowArticle;
