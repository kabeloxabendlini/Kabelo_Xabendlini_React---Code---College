import { useParams, useNavigate, useLocation } from 'react-router-dom';
import React from 'react';

export function withRouter(Component) {
  return function(props) {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    return <Component {...props} router={{ params, navigate, location }} />;
  }
}
