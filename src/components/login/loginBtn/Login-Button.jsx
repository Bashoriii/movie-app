import { useEffect, useState } from 'react';
import axios from 'axios';
import Icon from '@mdi/react';
import { mdiLogin, mdiPower } from '@mdi/js';
import { useNavigate } from 'react-router-dom';
import AlertModal from '@components/success-alert/Success-Alert';
import './Login-Button.scss';

const loginBtn = () => {
  const [isLogin, setIsLogin] = useState(() => {
    return !!localStorage.getItem('access_token');
  });
  const [alertMsg, setAlertMsg] = useState(false);
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const bearerToken = import.meta.env.VITE_TMDB_TOKEN;

  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${bearerToken}`,
  };

  const reqToken = async () => {
    // Create Request Token (Automatically or per-refresh because of useEffect)
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/4/auth/request_token`,
        {},
        { headers }
      );

      const resultToken = response.data.request_token;
      window.localStorage.setItem('request_token', resultToken);
    } catch {
      console.log('Cant request token');
    }
  };

  const getApprove = async () => {
    // Redirecting to authorization page with 'request_token'
    const reqToken = window.localStorage.getItem('request_token');
    let reqUrl = `https://www.themoviedb.org/auth/access?request_token=${reqToken}`;
    const athorUrl = window.open(reqUrl, '_blank');

    // Waiting for authorization
    await new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (athorUrl.closed) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 1000);
    });

    try {
      // Create Access Token from User Authorization
      const response = await axios.post(
        `https://api.themoviedb.org/4/auth/access_token?request_token=${reqToken}`,
        {},
        { headers }
      );

      window.localStorage.setItem('access_token', response.data.access_token);
      window.localStorage.setItem('account_id', response.data.account_id);

      // Create Session ID
      const getAccessToken = window.localStorage.getItem('access_token');
      const createSession = await axios.post(
        ` https://api.themoviedb.org/3/authentication/session/convert/4?api_key=${apiKey}`,
        {
          access_token: getAccessToken,
        },
        { headers }
      );

      const resultSession = createSession.data.session_id;
      window.localStorage.setItem('session_id', resultSession);
      setIsLogin(true);
      setAlertMsg(true);

      setTimeout(() => {
        setAlertMsg(false);
      }, 1300);
    } catch (error) {
      console.log(error, 'Cant get athorized token from user');
    }
  };

  const logout = () => {
    localStorage.clear();
    setIsLogin(false);
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    reqToken();
  }, []);

  return (
    <>
      {!isLogin ? (
        <button className="login-button" onClick={getApprove}>
          <Icon path={mdiLogin} size={1} />
        </button>
      ) : (
        <button className="logout-button" onClick={logout}>
          <Icon path={mdiPower} size={1} />
        </button>
      )}
      {alertMsg && <AlertModal theMsg={'Login Successful!'} />}
    </>
  );
};

export default loginBtn;
