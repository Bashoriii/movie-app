import axios from 'axios';
import { useState, useEffect } from 'react';
import Cards from '@components/movie/movie-card/Movie-Card';
import Loading from '@components/loading/Loading';
import './Nowplay-Movie.scss';

const nowPlayMovie = () => {
  const [nowPlay, setNowPlay] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const nowPlayMovies = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
        );

        const resultNowPlay = response.data.results;
        setNowPlay(resultNowPlay);
        setIsLoading(false);
      } catch (error) {
        console.log('Cant request now playing movie', error);
      }
    };

    nowPlayMovies();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="nowplay-movie-container">
          {nowPlay.slice(0, 18).map((now) => (
            <Cards
              id={now.id}
              key={now.id}
              poster={now.poster_path}
              title={now.title}
              date={now.release_date}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default nowPlayMovie;
