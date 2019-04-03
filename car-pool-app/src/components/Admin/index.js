import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
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
    this.props.firebase.users().off();
    this.props.firebase.routes().off();
  }

  render() {
    const { users, routes, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>

        {loading && <div>Loading ...</div>}

        <UserList users={users} />
        <h3>Routes:</h3>
        <RoutesList routes={routes} />
        <AddRouteForm/>
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

const RoutesList = ({ routes }) => (
  <ul>
    {routes.map(route => (
      <li key={route.rid}>
        <p>
          <strong>ID:</strong> {route.rid}
        </p>
        <p>
          <strong>Destination:</strong> {route.destination}
        </p>
        <p>
          <strong>Nodes:</strong> 
          <ul>
            <li>Node1: {route.nodes.node1}</li>
            <li>Node2: {route.nodes.node2}</li>
            <li>Node3: {route.nodes.node3}</li>
            </ul>
        </p>
      </li>
    ))}
  </ul>
);

const INITIAL_STATE = {
  destination: '',
  nodes:{
    node1: '',
    node2: '',
    node3: '',},
  error: null,
};

class AddRouteFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { destination, node1, node2, node3 } = this.state;

    this.props.firebase.routes().push()
    .set({
      destination,
      nodes:{
        node1,
        node2,
        node3,
      },
    })
    .then(() => {
      this.setState({ ...INITIAL_STATE });
    })
    .catch(error => {
      this.setState({ error });
    event.preventDefault();
    });
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {
      destination,
      node1,
      node2,
      node3,
      error,
    } = this.state;

    const isInvalid =
      destination === '' ||
      node1 === '' ||
      node2 === '' ||
      node3 === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="destination"
          value={destination}
          onChange={this.onChange}
          type="text"
          placeholder="destination"
        />
        <input
          name="node1"
          value={node1}
          onChange={this.onChange}
          type="text"
          placeholder="node1"
        />
        <input
          name="node2"
          value={node2}
          onChange={this.onChange}
          type="text"
          placeholder="node2"
        />
        <input
          name="node3"
          value={node3}
          onChange={this.onChange}
          type="text"
          placeholder="node3"
        />
        <button disabled={isInvalid} type="submit">
          Add New Route
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
const AddRouteForm = withRouter(withFirebase(AddRouteFormBase));

export default withFirebase(AdminPage);