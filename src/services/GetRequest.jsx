import React from 'react';

export default class GetRequest extends React.Component {
  _apiBase = 'https://blog.kata.academy/api/';

  async getResoursesFetch(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (res.ok) {
      return await res.json();
    } else throw new Error();
  }

  async getArticlesCount() {
    const res = await this.getResoursesFetch('articles');
    return res.articlesCount;
  }

  async getArticles(page) {
    // let res = await this.getResoursesFetch('articles');
    const articlesCount = this.getArticlesCount();

    const res = await this.getResoursesFetch(`articles?limit=${articlesCount}`);
    console.log('res >', res);

    // return res.articles;

    console.log('page FETCH > ', page);

    if (page === 1) {
      return res.articles.slice(0, 5);
    } else {
      return res.articles.slice((page - 1) * 5, page * 5);
    }
  }
}
