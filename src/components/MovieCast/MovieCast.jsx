import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieCast = () => {
  const { movieId } = useParams();
  return <div>MovieCast</div>;
};

export default MovieCast;
