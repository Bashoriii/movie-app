import { Link } from 'react-router-dom';
import LoginBtn from '@components/loginBtn/Login-Button';
import './Top-Nav.scss';

const TopNav = () => {
  return (
    <>
      <div className="top-nav-container">
        <nav className="main-nav section">
          <div className="kinema-logo">
            <Link to="/">Kinema</Link>
          </div>
          <div className="nav-list">
            <Link to="/">Movie</Link>
            <Link to="/tv-shows">TV Shows</Link>
            <Link to="/watchlist">Watchlist</Link>
            <LoginBtn />
          </div>
        </nav>
      </div>
    </>
  );
};

export default TopNav;
