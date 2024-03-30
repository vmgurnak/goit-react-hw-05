import { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import MovieCast from '../../components/MovieCast/MovieCast';
import { MovieReviews } from '../../components/MovieReviews/MovieReviews';

import { requestMovieById } from '../../services/api';

import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  // Get the movie ID from the URL parameter.
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  console.log(movieId);

  useEffect(() => {
    async function fetchDataId() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await requestMovieById(movieId);
        console.log(data);
        setMovieData(data);
      } catch (err) {
        setIsError(true);
        setMovieData({});
      } finally {
        setIsLoading(false);
      }
    }

    fetchDataId();
  }, [movieId]);

  return (
    <div className={css.MovieWrap}>
      <section className={css.MovieInfoSection}>
        {isError && <ErrorMessage />}
        {isLoading && <Loader />}
        <div className={css.MovieInfoWrap}>
          <img
            className={css.MovieImg}
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt=""
          />
          <div className={css.MovieContWrap}>
            <h2 className={css.MovieTitle}>{movieData.title}</h2>
            <p className={css.MovieTitle}>
              User Score: {movieData.vote_average}
            </p>
            <h3 className={css.OverviewTitle}>Overview</h3>
            <p className={css.OverviewCont}>{movieData.overview}</p>
            <h4 className={css.MovieGanresTitle}>Genres</h4>
            <p className={css.MovieGanresCont}>
              {/* {movieData.genres[0].name.join(' ')} */}
              {movieData.genres.map(({ name }) => name).join(' ')}
            </p>
          </div>
        </div>
      </section>
      <section className={css.AddInfoSection}>
        <div className={css.AddInfoWrap}>
          <h4>Additional information</h4>
          <ul className={css.AddInfoList}>
            <Link className={css.AddInfoLink}>Cast</Link>
            <Link className={css.AddInfoLink}>Reviews</Link>
          </ul>
        </div>
        <div className={css.AddInfoCont}>
          <Routes>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Routes>
        </div>
      </section>
    </div>
  );
};

export default MovieDetailsPage;
