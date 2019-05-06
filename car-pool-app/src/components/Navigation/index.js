import React from 'react';
import { NavLink } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  
  <div>
    
     
    <nav className="navbar navbar-expand-lg  fixed-top text-uppercase" id="mainNav">

  <ul className="navbar-nav ml-auto">
    <li className="nav-item mx-0 mx-lg-1">
      <NavLink to={ROUTES.HOME} className="inactive" active className="active">Home</NavLink>
    </li>
    <li className="nav-item mx-0 mx-lg-1">
      <NavLink to={ROUTES.ADMIN} className="inactive" active className="active">Admin</NavLink>
    </li>
     <li className="nav-item mx-0 mx-lg-1">
      <NavLink to={ROUTES.PROFILE} className="inactive" active className="active">Profile</NavLink>
    </li>
    <li className="nav-item mx-0 mx-lg-1 ">
      <SignOutButton />
    </li>
  </ul>
  </nav>
  <br></br>
  </div>
);

const NavigationNonAuth = () => (
  <div>
  <nav className="navbar navbar-expand-lg  fixed-top text-uppercase" id="mainNav">

  <ul className="navbar-nav ml-auto">
    <li className="nav-item mx-0 mx-lg-1">
      <NavLink to={ROUTES.HOME} className="inactive" active className="active">Home</NavLink>
    </li>
    <li className="nav-item mx-0 mx-lg-1">
      <NavLink to={ROUTES.SIGN_IN} className="inactive" active className="active">Sign In</NavLink>
    </li>
    <li className="nav-item mx-0 mx-lg-1">
      <NavLink to={ROUTES.REGISTER} className="inactive" active className="active">Register</NavLink>
    </li>
  </ul>
  <br></br>
  </nav>
  </div>

);

export default Navigation;