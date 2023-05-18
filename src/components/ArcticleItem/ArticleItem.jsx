import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

//import like from '../../assets/images/Like.svg';
//import profile from '../../assets/images/Profile-Image.svg';

import classes from './ArticleItem.module.scss';

const ArticleItem = (props) => {
  const { article } = props;
  let idxTag = 0;
  //console.log('article > ', article);

  const dateCreated = (date) => {
    if (date !== undefined) {
      if (date !== '' && Number(date.split('', 4).join('')) >= 1970) {
        return format(new Date(date), 'MMMM dd, yyyy');
      }
    }
    return date;
  };

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      const likeButtons = document.getElementsByName(`like-${article.title}`);
      [...likeButtons].map((like) => (like.disabled = true));
    }
  });

  return (
    <div className={classes.article__container}>
      <div className={classes.article_width}>
        <div className={classes['article__title-container']}>
          <Link to={`/articles/${article.slug}`} className={classes['article__title-link']}>
            <h2 className={classes.article__title}>{article.title}</h2>
          </Link>
          <label className={classes['article__likes-label']}>
            <input
              type="checkbox"
              id={`like-${article.title}`}
              name={`like-${article.title}`}
              className={classes.article__likes}
            />
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

export default ArticleItem;
