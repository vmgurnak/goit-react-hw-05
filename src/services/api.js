import axios from 'axios';

const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzcyM2ZiMmM5MTkxNGU3MWEzOGYzNDJjZjBmOGIwNCIsInN1YiI6IjY1M2ZkNzQyNTkwN2RlMDEzOGUyZGRjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sp8qMawUjEgzw9wcpwA81PeCZQ7W8tu-uYEsM9_rj70';

export const requestMovie = async () => {
  const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day';
  const config = {
    params: {
      language: 'en-US',
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const { data } = await axios.get(`${BASE_URL}`, config);
  return data;
};

export const requestMovieByQuery = async query => {
  const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
  const config = {
    params: {
      language: 'en-US',
      query,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const { data } = await axios.get(`${BASE_URL}`, config);
  return data;
};

export const requestMovieById = async id => {
  const BASE_URL = 'https://api.themoviedb.org/3/movie/';
  const config = {
    params: {
      language: 'en-US',
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const { data } = await axios.get(`${BASE_URL}${id}`, config);
  return data;
};

export const requestMovieByCast = async id => {
  const BASE_URL = 'https://api.themoviedb.org/3/movie/';
  const config = {
    params: {
      language: 'en-US',
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const { data } = await axios.get(`${BASE_URL}${id}/credits`, config);
  return data;
};
