import { Link, useLocation } from 'react-router-dom';

import css from './MovieList.module.css';

const MovieList = ({ movieList }) => {
  const location = useLocation();
  return (
    <ul className={css.MovieList}>
      {movieList.map(({ id, title }) => {
        return (
          <li className={css.MovieListItem} key={id}>
            <Link
              className={css.MovieListLink}
              to={`/movies/${id}`}
              state={location}
            >
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
