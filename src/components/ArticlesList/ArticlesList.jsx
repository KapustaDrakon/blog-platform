import React from 'react';
import PropTypes from 'prop-types';

import { ArticleItem } from '../ArcticleItem';

const ArticlesList = (props) => {
  const { articles, initial } = props;
  if (articles !== undefined) {
    return (
      <div>
        {articles.map((article) => (
          <ArticleItem article={article} key={article.slug} initial={initial} />
        ))}
      </div>
    );
  }
};

ArticlesList.defaultProps = {
  articles: [],
  initial: () => {},
};

ArticlesList.propTypes = {
  articles: PropTypes.array,
  initial: PropTypes.func,
};

export default ArticlesList;
