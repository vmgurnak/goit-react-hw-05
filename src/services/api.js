import axios from 'axios';

export const requestProducts = async () => {
  const { data } = await axios.get('https://dummyjson.com/products');
  return data;
};

export const requestProductsByQuery = async query => {
  const { data } = await axios.get(
    `https://dummyjson.com/products/search?q=${query}`
  );
  return data;
};

export const requestProductsById = async productId => {
  const { data } = await axios.get(
    `https://dummyjson.com/products/${productId}`
  );
  return data;
};

const requestMovie = async (query = 'sea', currentPage = 1) => {
  const API_KEY = 'wA65yMsuVtaGEz26VTfXV2EuMFpmBDIORhh0BZRN2ls';
  const BASE_URL = 'https://api.unsplash.com/search/photos';
  const config = {
    params: {
      client_id: API_KEY,
      query,
      page: currentPage,
    },
  };

  const { data } = await axios.get(`${BASE_URL}`, config);
  return data;
};

export { requestMovie };

const requestMovieByQuery = async (query, currentPage = 1, perPage) => {
  const API_KEY = 'wA65yMsuVtaGEz26VTfXV2EuMFpmBDIORhh0BZRN2ls';
  const BASE_URL = 'https://api.unsplash.com/search/photos';
  const config = {
    params: {
      client_id: API_KEY,
      query,
      page: currentPage,
      per_page: perPage,
    },
  };

  const { data } = await axios.get(`${BASE_URL}`, config);
  return data;
};

export { requestMovieByQuery };
