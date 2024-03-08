import PopularTV from '@components/tv-shows/popular-tv/Popular-tv';
import OnAir from '@components/tv-shows/on-the-air/On-The-Air';

const Home = () => {
  return (
    <>
      <div className="home-container section">
        <div className="cat-title">
          <h1>Popular TV Shows</h1>
        </div>
        <PopularTV />
        <div className="cat-title">
          <h1>On The Air</h1>
        </div>
        <OnAir />
      </div>
    </>
  );
};

export default Home;
