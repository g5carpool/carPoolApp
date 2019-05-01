import React from 'react';
import { BrowserRouter as Router, Route,} from 'react-router-dom';
import Navigation from '../Navigation';
import RegisterPage from '../Register';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import AdminPage from '../Admin';
import Driver from '../Driver';
import Profile from '../profile';
import SearchResults from '../SearchResults';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />
      <br></br>
      <br></br>
      <Route path={ROUTES.REGISTER} component={RegisterPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.DRIVER} component={Driver} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.PROFILE} component={Profile} />
      <Route path={ROUTES.SEARCH_RESULTS} component={SearchResults} />
    </div>
  </Router>
);

export default withAuthentication(App);
