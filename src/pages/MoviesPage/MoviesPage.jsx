// import toast library for notification when the form is empty
import toast, { Toaster } from 'react-hot-toast';
// import library Formik

// import huks
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// import components
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import SearchForm from '../../components/SearchForm/SearchForm';

// import function request from api https://api.unsplash.com
import { requestMovieByQuery } from '../../services/api';

import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  useEffect(() => {
    if (searchQuery === null) {
      return;
    }
    async function fetchDataByQuery() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await requestMovieByQuery(searchQuery);
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

  // callback function for handlerSubmit SearchForm
  const onSetSearchParams = query => {
    if (query === searchQuery) {
      return;
    }
    setSearchParams({ query: query });
    setMovieList([]);
  };

  return (
    <div className={css.MoviesPageWrap}>
      <SearchForm
        onSetSearchParams={onSetSearchParams}
        searchQuery={searchQuery}
      />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <MovieList movieList={movieList} />
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
