import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { requestMovieByReviews } from '../../services/api';

import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    async function fetchDataReviews() {
      try {
        setIsError(false);
        const data = await requestMovieByReviews(movieId);
        setMovieReviews(data.results);
      } catch (err) {
        setIsError(true);
        console.log(err);
      }
    }
    fetchDataReviews();
  }, [movieId]);

  return (
    <div className={css.MovieReviewsWrap}>
      {isError && <ErrorMessage />}
      {movieReviews !== null && (
        <ul className={css.MovieReviewsList}>
          {movieReviews.map(({ id, author, content }) => {
            return (
              <li className={css.MovieReviewsItem} key={id}>
                <p className={css.MovieReviewsAuthor}>Author: {author}</p>
                <p className={css.MovieReviewsCont}>{content}</p>
              </li>
            );
          })}
        </ul>
      )}
      {movieReviews !== null && movieReviews.length === 0 && (
        <p className={css.MovieReviewsNotif}>
          We don&apos;t have any reviews for this movie
        </p>
      )}
    </div>
  );
};

export default MovieReviews;
