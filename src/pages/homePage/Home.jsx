import TrendingMovie from '@components/movie/trending-movie/Trending-Movie';
import NowPlaying from '@components/movie/nowplay-movie/Nowplay-Movie';
import './Home.scss';

const Home = () => {
  return (
    <>
      <div className="home-container section">
        <div className="cat-title">
          <h1>Trending Movies</h1>
        </div>
        <TrendingMovie />
        <div className="cat-title">
          <h1>Now Playing Movies</h1>
        </div>
        <NowPlaying />
      </div>
    </>
  );
};

export default Home;
