import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from './cookie';

interface PrivateRouteProps {
  children?: ReactElement;
  authentication: boolean;
}
export default function PrivateRoute({
  authentication,
}: PrivateRouteProps): React.ReactElement | null {
  const isAuthenticated = getCookie('userToken');
  if (authentication) {
    return isAuthenticated === undefined || isAuthenticated === 'false' ? (
      <Navigate to="/login" />
    ) : (
      <Outlet />
    );
  } else {
    return isAuthenticated === undefined || isAuthenticated === 'false' ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    );
  }
}
