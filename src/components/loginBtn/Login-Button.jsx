import { useEffect, useState } from 'react';
import axios from 'axios';
import Icon from '@mdi/react';
import { mdiLogin, mdiLogout, mdiPower } from '@mdi/js';
import './Login-Button.scss';

const loginBtn = () => {
  const [isLogin, setIsLogin] = useState(() => {
    return !!localStorage.getItem('access_token');
  });

  const bearerToken = import.meta.env.VITE_TMDB_TOKEN;

  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${bearerToken}`,
  };

  useEffect(() => {
    const reqToken = async () => {
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

    reqToken();
  }, []);

  const getApprove = async () => {
    const reqToken = window.localStorage.getItem('request_token');
    let reqUrl = `https://www.themoviedb.org/auth/access?request_token=${reqToken}`;

    const athorUrl = window.open(reqUrl, '_blank');

    await new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (athorUrl.closed) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 1000);
    });

    try {
      const response = await axios.post(
        `https://api.themoviedb.org/4/auth/access_token?request_token=${reqToken}`,
        {},
        { headers }
      );

      window.localStorage.setItem('access_token', response.data.access_token);
      window.localStorage.setItem('account_id', response.data.account_id);
      setIsLogin(true);
    } catch (error) {
      console.log(error, 'Cant get athorized token from user');
    }
  };

  const logout = () => {
    localStorage.clear();
    setIsLogin(false);
    window.location.reload();
  };

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
    </>
  );
};

export default loginBtn;
