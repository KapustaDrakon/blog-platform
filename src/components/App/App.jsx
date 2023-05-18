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
import GetRequest from '../../services/GetRequest';

import classes from './App.module.scss';
import './AppAntd.css';

const App = () => {
  const getRequest = new GetRequest();

  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  let pageState = useRef(1);
  const [loading, setLoad] = useState(true);
  const [error, setError] = useState(false);

  const getArticlesFunction = (pageState) => {
    (async () => {
      return await getRequest.getArticles(pageState).then((res) => {
        setError(false);
        setLoad(false);
        setArticles(res);
      });
    })();
  };

  const getArticlesCountFunction = () => {
    (async () => {
      return await getRequest.getArticlesCount().then((res) => {
        setError(false);
        setLoad(false);
        setArticlesCount(res);
      });
    })();
  };

  useEffect(() => {
    getArticlesFunction(pageState.current);
    getArticlesCountFunction();
  }, []);

  //let user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <div>
        <Header />
        <section className={classes.section}>
          {error ? <div className={classes['section__error-container']}>Error</div> : null}
          {loading ? (
            <div className={classes['section__spin-container']}>
              <p>Loading</p>
              <Spin size="large" className={classes['section__spin']} />
            </div>
          ) : (
            <Switch>
              <Route path="/" exact>
                <div>
                  <ArticlesList articles={articles} />
                  <Pagination
                    className={classes['section__pagination']}
                    current={pageState.current}
                    total={articlesCount}
                    pageSize={5}
                    showSizeChanger={false}
                    onChange={(page) => {
                      pageState.current = page;
                      getArticlesFunction(pageState.current);
                    }}
                  />
                </div>
              </Route>
              <Route path="/articles" exact>
                <div>
                  <ArticlesList articles={articles} />
                  <Pagination
                    className={classes['section__pagination']}
                    current={pageState.current}
                    total={articlesCount}
                    pageSize={5}
                    showSizeChanger={false}
                    onChange={(page) => {
                      pageState.current = page;
                      getArticlesFunction(pageState.current);
                    }}
                  />
                </div>
              </Route>
              <Route path="/sign-in" exact>
                <SignIn />
              </Route>
              <Route path="/sign-up" exact>
                <CreateAcc />
              </Route>
              <Route path="/create-article" exact>
                <CreateArticle />
              </Route>
              <Route path="/profile" exact>
                <EditProfile />
              </Route>
              {articles.map((article) => (
                <Route path={`/articles/${article.slug}`} key={article.slug} exact>
                  <ShowArticle article={article} />
                </Route>
              ))}
            </Switch>
          )}
        </section>
      </div>
    </Router>
  );
};

export default App;
