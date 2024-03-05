import axios from 'axios';
import Icon from '@mdi/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mdiBookmark, mdiCloseThick } from '@mdi/js';
import SuccessAlert from '@components/success-alert/Success-Alert';
import RemoveAlert from '@components/remove-alert/Remove-Alert';
import { Tooltip } from 'react-tooltip';
import './TV-Watchlist.scss';

const TvWatchlist = () => {
  const [isAdded, setIsAdded] = useState(false);
  const [successAlert, setsuccessAlert] = useState(false);
  const [removeAlert, setremoveAlert] = useState(false);
  const { id } = useParams();

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const bearerToken = import.meta.env.VITE_TMDB_TOKEN;
  const account_id = window.localStorage.getItem('account_id');
  const session_id = window.localStorage.getItem('session_id');

  const body = {
    media_type: 'tv',
    media_id: id,
    watchlist: true,
  };

  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${bearerToken}`,
  };

  const addTvToWatchlist = async () => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${account_id}/watchlist?api_key=${apiKey}`,
        body,
        { headers }
      );

      const resultAddTvWatchlist = response.data;
      setIsAdded(true);
      setsuccessAlert(true);

      setTimeout(() => {
        setsuccessAlert(false);
      }, 1300);
    } catch (error) {
      console.log(error);
    }
  };

  const removeTvWatchlist = async () => {
    try {
      const body = {
        media_type: 'tv',
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
      setIsAdded(false);
      setremoveAlert(true);

      setTimeout(() => {
        setremoveAlert(false);
      }, 1300);
    } catch (error) {
      console.log('Cant add to watchlist movie', error);
    }
  };

  const statusWatchlist = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/account_states?api_key=${apiKey}&session_id=${session_id}`
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
        <div className="tv-watchlist-btn">
          <Icon
            onClick={addTvToWatchlist}
            data-tooltip-id="watchlist"
            data-tooltip-content="Add to Watchlist"
            className="bookmark-icon"
            path={mdiBookmark}
            size={2.2}
          />
          <Tooltip id="watchlist" />
        </div>
      ) : (
        <div className="tv-watchlist-btn">
          <Icon
            onClick={removeTvWatchlist}
            data-tooltip-id="watchlist"
            data-tooltip-content="Remove from Watchlist"
            className="remove-icon"
            path={mdiCloseThick}
            size={2.2}
          />
          <Tooltip id="watchlist" />
        </div>
      )}
      {successAlert && <SuccessAlert theMsg={'Added to Watchlist!'} />}
      {removeAlert && <RemoveAlert theMsg={'Removed from Watchlist!'} />}
    </>
  );
};

export default TvWatchlist;
