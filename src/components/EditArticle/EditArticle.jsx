import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from '../CreateArticle/CreateArticle.module.scss';
import GetRequest from '../../services/GetRequest';

const EditArticle = (props) => {
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
  const [errorText, setErrorText] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (article.tagList.length !== 0) {
      article.tagList.map((articleTag) => {
        append(articleTag);
      });
    }
  }, []);

  if (isEdit) {
    return <Redirect to={`/articles/${article.slug}`} />;
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
    console.log('data > ', data);
    (async () => {
      return await getRequest
        .editArticle(data, article.slug, user.current.token)
        .then((res) => {
          if (Object.keys(res).includes('errors')) {
            setErrorText('error');
            console.log('error > ', errorText);
            throw new Error();
          } else {
            reset();
            setIsEdit(true);
            location.reload();
            return res;
          }
        })
        .catch(() => {});
    })();
  };

  return (
    <form className={classes['create-article']} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes['create-article__title']}>Edit article</h2>

      <div>
        <label htmlFor="create-article_title" className={classes['create-article__input-label']}>
          Title
        </label>
        <input
          type="text"
          className={!errors.title ? classes['create-article__input'] : classes['create-article__input-error']}
          placeholder="Title"
          defaultValue={article.title}
          id="create-article_title"
          autoFocus
          {...register('title', {
            required: 'Is required to fill in',
          })}
        ></input>
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
          defaultValue={article.description}
          id="create-article_description"
          {...register('description', {
            required: 'Is required to fill in',
          })}
        ></input>

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
          defaultValue={article.body}
          id="create-article_text"
          {...register('body', {
            required: 'Is required to fill in',
          })}
        ></textarea>

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

EditArticle.defaultProps = {
  article: {},
};

EditArticle.propsTypes = {
  article: PropTypes.object,
};

export default EditArticle;
