import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ authenticated, component: Component }: any) => {
  console.log(authenticated);
  return authenticated ? (
    Component
  ) : (
    <Navigate
      to="/login"
      {...(alert('로그인이 필요합니다.') as any)}
    ></Navigate>
  );
};

export default PrivateRoute;
