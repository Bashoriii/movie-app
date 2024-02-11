import { Link } from 'react-router-dom';
import './Movie-Card.scss';

const movieCard = ({ id, poster, title, date }) => {
  return (
    <>
      <Link to={`/movie/${id}`} className="movie-cards">
        <div className="poster-image">
          <img src={`http://image.tmdb.org/t/p/w500/${poster}`} alt="poster" />
        </div>
        <div className="title-and-year">
          <p className="title">{title}</p>
          <span>{new Date(date).getFullYear()}</span>
        </div>
      </Link>
    </>
  );
};

export default movieCard;
