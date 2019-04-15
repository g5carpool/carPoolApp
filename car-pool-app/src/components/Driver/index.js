import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
//import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from "../Firebase";
import firebase from "firebase";
require("firebase");

class Driver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      routes: []
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //iterate through users to find the user with this email
        //then iterate through the routes
        this.props.firebase.users().on("value", snapshot => {
          const usersObject = snapshot.val();
          snapshot.forEach(function(childNodes) {
            //key of each destination
            // console.log(childNodes.val().email);
            if (user.email === childNodes.val().email) {
              //look for the username in the journey table
              const username = childNodes.val().username;

              //tried code said might not work
              // const rootRef = firebase.database.ref().child("journey");
              // rootRef.on("value", snap => {
              //   console.log(snap);
              // });
            }
            //destination of the route
          });
        });
      }
    });

    this.setState({ loading: true });

    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false
      });
    });
    this.props.firebase.routes().on("value", snapshot => {
      const routesObject = snapshot.val();

      const routesList = Object.keys(routesObject).map(key => ({
        ...routesObject[key],
        rid: key
      }));

      this.setState({
        routes: routesList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.routes().off();
  }

  render() {
    const { routes, loading } = this.state;
    return (
      <div className="Driver">
        <AddJourneyForm />
        {loading && <div>Loading ...</div>}
        <RoutesList routes={routes} />
      </div>
    );
  }
}
const INITIAL_STATE = {
  user: "Test Pilot",
  destination: "",
  arrivalTime: new Date(),
  date: new Date().valueOf(),
  error: null
};
const RoutesList = ({ routes }) => (
  <div>
    {" "}
    <table>
      <tr>
        <th>Start Point</th>
        <th>Node </th>
        <th>Node </th>
        <th>Destination</th>
        <th />
      </tr>
      {routes.map(route => (
        <tr>
          <td>{route.nodes.node1}</td>
          <td>{route.nodes.node2} </td>
          <td>{route.nodes.node3} </td>
          <td>
            {route.destination}
            <input type="radio" name="select" value={route.destination} />
          </td>
          <td />
        </tr>
      ))}
    </table>
  </div>
);

class AddJourneyFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { user, destination, arrivalTime } = this.state;
    const date = arrivalTime.valueOf();
    this.props.firebase
      .journeys()
      .push()
      .set({
        user,
        destination,
        date
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
        event.preventDefault();
      });
  };

  onChange = arrivalTime => this.setState({ arrivalTime });

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          placeholder="Destination"
          value={this.state.destination}
          onChange={e => this.setState({ destination: e.target.value })}
        />
        <br />
        <div>
          <DateTimePicker
            onChange={this.onChange}
            value={this.state.arrivalTime}
          />
        </div>
        <br />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

const AddJourneyForm = withRouter(withFirebase(AddJourneyFormBase));

export default withFirebase(Driver);
