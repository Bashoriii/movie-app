import { Navigate, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AuthRoute = (props) => {
  const [isValidate, setIsValidate] = useState(() => {
    return !!localStorage.getItem('access_token');
  });

  //   useEffect(() => {
  //     const access_token = localStorage.getItem('access_token');
  //     setIsValidate(!!access_token);
  //   }, []);

  return isValidate ? props.children : <Navigate to={'/'} />;
};

export default AuthRoute;
