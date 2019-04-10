import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      journeys: [],
      routes: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
    this.props.firebase.journeys().on('value', snapshot => {
      const journeysObject = snapshot.val();

      const journeysList = Object.keys(journeysObject).map(key => ({
        ...journeysObject[key],
        jid: key,
      }));

      this.setState({
        journeys: journeysList,
        loading: false,
      });
    });
    this.props.firebase.routes().on('value', snapshot => {
      const routesObject = snapshot.val();

      const routesList = Object.keys(routesObject).map(key => ({
        ...routesObject[key],
        rid: key,
      }));

      this.setState({
        routes: routesList,
        loading: false,
      });
    });
  }
  componentWillUnmount() {
    this.props.firebase.journeys().off();
    this.props.firebase.routes().off();
  }

  styles = {
    fontSize: 30,
    fontWeight: "bold"
  };

  render() {
    const { journeys,routes, loading } = this.state;
    return (
      <div>
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
        {loading && <div>Loading ...</div>}
        <JourneysList journeys={journeys} routes={routes} />
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
const JourneysList = ({ journeys,routes }) => (
 


  <div> <table>
      <tr>
          <th>User</th>
          <th>Date</th>
          <th>Destination</th>          
          <th></th>
      </tr>
      {journeys.map(journey => (
      <tr>
          <td><input type="radio" name="select" value={journey.user}></input>{journey.user}</td>
          <td>{journey.date} </td>
          {routes.map(route=> (<td>{route.destination} </td>))}
          <td></td>
      </tr>
      ))}
  </table>
  
  </div>

);
export default withFirebase(SearchResults);
