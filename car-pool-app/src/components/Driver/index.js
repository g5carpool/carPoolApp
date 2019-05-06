import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import { withAuthorization } from '../Session';
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

  render() {
    const {   loading } = this.state;
    return (
      <div className="Driver">
        <AddJourneyForm/>
        {loading && <div>Loading ...</div>}        
      </div>
    );
  }
}

const INITIAL_STATE = {
  user: "Test",
  destination: "",
  arrivalTime: new Date(),
  date: new Date().valueOf(),
  error: null
};

class AddJourneyFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [],
      arrivalTime: new Date(),
      destination:"",
      date: new Date().valueOf(),
      error: null
    };
  }

  onSubmit = event => {
    const {  destination, arrivalTime } = this.state;
    const date = arrivalTime.valueOf();
    const user = firebase.auth().currentUser.uid;    
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

  componentDidMount() {    

    this.setState({ loading: true });

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

  onChange = arrivalTime => this.setState({ arrivalTime });
  render() {
    const {routes} = this.state;
    return  (
      <form onSubmit={this.onSubmit}>
      <div>
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
            <input type="radio" name="select" 
            onChange={e => this.setState({ destination: e.target.value })} 
            value={route.rid} />
          </td>
          <td />
        </tr>
      ))}
    </table>
      </div>
        <div className="center">
        <div id="driverTime">
          <DateTimePicker id="driverTime" className="DateTimePicker"
            onChange={this.onChange}
            value={this.state.arrivalTime}
          />
          </div>
        </div>
        <br />
        <div className="center"><button id="driverSubmit" className="btn-xl" type="submit">Submit</button></div>
      </form>
    );
  }
}

const AddJourneyForm = withRouter(withFirebase(AddJourneyFormBase));
const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(Driver));
