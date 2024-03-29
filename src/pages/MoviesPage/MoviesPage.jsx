// import toast library for notification when the form is empty
import toast, { Toaster } from 'react-hot-toast';

// import library Formik
import { Formik, Form, Field } from 'formik';

// import huks
import { useEffect, useState } from 'react';

// import components
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';

// import function request from api https://api.unsplash.com
import { requestMovieByQuery } from '../../services/api';

import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (searchQuery === null) {
      return;
    }
    async function fetchDataByQuery() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await requestMovieByQuery(searchQuery);
        console.log(data);
        console.log(data.results);

        if (data.results.length === 0) {
          toast(
            'Sorry, there are no movies your search query. Please try again.'
          );
          setMovieList([]);
          return;
        } else {
          setMovieList(data.results);
        }
      } catch (err) {
        setIsError(true);
        setMovieList([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDataByQuery();
  }, [searchQuery]);

  // callback function for handlerSubmit
  const onSetSearchQuery = query => {
    if (query === searchQuery) {
      return;
    }
    setSearchQuery(query);
    setMovieList([]);
  };

  // Callback function for Submit
  const handlerSubmit = (values, actions) => {
    if (!values.query.trim()) {
      toast('Please enter your request.');
      // alert('Please enter your request');
      return;
    }
    onSetSearchQuery(values.query);
    console.log(values.query);
    actions.resetForm();
  };

  const initialValues = {
    query: '',
  };

  return (
    <div className={css.MoviesPageWrap}>
      <Formik initialValues={initialValues} onSubmit={handlerSubmit}>
        <Form className={css.MoviesPageForm} autoComplete="off">
          <Field className={css.MoviesPageInput} name="query" type="text" />
          <button className={css.MoviesPageBtn} type="submit">
            Search
          </button>
        </Form>
      </Formik>

      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <ul className={css.MoviesPageList}>
        {movieList.map(({ id, title }) => {
          return (
            <li key={id}>
              <MovieList id={id} title={title} />
            </li>
          );
        })}
      </ul>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(157, 222, 255, 0.9)',
            color: '#000',
          },
        }}
      />
    </div>
  );
};

export default MoviesPage;
