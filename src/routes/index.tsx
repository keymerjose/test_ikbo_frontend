// src/routes/index.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ResultsPage from '../pages/ProductPage';
// Otros imports de tus páginas

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/products" component={ResultsPage} />
        {/* Otras rutas */}
      </Switch>
    </Router>
  );
};

export default Routes;
