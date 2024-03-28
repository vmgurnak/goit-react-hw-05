import { Link } from 'react-router-dom';

import css from './MovieList.module.css';

const MovieList = ({ id, alt_description }) => {
  return (
    <div>
      <Link className={css.MovieListLink} to={`/movies/${id}`}>
        {alt_description}
      </Link>
    </div>
  );
};

export default MovieList;
