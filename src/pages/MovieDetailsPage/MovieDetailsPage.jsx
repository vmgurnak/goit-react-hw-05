import { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';

import { requestMovieById } from '../../services/api';

import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  // Get the movie ID from the URL parameter.
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
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
        console.log(data.results);
        setMovieData(data.results);
      } catch (err) {
        setIsError(true);
        setMovieData({});
      } finally {
        setIsLoading(false);
      }
    }

    fetchDataId();
  }, [movieId]);

  return <div>MovieDetailsPage {movieId}</div>;
};

export default MovieDetailsPage;
