import './Card-Slider.scss';

const CardSlider = ({ poster, title, date }) => {
  return (
    <>
      <div className="card">
        <div className="poster-image">
          <img src={`http://image.tmdb.org/t/p/w500/${poster}`} alt="poster" />
        </div>
        <div className="title-and-year">
          <p className="title">{title}</p>
          <span>{new Date(date).getFullYear()}</span>
        </div>
      </div>
    </>
  );
};

export default CardSlider;
