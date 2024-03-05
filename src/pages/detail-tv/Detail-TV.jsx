import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '@components/loading/Loading';
import TVRecomend from '@components/tv-recomendation/Recomendations';
import axios from 'axios';
import Icon from '@mdi/react';
import { mdiHeart, mdiBookmark } from '@mdi/js';
import { Tooltip } from 'react-tooltip';
import TvWatchlistBtn from '@components/watchlistTvBtn/TV-Watchlist';
import './Detail-TV.scss';

const detailTvCard = () => {
  const [detail, setDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const { id } = useParams();

  useEffect(() => {
    const tvDetail = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
        );

        const resultTvDetail = response.data;
        setDetail(resultTvDetail);
        setIsLoading(false);
      } catch (error) {
        console.log('Cant get detail tv', error);
      }
    };

    tvDetail();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="detail-tv-container">
          <div
            className="backdrop-img-container"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(http://image.tmdb.org/t/p/w500/${detail.backdrop_path})`,
            }}
          >
            <div className="info-container section">
              <div className="poster-img">
                <img
                  src={`http://image.tmdb.org/t/p/w500/${detail.poster_path}`}
                  alt="poster"
                />
              </div>
              <div className="detail-text">
                <div className="title">
                  <h3>
                    {detail.name}{' '}
                    <span>
                      ({new Date(detail.first_air_date).getFullYear()})
                    </span>
                  </h3>
                  <p>
                    {new Date(detail.first_air_date).toLocaleDateString()} •{' '}
                    {detail.genres && detail.genres.length > 0 && (
                      <>{detail.genres.map((genre) => genre.name).join(', ')}</>
                    )}{' '}
                  </p>
                </div>
                <div className="bookmark-and-fav">
                  <div className="favorite-btn">
                    <Icon
                      data-tooltip-id="favorite"
                      data-tooltip-content="Add to Favorites"
                      className="favorite-icon"
                      path={mdiHeart}
                      size={2.2}
                    />
                    <Tooltip id="favorite" />
                  </div>
                  <TvWatchlistBtn></TvWatchlistBtn>
                </div>
                <div className="overview">
                  <p className="overview-title">Overview</p>
                  <p>{detail.overview}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="recomend">
            <TVRecomend />
          </div>
        </div>
      )}
    </>
  );
};

export default detailTvCard;
