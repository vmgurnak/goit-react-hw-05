import { Link, useLocation } from 'react-router-dom';

import css from './MovieList.module.css';

const MovieList = ({ id, title }) => {
  const location = useLocation();
  return (
    <div>
      <Link className={css.MovieListLink} to={`/movies/${id}`} state={location}>
        {title}
      </Link>
    </div>
  );
};

export default MovieList;
