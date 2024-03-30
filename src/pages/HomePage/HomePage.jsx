import { useEffect, useState } from 'react';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';

import { requestMovie } from '../../services/api';

import css from './HomePage.module.css';

const HomePage = () => {
  const [movieList, setMovieList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  console.log(movieList);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await requestMovie();
        console.log(data);
        console.log(data.results);
        setMovieList(data.results);
      } catch (err) {
        setIsError(true);
        setMovieList([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={css.HomePageWrap}>
      <h2 className={css.HomePageTitle}>Trending today</h2>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <ul className={css.HomePageList}>
        {movieList.map(({ id, title }) => {
          return (
            <li className={css.HomePageItem} key={id}>
              <MovieList id={id} title={title} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomePage;
