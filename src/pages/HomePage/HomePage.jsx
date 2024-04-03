import { useEffect, useState } from 'react';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieList from '../../components/MovieList/MovieList';

import { requestMovie } from '../../services/api';

import css from './HomePage.module.css';

const HomePage = () => {
  const [movieList, setMovieList] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsError(false);
        const data = await requestMovie();
        setMovieList(data.results);
      } catch (err) {
        setIsError(true);
        setMovieList([]);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={css.HomePageWrap}>
      <h2 className={css.HomePageTitle}>Trending today</h2>
      {isError && <ErrorMessage />}
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
