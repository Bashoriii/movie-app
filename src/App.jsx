import { Route, Routes, Link } from 'react-router-dom';
import Home from '@pages/homePage/Home';
import Watchlist from '@pages/watchlist/Watchlist';
import TopNav from '@components/top-nav/Top-Nav';

const App = () => {
  return (
    <>
      <div className="wrapper">
        <TopNav />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
