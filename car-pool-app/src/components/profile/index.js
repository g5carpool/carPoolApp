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
    this.state = {
      loading: false,
      userOb:[],
      users:[]
    };
  }

  componentDidMount(){
    this.setState({ loading: true });
    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();
      //console.log(usersObject);
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false,
        userOb :usersObject
      });
    });
  }
 
  onSubmit = event => {
    const { name, age, gender, rating, car, maxseats, smoking, pets, childseat, personality } = this.state;

    
        this.props.firebase
          .user(firebase.auth().currentUser.uid)
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
      userOb
    } = this.state;

    try{
    return (
      
      <div>
        <h3>Username: {userOb[firebase.auth().currentUser.uid].username}</h3>
        <h3>email: {userOb[firebase.auth().currentUser.uid].email}</h3>
        <h3>age: {userOb[firebase.auth().currentUser.uid].age}</h3>
        <h3>gender: {userOb[firebase.auth().currentUser.uid].gender}</h3>
        <h3>car: {userOb[firebase.auth().currentUser.uid].car}</h3>
        <h3>maxseats: {userOb[firebase.auth().currentUser.uid].maxseats}</h3>
        <h3>smoking: {userOb[firebase.auth().currentUser.uid].smoking}</h3>
        <h3>pets: {userOb[firebase.auth().currentUser.uid].pets}</h3>
        <h3>childseat: {userOb[firebase.auth().currentUser.uid].childseat}</h3>
        <h3>personality: {userOb[firebase.auth().currentUser.uid].personality}</h3>

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
      </div>
    );
    }
  catch(err){
    console.log("routeOb not found");
    return (
      <div></div>
    );
  }
  }
}


const ProfileForm = withRouter(withFirebase(ProfileFormBase));
export default Profile;
export { ProfileForm};