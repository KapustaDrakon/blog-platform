import React from 'react';
import PropTypes from 'prop-types';

import { ArticleItem } from '../ArcticleItem';

const ArticlesList = (props) => {
  const { articles, wasEntered, changeArticlesLike } = props;
  if (articles !== undefined) {
    return (
      <div>
        {articles.map((article) => (
          <ArticleItem
            article={article}
            wasEntered={wasEntered}
            changeArticlesLike={changeArticlesLike}
            key={article.slug}
          />
        ))}
      </div>
    );
  }
};

ArticlesList.defaultProps = {
  articles: [],
};

ArticlesList.propTypes = {
  articles: PropTypes.array,
};

export default ArticlesList;
