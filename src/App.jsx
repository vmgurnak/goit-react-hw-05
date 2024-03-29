import { Route, Routes } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';

import css from './App.module.css';

function App() {
  return (
    <div className={css.container}>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
