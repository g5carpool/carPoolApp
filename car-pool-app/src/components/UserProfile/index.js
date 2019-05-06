import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { withFirebase } from "../Firebase";
import firebase from 'firebase';

const UserProfile = () => (
    <div className="center">
      <h1>Profile</h1>
      <UserProfileForm />
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
    IDurl: "",
    userID:""    
  };

  class UserProfileFormBase extends Component {
    constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE };
    }
  
    componentDidMount() {
      this.setState({ loading: true });
      const { handle } = this.props.match.params
      fetch(`/${handle}`)
      .then((IDurl) => {
        this.setState(() => ({ IDurl }))
      });
      
      this.props.firebase.users().on("value", snapshot => {
        const usersObject = snapshot.val();
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key
        }));
        try{
        this.setState({
            userID: this.state.IDurl.url.split('/').pop()
        });
        }
        catch(err){}
        try{
            this.setState({            
            users: usersList,
            loading: false,
            userOb: usersObject,
            username: usersObject[this.state.userID].username,
            email: usersObject[this.state.userID].email,
            gender: usersObject[this.state.userID].gender,
            carModel: usersObject[this.state.userID].carModel,
            maxSeats: usersObject[this.state.userID].maxSeats,
            smoking: usersObject[this.state.userID].smoking,
            allowPets: usersObject[this.state.userID].allowPets,
            hasChildSeat: usersObject[this.state.userID].hasChildSeat,
            personality: usersObject[this.state.userID].personality
            });
        }
        catch(err){         
        }
        console.log("userId is : "+this.state.userID);      
       
      });
    }
  
  
  
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
              <form >
                <label >Name</label>
                <input type="text" id="name" name="name" placeholder="Your name" value={username} readonly></input>
                <label >gender</label>
                <select id="gender" name="gender" value={gender} >
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </select>
                <label >email address</label>
                <input type="text" id="email" name="email" placeholder="Your email address.." value={email} readonly></input>
                <label >Model of your car</label>
                <input type="text" id="carModel" name="carModel" placeholder="The model of your car.." value={carModel} readonly></input>
                <label >Max number of passenger seats</label>
                <input type="text" id="maxSeats" name="maxSeats" placeholder="Max number of passenger seats.." value={maxSeats}readonly></input>
                <label >Is smoking allowed in your car?</label>
                <select id="smoking" name="smoking" value={smoking} readonly>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <label >Are pets allowed in your car?</label >
                <select id="allowPets" name="allowPets" value={allowPets} readonly>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <label >Does your car have a child seat?</label>
                <select id="hasChildSeat" name="hasChildSeat" value={hasChildSeat} readonly>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <label >Personality</label>
                <input type="text" id="personality" name="personality" placeholder="Describe your personality.." value={personality} readonly></input>
                
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

  const UserProfileForm = withRouter(withFirebase(UserProfileFormBase));
export default UserProfile;
export { UserProfileForm };
