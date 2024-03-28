import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import css from './Navigation.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx([css.headerLink], isActive && css.active);
};

const Navigation = () => {
  return (
    <header className={css.header}>
      <nav className={css.headerList}>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/movies">
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
