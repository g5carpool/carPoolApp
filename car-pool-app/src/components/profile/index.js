import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from 'firebase';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {withAuthentication} from '../Session/withAuthentication';
import {Firebase} from '../Firebase/firebase';

const Profile = () => (
  <div>
    <h1>Profile</h1>
    <ProfileForm />
  </div>
);

const INITIAL_STATE = {
  name: '',
      age: '',
      gender: '',
      rating: '',
      car: '',
      maxseats: '',
      smoking: '',
      pets: '',
      childseat: '',
      personality: '',
  error: null,
};

class ProfileFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

 
  onSubmit = event => {
    const { name, age, gender, rating, car, maxseats, smoking, pets, childseat, personality } = this.state;

    
        this.props.firebase
          .user(this.uid)
          .set({
           name,
      age,
      gender,
      rating,
      car,
      maxseats,
      smoking,
      pets,
      childseat,
      personality,
          })
          

event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      name,
      age,
      gender,
      rating,
      car,
      maxseats,
      smoking,
      pets,
      childseat,
      personality,
      error,
    } = this.state;

   

    return (
      <form onSubmit={this.onSubmit}>
      <div>
        <input
          name="name"
          value={name}
          onChange={this.onChange}
          type="text"
          placeholder=" Name"
        />
        
        <input
          name="age"
          value={age}
          onChange={this.onChange}
          type="text"
          placeholder="Age"
        />
        <input
          name="gender"
          value={gender}
          onChange={this.onChange}
          type="text"
          placeholder="gender"
        /></div>
        <div>
        <input
          name="car"
          value={car}
          onChange={this.onChange}
          type="text"
          placeholder="car"
        />
        
        <input
          name="maxseats"
          value={maxseats}
          onChange={this.onChange}
          type="text"
          placeholder="maxseats"
        />
        <input
          name="smoking"
          value={smoking}
          onChange={this.onChange}
          type="text"
          placeholder="smoking"
          />
        </div>
      

<div>
        <input
          name="pets"
          value={pets}
          onChange={this.onChange}
          type="text"
          placeholder="pets"
        />
        
        <input
          name="childseat"
          value={childseat}
          onChange={this.onChange}
          type="text"
          placeholder="childseat"
        />
        <input
          name="personality"
          value={personality}
          onChange={this.onChange}
          type="text"
          placeholder="personality"
          />
        </div>

        <button type="submit">
          Save
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}


const ProfileForm = withRouter(withFirebase(ProfileFormBase));
export default Profile;
export { ProfileForm};