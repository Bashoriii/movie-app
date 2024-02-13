import { useEffect } from 'react';
import axios from 'axios';
import Icon from '@mdi/react';
import { mdiLogin } from '@mdi/js';
import './Login-Button.scss';

const loginBtn = () => {
  const bearerToken = import.meta.env.VITE_TMDB_TOKEN;

  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${bearerToken}`,
  };

  const redir = JSON.stringify({
    redirect_to: 'http://localhost:5173/',
  });

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
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button className="login-button" onClick={getApprove}>
        <Icon path={mdiLogin} size={1} />
      </button>
    </>
  );
};

export default loginBtn;
