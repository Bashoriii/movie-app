import Icon from '@mdi/react';
import { mdiBookmarkOffOutline } from '@mdi/js';
import './No-Watchlist.scss';

const NoWatchlist = () => {
  return (
    <>
      <div className="no-watchlist-container section">
        <Icon path={mdiBookmarkOffOutline} size={4} />
        <p>You have no watchlist yet</p>
      </div>
    </>
  );
};

export default NoWatchlist;
