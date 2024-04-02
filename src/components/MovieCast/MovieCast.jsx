import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { requestMovieByCast } from '../../services/api';

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState(null);
  console.log(movieCast);

  useEffect(() => {
    if (!movieId) return;
    async function fetchDataCast() {
      try {
        const data = await requestMovieByCast(movieId);
        console.log(data);
        console.log(data.cast);
        setMovieCast(data.cast);
      } catch (err) {
        console.log(err);
      } finally {
      }
    }

    fetchDataCast();
  }, []);

  return <div>MovieCast</div>;
};

export default MovieCast;
