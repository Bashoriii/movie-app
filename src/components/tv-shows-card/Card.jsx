import { Link } from 'react-router-dom';
import './Card.scss';

const tvCard = ({ id, poster, title, date }) => {
  return (
    <>
      <Link to={`/tv-shows-detail/${id}`} className="tv-shows-cards">
        <div className="poster-image">
          <img src={`http://image.tmdb.org/t/p/w500/${poster}`} alt="poster" />
        </div>
        <div className="title-and-year">
          <p className="title">{title}</p>
          {/* <span>{date}</span> */}
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
      </Link>
    </>
  );
};

export default tvCard;
