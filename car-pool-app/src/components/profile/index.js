import React, { Component } from 'react';
import {  withRouter } from 'react-router-dom';
import firebase from 'firebase';
import { withFirebase } from '../Firebase';
import DatePicker from 'react-date-picker';

const Profile = () => (
  <div>
    <h1>Profile</h1>
    <ProfileForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  DoB: new Date().valueOf(),
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

class ProfileFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.state = {
      loading: false,
      userOb: [],
      users: []
    };
  }

  componentDidMount() {
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
        userOb: usersObject,
        username : usersObject[firebase.auth().currentUser.uid].username,
        email : usersObject[firebase.auth().currentUser.uid].email,
        DoB : usersObject[firebase.auth().currentUser.uid].DoB,
        gender : usersObject[firebase.auth().currentUser.uid].gender,
        carModel : usersObject[firebase.auth().currentUser.uid].carModel,
        maxSeats : usersObject[firebase.auth().currentUser.uid].maxSeats,
        smoking : (usersObject[firebase.auth().currentUser.uid].smoking) ? "Yes" : "No",
        allowPets : (usersObject[firebase.auth().currentUser.uid].allowPets) ? "Yes" : "No",
        hasChildSeat : (usersObject[firebase.auth().currentUser.uid].hasChildSeat) ? "Yes" : "No",
        personality : usersObject[firebase.auth().currentUser.uid].personality
      });
    });
  }

  onSubmit = event => {
    const {
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
    } = this.state;

    console.log(this.state);
    this.props.firebase
      .user(firebase.auth().currentUser.uid)
      .update({
        username,
        email,
        DoB,
        gender,
        carModel,
        maxSeats,
        smoking,
        allowPets,
        hasChildSeat,
        personality
      })


    event.preventDefault();
  };

  onChange = event => {
    var value =event.target.value;
    console.log("This far "+typeof value ==='object');
    if(typeof value ==='object')
      value=value.valueOf();
    else if(event.target.value==="Yes")
      value = true;
    else if(event.target.value==="No")
      value = false;
    this.setState({ [event.target.name]: value });
    console.log(this.state);
  };

  render() {
    const {
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
    } = this.state;
    try {

    }
    catch (err) {

    }

    try {
      //How can I set this date based on DoB value?
      //const date = new Date(DoB);
      const date = new Date(1234);

      return (

        <div class="container">
          <form action={this.onSubmit}>
            <label for="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your name" value={username} onChange={this.onChange}></input>
            <label for="gender">gender</label>
            <select id="gender" name="gender" value={gender} onChange={this.onChange}>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
            <label for="email">email address</label>
            <input type="text" id="email" name="email" placeholder="Your email address.." value={email} onChange={this.onChange}></input>
            <label for="DoB">Date of Birth</label>
            <div><DatePicker onChange={this.onChange} value={date} id="DoB" name="DoB" /></div>
            <br></br>
            <label for="carModel">Model of your car</label>
            <input type="text" id="carModel" name="carModel" placeholder="The model of your car.." value={carModel} onChange={this.onChange}></input>
            <label for="maxSeats">Max number of passenger seats</label>
            <input type="text" id="maxSeats" name="maxSeats" placeholder="Max number of passenger seats.." value={maxSeats} onChange={this.onChange}></input>
            <label for="smoking">Is smoking allowed in your car?</label>
            <select id="smoking" name="smoking" value={smoking} onChange={this.onChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <label for="allowPets">Are pets allowed in your car?</label >
            <select id="smokallowPets" name="allowPets" value={allowPets} onChange={this.onChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <label for="hasChildSeat">Does your car have a child seat?</label>
            <select id="hasChildSeat" name="hasChildSeat" value={hasChildSeat} onChange={this.onChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <label for="personality">Personality</label>
            <input type="text" id="personality" name="personality" placeholder="Describe your personality.." value={personality} onChange={this.onChange}></input>
         <input type="submit" value="Submit"></input>
          </form>
        </div>
      );
    }
    catch (err) {
      console.log("routeOb not found");
      return (
        <div></div>
      );
    }
  }
}


const ProfileForm = withRouter(withFirebase(ProfileFormBase));
export default Profile;
export { ProfileForm };