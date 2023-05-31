import React from 'react';

export default class GetRequest extends React.Component {
  _apiBase = 'https://blog.kata.academy/api/';
  user = JSON.parse(localStorage.getItem('user'));

  async getResoursesFetch(url) {
    if (this.user) {
      return await fetch(`${this._apiBase}${url}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${this.user.token}`,
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else throw new Error();
      });
    } else {
      return await fetch(`${this._apiBase}${url}`).then((res) => {
        if (res.ok) {
          return res.json();
        } else throw new Error();
      });
    }
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

  async postArticleResoursesFetch(url, data, token) {
    return await fetch(`${this._apiBase}${url}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article: { ...data } }),
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

  async putArticleResoursesFetch(url, data, token) {
    return await fetch(`${this._apiBase}${url}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article: { ...data } }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 422) {
        return res.json();
      }
    });
  }

  async deleteArticleResoursesFetch(url, token) {
    return await fetch(`${this._apiBase}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return 'ok';
      } else if (res.status === 422) {
        return res.json();
      }
    });
  }

  async changeLikeArticleFetch(url, token, like) {
    if (like) {
      return await fetch(`${this._apiBase}${url}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 422) {
          return res.json();
        }
      });
    } else {
      return await fetch(`${this._apiBase}${url}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 422) {
          return res.json();
        }
      });
    }
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

  async likeArticle(like, slug, token) {
    return await this.changeLikeArticleFetch(`articles/${slug}/favorite`, token, like);
  }

  async createArticle(data, token) {
    return await this.postArticleResoursesFetch('articles', data, token);
  }

  async editArticle(data, slug, token) {
    return await this.putArticleResoursesFetch(`articles/${slug}`, data, token);
  }

  async deleteArticle(slug, token) {
    return await this.deleteArticleResoursesFetch(`articles/${slug}`, token);
  }

  async getArticlesCount() {
    const res = await this.getResoursesFetch('articles');
    return res.articlesCount;
  }

  async getArticles() {
    const articlesCount = this.getArticlesCount();
    return await this.getResoursesFetch(`articles?limit=${articlesCount}`);
  }

  async getArticle(slug) {
    return await this.getResoursesFetch(`articles/${slug}`);
  }

  async getArticlesOnPage(page) {
    const articlesCount = this.getArticlesCount();
    const res = await this.getResoursesFetch(`articles?limit=${articlesCount}`);

    if (page === 1) {
      return res.articles.slice(0, 5);
    } else {
      return res.articles.slice((page - 1) * 5, page * 5);
    }
  }
}
