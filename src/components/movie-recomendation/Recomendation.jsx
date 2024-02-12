import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from '@components/loading/Loading';
import './Recomendation.scss';

const recomendMovie = () => {
  const [recomend, setRecomendation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const recomendations = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`
        );

        const resultRecomend = response.data.results;
        setRecomendation(resultRecomend);
        setIsLoading(false);
      } catch (error) {
        console.log('Cant request recomend movie', error);
      }
    };

    recomendations();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="recomended-movie-container section">
          <div className="cat-title">
            <h1>Recomendation</h1>
          </div>
          <Swiper
            spaceBetween={10}
            slidesPerView={6}
            // slidesPerGroup={6}
            // loop={true}
          >
            {recomend.slice(0, 18).map((recomend) =>
              recomend.poster_path ? (
                <SwiperSlide key={recomend.id} className="card-slider">
                  <Link to={`/movie-detail/${recomend.id}`} className="card">
                    <div className="poster-image">
                      <img
                        src={`http://image.tmdb.org/t/p/w500/${recomend.poster_path}`}
                        alt="poster"
                      />
                    </div>
                    <div className="title-and-year">
                      <p className="title">{recomend.title}</p>
                      <span>
                        {new Date(recomend.release_date).getFullYear()}
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              ) : null
            )}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default recomendMovie;
