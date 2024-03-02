import { Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from '@pages/homePage/Home';
import TVShows from '@pages/tv-shows/TV-Shows';
import Watchlist from '@pages/watchlist/Watchlist';
import DetailCard from '@pages/detail-movie/Detail-Card';
import DetailTV from '@pages/detail-tv/Detail-TV';
import TopNav from '@components/top-nav/Top-Nav';
import FooterNav from '@components/footer-nav/Footer';
import AuthRoute from '@components/middleware/authRoute';
import AlertModal from '@components/login-alert/Login-Alert';
const App = () => {
  return (
    <>
      <div className="wrapper">
        <TopNav />
        {/* <AlertModal /> */}
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/tv-shows-detail/:id" element={<DetailTV />} />
          <Route
            path="/watchlist"
            element={
              <AuthRoute>
                <Watchlist />
              </AuthRoute>
            }
          />
          <Route path="/movie-detail/:id" element={<DetailCard />} />
        </Routes>
        <FooterNav />
      </div>
    </>
  );
};

export default App;
