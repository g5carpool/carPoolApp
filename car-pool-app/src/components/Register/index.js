import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const RegisterPage = () => (
  <div>
    <h1>Register</h1>
    <RegisterForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  DoB: '',
  gender: '',
  carModel: '',
  maxSeats: '1',
  smoking: false,
  allowPets: false,
  hasChildSeat: false,
  personality: '',
  rating: 0,
  error: null,
};

class RegisterFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  
  onSubmit = event => {
    const {   username, 
              email, 
              passwordOne, 
              DoB, 
              gender, 
              carModel,
              maxSeats,
              smoking,
              allowPets,
              hasChildSeat,
              personality,
              rating
            } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            DoB,
            gender,
            carModel,
            maxSeats,
            smoking,
            allowPets,
            hasChildSeat,
            personality,
            rating
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.PROFILE);
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });

event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
      <p>Add Profile details</p>
        <div>
        
        </div>
        <button disabled={isInvalid} type="submit">
          Register
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const RegisterLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.REGISTER}>Register</Link>
  </p>
);
const RegisterForm = withRouter(withFirebase(RegisterFormBase));
export default RegisterPage;
export { RegisterForm, RegisterLink };
