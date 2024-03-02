import axios from 'axios';
import { useState, useEffect } from 'react';
import Cards from '@components/movie-card/Movie-Card';
import './Watchlist.scss';

const WatchlistMovieTV = () => {
  const [watch, setWatchList] = useState([]);

  const fetchWatchlist = async () => {
    try {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const bearerToken = import.meta.env.VITE_TMDB_TOKEN;
      const account_id = window.localStorage.getItem('account_id');

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      };

      const response = await axios.get(
        `https://api.themoviedb.org/4/account/${account_id}/movie/watchlist?api_key=${apiKey}`,
        { headers }
      );

      const resultWatchlist = response.data.results;
      setWatchList(resultWatchlist);
      console.log(resultWatchlist);
    } catch (error) {
      console.log(error, 'Cant get watchlist');
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <>
      <div className="watchlist-container section">
        <div className="cat-title">
          <h1>Watchlist</h1>
        </div>
        <div className="watchlist-card">
          {watch.slice(0, 2).map((watchlist) => (
            <Cards
              id={watchlist.id}
              key={watchlist.id}
              poster={watchlist.poster_path}
              title={watchlist.title}
              date={watchlist.release_date}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default WatchlistMovieTV;
