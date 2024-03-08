import axios from 'axios';
import { useState, useEffect } from 'react';
import MovieCards from '@components/movie/movie-card/Movie-Card';
import TvCards from '@components/tv-shows/tv-shows-card/Card';
import Loading from '@components/loading/Loading';
import NoWatchlist from '@components/no-watchlist/No-Watchlist';
import './Watchlist.scss';

const WatchlistMovieTV = () => {
  const [movieWatch, setMovieWatch] = useState([]);
  const [tvWatch, setTvWatch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const bearerToken = import.meta.env.VITE_TMDB_TOKEN;

  const account_id = window.localStorage.getItem('account_id');

  const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${bearerToken}`,
  };

  const movieWatchlist = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/4/account/${account_id}/movie/watchlist?api_key=${apiKey}`,
        { headers }
      );
      const resultMovieWatchlist = response.data.results;
      setMovieWatch(resultMovieWatchlist);
      setIsLoading(false);
    } catch (error) {
      console.log('Cant fetch watchlist movie', error);
    }
  };

  const tvShowWatchlist = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/4/account/${account_id}/tv/watchlist?api_key=${apiKey}`,
        { headers }
      );
      const resultTvWatchlist = response.data.results;
      setTvWatch(resultTvWatchlist);
      setIsLoading(false);
    } catch (error) {
      console.log('Cant fetch watchlist tv shows', error);
    }
  };

  useEffect(() => {
    movieWatchlist();
    tvShowWatchlist();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {movieWatch.length === 0 && tvWatch.length === 0 ? (
            <NoWatchlist />
          ) : (
            <>
              <div className="movie-watchlist-container section">
                {movieWatch.length === 0 ? null : (
                  <div className="cat-title">
                    <h1>Your Movie Watchlist</h1>
                  </div>
                )}
                <div className="watchlist-card">
                  {movieWatch.slice(0, 18).map((movie) => (
                    <MovieCards
                      id={movie.id}
                      key={movie.id}
                      poster={movie.poster_path}
                      title={movie.title}
                      date={movie.release_date}
                    ></MovieCards>
                  ))}
                </div>
              </div>

              <div className="tv-watchlist-container section">
                {tvWatch.length === 0 ? null : (
                  <div className="cat-title">
                    <h1>Your TV Shows Watchlist</h1>
                  </div>
                )}
                <div className="watchlist-card">
                  {tvWatch.slice(0, 18).map((tvWatch) => (
                    <TvCards
                      id={tvWatch.id}
                      key={tvWatch.id}
                      poster={tvWatch.poster_path}
                      title={tvWatch.name}
                      date={tvWatch.first_air_date}
                    ></TvCards>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default WatchlistMovieTV;
