// import { Link } from 'react-router-dom';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import css from './MovieList.module.css';

const MovieList = ({ id, title }) => {
  return (
    <div>
      <Link className={css.MovieListLink} to={`/movies/${id}`}>
        {title}
      </Link>
    </div>
  );
};

export default MovieList;
