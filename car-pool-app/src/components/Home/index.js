import React, { Component } from 'react';
import HomePage from './home';


//import { withAuthorization } from '../Session';

// const HomePage = () => (
//     <div>
//       <h1>Home</h1>
//       <p>The Home Page is accessible by every signed in user.</p>
//     </div>
//   );

class Home extends Component {
  render() {
      return (
          <div className="Home">
          <HomePage/>
          </div>
      );
  }
}
export default
Home;

  //const condition = authUser => !!authUser;
 // export default withAuthorization(condition)(HomePage);
 