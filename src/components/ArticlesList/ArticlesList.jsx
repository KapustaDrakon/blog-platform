import React from 'react';

import { ArticleItem } from '../ArcticleItem';

import classes from './ArticlesList.module.scss';

const ArticlesList = (props) => {
  if (props.articles !== undefined) {
    return (
      <div className={classes['article-list']}>
        {props.articles.map((article) => (
          <ArticleItem article={article} key={article.slug} />
        ))}
      </div>
    );
  }
};

export default ArticlesList;
