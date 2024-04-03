import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { requestMovieByCast } from '../../services/api';

import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    async function fetchDataCast() {
      try {
        setIsError(false);
        const data = await requestMovieByCast(movieId);

        setMovieCast(data.cast);
      } catch (err) {
        setIsError(true);
        console.log(err);
      }
    }

    fetchDataCast();
  }, []);

  return (
    <div className={css.MovieCastWrap}>
      {isError && <ErrorMessage />}
      {movieCast !== null && (
        <ul className={css.MovieCastList}>
          {movieCast.map(({ cast_id, name, character, profile_path }) => {
            return (
              <>
                {profile_path !== null && (
                  <li className={css.MovieCastItem} key={cast_id}>
                    <img
                      className={css.MovieCastImg}
                      src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                      alt={name}
                    />
                    <p className={css.MovieCastName}>{name}</p>
                    <p className={css.MovieCastChar}>Character: {character}</p>
                  </li>
                )}
              </>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
