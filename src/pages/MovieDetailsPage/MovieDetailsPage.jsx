import { useEffect, useState, useRef } from 'react';
import { Link, Route, Routes, useParams, useLocation } from 'react-router-dom';
// import react icons
import { FaArrowLeftLong } from 'react-icons/fa6';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import MovieCast from '../../components/MovieCast/MovieCast';
import { MovieReviews } from '../../components/MovieReviews/MovieReviews';

import { requestMovieById } from '../../services/api';

import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  // Get the movie ID from the URL parameter.
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');

  console.log(movieId);

  useEffect(() => {
    if (!movieId) return;
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
        {movieData !== null && (
          <div>
            <div className={css.GoBackWrap}>
              <Link className={css.GoBackLink} to={backLinkRef.current}>
                Go back
              </Link>
              <FaArrowLeftLong className={css.GoBackIcon} size="16" />
            </div>
            <div className={css.MovieInfoWrap}>
              <div className={css.MovieImgWrap}>
                <img
                  className={css.MovieImg}
                  src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                  alt=""
                />
              </div>
              <div className={css.MovieContWrap}>
                <h2 className={css.MovieTitle}>{movieData.title}</h2>
                <p className={css.MovieScore}>
                  User Score: {movieData.vote_average}
                </p>
                <h3 className={css.OverviewTitle}>Overview</h3>
                <p className={css.OverviewCont}>{movieData.overview}</p>
                <h4 className={css.MovieGanresTitle}>Genres</h4>
                <p className={css.MovieGanresCont}>
                  {movieData.genres.map(({ name }) => name).join(' ')}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className={css.AddInfoSection}>
        <div className={css.AddInfoWrap}>
          <h4 className={css.AddInfoTitle}>Additional information</h4>
          <ul className={css.AddInfoList}>
            <li className={css.AddInfoItem}>
              <Link to="cast" className={css.AddInfoLink}>
                Cast
              </Link>
            </li>
            <li className={css.AddInfoItem}>
              <Link to="reviews" className={css.AddInfoLink}>
                Reviews
              </Link>
            </li>
          </ul>
        </div>
        <div className={css.AddInfoCont}></div>
      </section>
      <section>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </section>
    </div>
  );
};

export default MovieDetailsPage;
