import axios from 'axios';
import { useState, useEffect } from 'react';
import Cards from '@components/movie-card/Movie-Card';
import Loading from '@components/loading/Loading';
import './Trending-Movie.scss';

const trendingMovie = () => {
  const [trendingMovie, setTrendingMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const trendingMovies = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
        );

        const resultTrending = response.data.results;
        setTrendingMovie(resultTrending);
        setIsLoading(false);
      } catch (error) {
        console.log('Cant request trending movie', error);
      }
    };

    trendingMovies();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="trending-movie-container">
          {trendingMovie.slice(0, 18).map((trend) => (
            <Cards
              id={trend.id}
              key={trend.id}
              poster={trend.poster_path}
              title={trend.title}
              date={trend.release_date}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default trendingMovie;
