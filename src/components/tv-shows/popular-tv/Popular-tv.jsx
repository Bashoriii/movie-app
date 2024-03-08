import axios from 'axios';
import { useState, useEffect } from 'react';
import TVShow from '@components/tv-shows/tv-shows-card/Card';
import Loading from '@components/loading/Loading';
import './Popular-tv.scss';

const popularTv = () => {
  const [popularTv, setPopularTv] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const popularTvs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`
        );

        const resultPopular = response.data.results;
        setPopularTv(resultPopular);
        setIsLoading(false);
      } catch (error) {
        console.log('Cant request popular TV', error);
      }
    };

    popularTvs();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="popular-tv-container">
          {popularTv.slice(0, 18).map((popular) => (
            <TVShow
              id={popular.id}
              key={popular.id}
              poster={popular.poster_path}
              title={popular.name}
              date={popular.first_air_date}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default popularTv;
