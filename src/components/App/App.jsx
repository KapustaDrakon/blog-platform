import { React, useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Spin, Pagination } from 'antd';

import { Header } from '../Header';
import { ArticlesList } from '../ArticlesList';
import { CreateAcc } from '../CreateAcc';
import { SignIn } from '../SignIn';
import { EditProfile } from '../EditProfile';
import { CreateArticle } from '../CreateArticle';
import { ShowArticle } from '../ShowArticle';
import { EditArticle } from '../EditArticle';
import GetRequest from '../../services/GetRequest';

import classes from './App.module.scss';

import './AppAntd.css';

const App = () => {
  const getRequest = new GetRequest();

  const [articles, setArticles] = useState([]);
  const [articlesOnPage, setArticlesOnPage] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  let pageState = useRef(1);
  const [loading, setLoad] = useState(true);
  const [error, setError] = useState(false);

  const getArticlesOnPageFunction = (pageState) => {
    (async () => {
      return await getRequest
        .getArticlesOnPage(pageState)
        .then((res) => {
          setError(false);
          setLoad(false);
          setArticlesOnPage(res);
        })
        .catch(() => setError(true));
    })();
  };

  const getArticlesCountFunction = () => {
    (async () => {
      return await getRequest
        .getArticlesCount()
        .then((res) => {
          setError(false);
          setLoad(false);
          setArticlesCount(res);
        })
        .catch(() => setError(true));
    })();
  };

  const getArticlesFunction = () => {
    (async () => {
      return await getRequest
        .getArticles()
        .then((res) => {
          setError(false);
          setLoad(false);
          setArticles(res.articles);
        })
        .catch(() => setError(true));
    })();
  };

  useEffect(() => {
    getArticlesFunction();
    getArticlesOnPageFunction(pageState.current);
    getArticlesCountFunction();
  }, []);

  const initial = () => {
    getArticlesFunction();
    getArticlesOnPageFunction(pageState.current);
    getArticlesCountFunction();
  };

  const articlesList = (
    <div>
      {articles.length !== 0 ? (
        <div>
          <ArticlesList articles={articlesOnPage} initial={initial} />
          <Pagination
            className={classes['section__pagination']}
            current={pageState.current}
            total={articlesCount}
            pageSize={5}
            showSizeChanger={false}
            onChange={(page) => {
              pageState.current = page;
              getArticlesOnPageFunction(pageState.current);
            }}
          />
        </div>
      ) : null}
    </div>
  );

  return (
    <Router>
      <Header initial={initial} />
      <section className={classes.section}>
        {error ? (
          <div className={classes['section__error-container']}>Error</div>
        ) : loading ? (
          <div className={classes['section__spin-container']}>
            <p>Loading</p>
            <Spin size="large" className={classes['section__spin']} />
          </div>
        ) : (
          <Switch>
            <Route path="/" exact>
              {articlesList}
            </Route>
            <Route path="/articles" exact>
              {articlesList}
            </Route>
            <Route path="/sign-in" exact>
              <SignIn />
            </Route>
            <Route path="/sign-up" exact>
              <CreateAcc />
            </Route>
            <Route path="/new-article" exact>
              <CreateArticle />
            </Route>
            <Route path="/profile" exact>
              <EditProfile />
            </Route>
            {articles.map((article) => (
              <Route path={`/articles/${article.slug}`} key={article.slug} exact>
                <ShowArticle article={article} initial={initial} />
              </Route>
            ))}
            {articles.map((article) => (
              <Route path={`/articles/${article.slug}/edit`} key={article.slug} exact>
                <EditArticle article={article} />
              </Route>
            ))}
            <Route>
              <div className={classes['section__error-container']}>Page not found</div>
            </Route>
          </Switch>
        )}
      </section>
    </Router>
  );
};

export default App;
