import { useParams, useNavigate, useLocation } from "react-router-dom";
import React from "react";
import { Component } from "react";
import './App.css';
import './Github.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-spinners/ClipLoader.css';
import 'react-bootstrap/Form.css';
import 'react-bootstrap/Button.css';
import 'react-router-dom/Link.css';

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let params = useParams();
    let navigate = useNavigate();
    let location = useLocation();
    return (
      <Component
        {...props}
        router={{ params, navigate, location }}
      />
    );
  }

  return ComponentWithRouterProp;
}


