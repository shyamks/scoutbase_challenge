import React from 'react';
import { Link, Switch } from "react-router-dom";
import { renderRoutes } from 'react-router-config';

import styled from 'styled-components'

import './App.css';
import Routes from './Routes';

function App() {
  return (

    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/countries/">Countries</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        {renderRoutes(Routes)}
      </Switch>
    </div>

  );
}

export default App;
