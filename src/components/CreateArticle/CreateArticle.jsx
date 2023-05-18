import React from 'react';
import { useForm } from 'react-hook-form';

import classes from './CreateArticle.module.scss';

const CreateArticle = () => {
  const { register, handleSubmit, reset } = useForm({
    mode: 'onSubmit',
  });
  //const tagList = [];

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form className={classes['create-article']} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes['create-article__title']}>Create new article</h2>

      <div>
        <label htmlFor="create-article_title" className={classes['create-article__input-label']}>
          Title
        </label>
        <input
          type="text"
          className={classes['create-article__input']}
          placeholder="Title"
          id="create-article_title"
          autoFocus
          {...register('title')}
        ></input>
      </div>

      <div>
        <label htmlFor="create-article_description" className={classes['create-article__input-label']}>
          Short description
        </label>
        <input
          type="text"
          className={classes['create-article__input']}
          placeholder="Description"
          id="create-article_description"
          {...register('description')}
        ></input>
      </div>

      <div>
        <label htmlFor="create-article_text" className={classes['create-article__input-label']}>
          Text
        </label>
        <textarea
          type="text"
          className={classes['create-article__textarea']}
          placeholder="Text"
          id="create-article_text"
          {...register('body')}
        ></textarea>
      </div>

      <div className={classes['create-article__tags']}>
        <div>
          <label htmlFor="create-article_tags" className={classes['create-article__input-label']}>
            Tags
          </label>
          <input
            type="text"
            className={classes['create-article__input-tag']}
            placeholder="Tag"
            id="create-article_tags"
            {...register('tag')}
          ></input>
          <button className={classes['create-article__button-delete']}>Delete</button>
          <button className={classes['create-article__button-add']}>Add tag</button>
        </div>

        <div>
          <input
            type="text"
            className={classes['create-article__input-tag']}
            placeholder="Tag"
            id="create-article_tags"
            {...register('tag')}
          ></input>
          <button className={classes['create-article__button-delete']}>Delete</button>
          <button className={classes['create-article__button-add']}>Add tag</button>
        </div>
      </div>

      <button type="submit" className={classes['create-article__button-send']}>
        Send
      </button>
    </form>
  );
};

export default CreateArticle;
