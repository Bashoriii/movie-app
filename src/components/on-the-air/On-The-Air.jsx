import axios from 'axios';
import { useState, useEffect } from 'react';
import TVShow from '@components/tv-shows-card/Card';
import Loading from '@components/loading/Loading';
import './On-The-Air.scss';

const onTheAir = () => {
  const [onAir, setOnAir] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const onAirTv = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}`
        );

        const resultPopular = response.data.results;
        setOnAir(resultPopular);
        setIsLoading(false);
      } catch (error) {
        console.log('Cant request popular TV', error);
      }
    };

    onAirTv();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="popular-tv-container">
          {onAir.slice(0, 18).map((onair) => (
            <TVShow
              id={onair.id}
              key={onair.id}
              poster={onair.poster_path}
              title={onair.name}
              date={onair.first_air_date}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default onTheAir;
