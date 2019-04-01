import React from 'react';
import { BrowserRouter as Router, Route,} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import RegisterPage from '../Register';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import AdminPage from '../Admin';
import AccountPage from '../Account';
import Driver from '../Driver';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.REGISTER} component={RegisterPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.DRIVER} component={Driver} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
);

export default withAuthentication(App);