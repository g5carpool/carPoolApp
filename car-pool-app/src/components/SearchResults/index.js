import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { withAuthorization } from '../Session';
import { withRouter } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import firebase from "firebase";


class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      journeys: [],
      routes: [],
      routeOb:{
        "-LbEMlLMaeI1F5b4a941":{
          destination:"ww"
        },
        "-LbNOS8JfVRVGiQPnNfo":{
          destination:"ww"
        },
        "-Ld5I7WtxkO0ZeOEMwaU":{
          destination:"ww"
        }
      },
      // routeOb:[],
      userOb:[],
      users:[]
    };
  }

  componentDidMount() {
    //console.log("mount");
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
    this.props.firebase.journeys().on("value", snapshot => {
      const journeysObject = snapshot.val();
      const journeysList = Object.keys(journeysObject).map(key => ({
        ...journeysObject[key],
        jid: key
      }));

      this.setState({
        journeys: journeysList,
        loading: false
      });
    });
    this.props.firebase.routes().on("value", snapshot => {
      const routesObject = snapshot.val();
      //console.log(routesObject);
      const routesList = Object.keys(routesObject).map(key => ({
        ...routesObject[key],
        rid: key
      }));

      this.setState({
        routes: routesList,
        loading: false,
        routeOb :routesObject
      });
      //console.log(this.state.routeOb['-LbEMlLMaeI1F5b4a941']);
      
    });
    
  }
  componentWillUnmount() {
    this.props.firebase.journeys().off();
  }

  styles = {
    fontSize: 30,
    fontWeight: "bold"
  };

  render() {
    
    const { journeys,userOb, routeOb}  = this.state;
    //console.log("render");
    //console.log(routeOb['-LbEMlLMaeI1F5b4a941'].destination);
    return (
      <div>
        <div>
          <h1>Account: {firebase.auth().currentUser.email}</h1>
        </div>
        <div>
          <h1>Search Results </h1>;
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
          <button className="btn btn-secondary btn-sm">
            View Driver Profile
          </button>
          <br />
          <button className={this.changeButtonColour()}>go back</button>
        </div>
        <div className="Journeys">
          <form onSubmit={this.onSubmit}>
            <div>
              <table>
                <tr>
                  <th>User</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Destination</th>
                  <th />
                </tr>
                {journeys.map(journey => (
                  <tr>
                    <td>
                      <input type="radio" name="select" value={journey.user} />
                      {userOb[journey.user].username}
                    </td>
                    <td>{new Date(journey.date).toLocaleDateString("en-IE")} </td>
                    <td>{new Date(journey.date).toLocaleTimeString("en-IE")} </td>
                    <td>{routeOb[journey.destination].destination} </td>
                    <td />
                  </tr>
                ))}
              </table>
            </div>
            <br />
           <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
    
    
  }
  

  changeButtonColour() {
    let classes = "badge m-2 badge-";
    classes += this.state.mySearch === 0 ? "danger" : "primary";
    return classes;
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.mySearch === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { mySearch } = this.state;
    return mySearch === 0
      ? "Zero searchs available"
      : mySearch + " journey(s) available";
  }
  
}


const condition = authUser => !!authUser;
export default withFirebase(withAuthorization(condition)(SearchResults));
