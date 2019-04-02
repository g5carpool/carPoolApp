import React from "react";
import { Link } from 'react-router-dom';

import DateTimePicker from 'react-datetime-picker';
import * as ROUTES from '../../constants/routes';

    export default
        class HomePage extends React.Component {
        state = {
            To: "",
            
            From: "",
            
            date: new Date(),
        };

        onSubmit = () =>{
        }

        onChange = date => this.setState({ date })

    render() {
    return (
        
    <form>
        <Link to={ROUTES.DRIVER}>Create a trip</Link>
        <button onClick={() => this.onSubmit()}>Log In</button>
        <button onClick={() => this.onSubmit()}>Sign Up</button>
        <br/>
        <input
            placeholder= "To"
            value={this.state.departure}
            onChange={e => this.setState({departure: e.target.value})}
        />
         <br/>

         <input
            placeholder= "From"
            value={this.state.arrival}
            onChange={e => this.setState({arrival: e.target.value})}
        />
        <br/>
        <div>
        <DateTimePicker
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
        <button onClick={() => this.onSubmit()}>Search</button>
    </form>
    ); 
    }
}
