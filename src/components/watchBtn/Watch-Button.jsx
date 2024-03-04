import axios from 'axios';
import Icon from '@mdi/react';
import { useState, useEffect } from 'react';
import { mdiBookmark, mdiCloseThick } from '@mdi/js';
import { Tooltip } from 'react-tooltip';
import { useParams } from 'react-router-dom';
import './Watch-Button.scss';

const watchButton = () => {
  const [isAdded, setIsAdded] = useState(false);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const bearerToken = import.meta.env.VITE_TMDB_TOKEN;

  const { id } = useParams();
  const account_id = window.localStorage.getItem('account_id');
  const session_id = window.localStorage.getItem('session_id');

  const body = {
    media_type: 'movie',
    media_id: id,
    watchlist: true,
  };

  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${bearerToken}`,
  };

  const addToWatchlist = async () => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${account_id}/watchlist?api_key=${apiKey}`,
        body,
        { headers }
      );

      const resultAddToWatchlist = response.data;
      setIsAdded(true);
    } catch (error) {
      console.log('Cant add to watchlist movie', error);
    }
  };

  const removeWatchlist = async () => {
    try {
      const body = {
        media_type: 'movie',
        media_id: id,
        watchlist: false,
      };

      const headers = {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      };

      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${account_id}/watchlist?api_key=${apiKey}`,
        body,
        { headers }
      );

      const resultAddToWatchlist = response.data;
      console.log(resultAddToWatchlist);
      setIsAdded(false);
    } catch (error) {
      console.log('Cant add to watchlist movie', error);
    }
  };

  const statusWatchlist = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/account_states?api_key=${apiKey}&session_id=${session_id}`
    );

    const resultStatus = response.data.watchlist;
    setIsAdded(resultStatus);
  };

  useEffect(() => {
    statusWatchlist();
  }, []);

  return (
    <>
      {!isAdded ? (
        <div className="watchlist-btn">
          <Icon
            onClick={addToWatchlist}
            data-tooltip-id="watchlist"
            data-tooltip-content="Add to Watchlist"
            className="bookmark-icon"
            path={mdiBookmark}
            size={2.2}
          />
          <Tooltip id="watchlist" />
        </div>
      ) : (
        <div className="remove-btn">
          <Icon
            onClick={removeWatchlist}
            data-tooltip-id="remove"
            data-tooltip-content="Remove from Watchlist"
            className="remove-icon"
            path={mdiCloseThick}
            size={2.2}
          />
          <Tooltip id="remove" />
        </div>
      )}
    </>
  );
};

export default watchButton;
