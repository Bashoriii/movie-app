import axios from 'axios';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardSlider from '@components/card/Card-Slider';
import './Home.scss';

const Home = () => {
  const [upComing, setUpComing] = useState([]);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const upComingMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
        );

        const resultUpComingMovie = response.data.results;
        setUpComing(resultUpComingMovie);
        console.log(resultUpComingMovie);
      } catch (error) {
        console.log('Cant request upcoming movie', error);
      }
    };

    upComingMovie();
  }, []);
  return (
    <>
      <div className="home-container section">
        <div className="cat-title">
          <h1>Up Coming Movies</h1>
        </div>
        <div className="upcoming-movie-container">
          {upComing.slice(0, 18).map((upcome) => (
            <CardSlider
              id={upcome.id}
              key={upcome.id}
              poster={upcome.poster_path}
              title={upcome.title}
              date={upcome.release_date}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
