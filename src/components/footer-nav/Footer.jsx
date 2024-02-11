import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiFacebook, mdiTwitter, mdiYoutube, mdiInstagram } from '@mdi/js';
import './Footer.scss';

const TopNav = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-list section">
          <div className="kinema-logo">
            <Link to="/">Kinema</Link>
            <div className="kinema-description">
              <p>
                At Kinema, we're committed to providing you with top-notch movie
                experiences. Enjoy high-quality streaming of your favorite films
                and immerse yourself in the magic of kinema.
              </p>
            </div>
          </div>
          <div className="footer-item-container">
            <div className="item-list">
              <div className="item">
                <Link to="#">Gift Card</Link>
              </div>
              <div className="item">
                <Link to="#">Careers</Link>
              </div>
              <div className="item">
                <Link to="#">Ads</Link>
              </div>
              <div className="item">
                <Link to="#">Legal</Link>
              </div>
              <div className="item">
                <Link to="#">Download</Link>
              </div>
              <div className="item">
                <Link to="#">Feedback</Link>
              </div>
              <div className="item">
                <Link to="#">Contact</Link>
              </div>
              <div className="item">
                <Link to="#">Help</Link>
              </div>
            </div>
            <div className="socials">
              <Icon
                className="facebook-icon social-icon"
                path={mdiFacebook}
                size={0.9}
              />
              <Icon
                className="twitter-icon social-icon"
                path={mdiTwitter}
                size={0.9}
              />
              <Icon
                className="youtube-icon social-icon"
                path={mdiYoutube}
                size={0.9}
              />
              <Icon
                className="instagram-icon social-icon"
                path={mdiInstagram}
                size={0.9}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
