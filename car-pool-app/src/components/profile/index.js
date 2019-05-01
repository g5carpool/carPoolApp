import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import { withFirebase } from '../Firebase';

const Profile = () => (
  <div className="center">
    <h1>Profile</h1>
    <ProfileForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  gender: '',
  email: '',
  carModel: '',
  maxSeats: '1',
  smoking: false,
  allowPets: false,
  hasChildSeat: false,
  personality: '',
  rating: 0,
  error: null,
  loading: false,
  userOb: [],
  users: [],
};

class ProfileFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false,
        userOb: usersObject,
        username: usersObject[firebase.auth().currentUser.uid].username,
        email: usersObject[firebase.auth().currentUser.uid].email,
        gender: usersObject[firebase.auth().currentUser.uid].gender,
        carModel: usersObject[firebase.auth().currentUser.uid].carModel,
        maxSeats: usersObject[firebase.auth().currentUser.uid].maxSeats,
        smoking: usersObject[firebase.auth().currentUser.uid].smoking,
        allowPets: usersObject[firebase.auth().currentUser.uid].allowPets,
        hasChildSeat: usersObject[firebase.auth().currentUser.uid].hasChildSeat,
        personality: usersObject[firebase.auth().currentUser.uid].personality
      });
    });
  }

  onSubmit = event => {
    const {
      username,
      email,
      gender,
      carModel,
      maxSeats,
      smoking,
      allowPets,
      hasChildSeat,
      personality,
    } = this.state;

    this.props.firebase
      .user(firebase.auth().currentUser.uid)
      .update({
        username,
        email,
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
    console.log(event.target.value);
    var value = event.target.value;
    this.setState({ [event.target.name]: value });

  };

  render() {
    const {
      username,
      email,
      gender,
      carModel,
      maxSeats,
      smoking,
      allowPets,
      hasChildSeat,
      personality
    } = this.state;


    try {

      return (

        
          <div id="profile">
            <form  onSubmit={this.onSubmit}>
              <label >Name</label>
              <input type="text" id="name" name="name" placeholder="Your name" value={username} onChange={this.onChange}></input>
              <label >gender</label>
              <select id="gender" name="gender" value={gender} onChange={this.onChange}>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
              <label >email address</label>
              <input type="text" id="email" name="email" placeholder="Your email address.." value={email} onChange={this.onChange}></input>
              <label >Model of your car</label>
              <input type="text" id="carModel" name="carModel" placeholder="The model of your car.." value={carModel} onChange={this.onChange}></input>
              <label >Max number of passenger seats</label>
              <input type="text" id="maxSeats" name="maxSeats" placeholder="Max number of passenger seats.." value={maxSeats} onChange={this.onChange}></input>
              <label >Is smoking allowed in your car?</label>
              <select id="smoking" name="smoking" value={smoking} onChange={this.onChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <label >Are pets allowed in your car?</label >
              <select id="allowPets" name="allowPets" value={allowPets} onChange={this.onChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <label >Does your car have a child seat?</label>
              <select id="hasChildSeat" name="hasChildSeat" value={hasChildSeat} onChange={this.onChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <label >Personality</label>
              <input type="text" id="personality" name="personality" placeholder="Describe your personality.." value={personality} onChange={this.onChange}></input>
              <input type="submit" value="Submit"></input>
            </form>
          </div>
      );
    }
    catch (err) {
      return (
        <div></div>
      );
    }
  }
}


const ProfileForm = withRouter(withFirebase(ProfileFormBase));
export default Profile;
export { ProfileForm };