import React from 'react';

export default class GetRequest extends React.Component {
  _apiBase = 'https://blog.kata.academy/api/';

  async getResoursesFetch(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (res.ok) {
      return await res.json();
    } else throw new Error();
  }

  async postResoursesFetch(url, data) {
    return await fetch(`${this._apiBase}${url}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ user: { ...data } }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 422) {
        return res.json();
      }
    });
  }

  async putResoursesFetch(url, data) {
    return await fetch(`${this._apiBase}${url}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${data.token}`,
      },
      body: JSON.stringify({ user: { ...data } }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 422) {
        return res.json();
      }
    });
  }

  async userRegister(data) {
    return await this.postResoursesFetch('users', data);
  }

  async userLogin(data) {
    return await this.postResoursesFetch('users/login', data);
  }

  async userEdit(data) {
    return await this.putResoursesFetch('user', data);
  }

  async getArticlesCount() {
    const res = await this.getResoursesFetch('articles');
    return res.articlesCount;
  }

  async getArticles(page) {
    const articlesCount = this.getArticlesCount();
    const res = await this.getResoursesFetch(`articles?limit=${articlesCount}`);

    if (page === 1) {
      return res.articles.slice(0, 5);
    } else {
      return res.articles.slice((page - 1) * 5, page * 5);
    }
  }
}
