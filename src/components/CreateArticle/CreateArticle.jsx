import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import GetRequest from '../../services/GetRequest';

import classes from './CreateArticle.module.scss';

const CreateArticle = (props) => {
  const { article } = props;
  const getRequest = new GetRequest();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [tag, setTag] = useState('');
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    if (!article.slug) return;
    if (article.tagList.length !== 0) {
      article.tagList.map((articleTag) => {
        append(articleTag);
      });
    }
  }, []);

  if (isCreate) {
    return <Redirect to="/" />;
  }

  if (!localStorage.getItem('user')) {
    return <Redirect to="/sign-in" />;
  }

  const addTag = () => {
    append(tag);
    setTag('');
  };

  const removeTag = (index) => () => {
    remove(index);
  };

  const onChangeTag = (event) => {
    setTag(event.target.value);
  };

  const onSubmit = (data) => {
    if (article.slug) {
      return (async () => {
        return await getRequest
          .editArticle(data, article.slug, user.current.token)
          .then((res) => {
            if (Object.keys(res).includes('errors')) {
              throw new Error();
            } else {
              reset();
              setIsCreate(true);
              location.reload();
              return res;
            }
          })
          .catch(() => {});
      })();
    } else
      return (async () => {
        return await getRequest
          .createArticle(data, user.current.token)
          .then((res) => {
            if (Object.keys(res).includes('errors')) {
              throw new Error();
            } else {
              reset();
              setIsCreate(true);
              location.reload();
              return res;
            }
          })
          .catch(() => {});
      })();
  };

  return (
    <form className={classes['create-article']} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes['create-article__title']}>{article.slug ? 'Edit article' : 'Create new article'}</h2>

      <div>
        <label htmlFor="create-article_title" className={classes['create-article__input-label']}>
          Title
        </label>
        <input
          type="text"
          className={!errors.title ? classes['create-article__input'] : classes['create-article__input-error']}
          placeholder="Title"
          id="create-article_title"
          defaultValue={article.slug ? article.title : null}
          autoFocus
          {...register('title', {
            required: 'Is required to fill in',
          })}
        />
        <div>{errors?.title && <p className={classes['create-article__error']}>{errors?.title.message}</p>}</div>
      </div>

      <div>
        <label htmlFor="create-article_description" className={classes['create-article__input-label']}>
          Short description
        </label>
        <input
          type="text"
          className={!errors.description ? classes['create-article__input'] : classes['create-article__input-error']}
          placeholder="Description"
          id="create-article_description"
          defaultValue={article.slug ? article.description : null}
          {...register('description', {
            required: 'Is required to fill in',
          })}
        />

        <div>
          {errors?.description && <p className={classes['create-article__error']}>{errors?.description.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="create-article_text" className={classes['create-article__input-label']}>
          Text
        </label>
        <textarea
          type="text"
          className={
            !errors.body ? classes['create-article__textarea'] : classes['create-article__input-textarea-error']
          }
          placeholder="Text"
          id="create-article_text"
          defaultValue={article.slug ? article.body : null}
          {...register('body', {
            required: 'Is required to fill in',
          })}
        />

        <div>{errors?.body && <p className={classes['create-article__error']}>{errors?.body.message}</p>}</div>
      </div>

      <div className={classes['create-article__tags']}>
        <div className={classes['create-article__input-label']}>Tags</div>
        <div>
          {fields.map((item, index) => (
            <Fragment key={item.id}>
              <Controller
                name={`tagList[${index}]`}
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    id={item.id}
                    className={classes['create-article__input-tag']}
                    placeholder={field.value}
                    defaultValue={field.value}
                  ></input>
                )}
              />
              <button type="button" className={classes['create-article__button-delete']} onClick={removeTag(index)}>
                Delete
              </button>
              <br />
            </Fragment>
          ))}

          <input
            placeholder="Tag"
            id="create-article_tags"
            className={classes['create-article__input-tag']}
            value={tag}
            onChange={onChangeTag}
          />

          <button type="button" className={classes['create-article__button-add']} onClick={addTag}>
            Add Tag
          </button>
        </div>

        <button type="submit" className={classes['create-article__button-send']}>
          Send
        </button>
      </div>
    </form>
  );
};

CreateArticle.defaultProps = {
  article: {},
};

CreateArticle.propsTypes = {
  article: PropTypes.object,
};

export default CreateArticle;
