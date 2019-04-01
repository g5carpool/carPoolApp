import React from "react";
import DateTimePicker from 'react-datetime-picker';
    export default
        class Form extends React.Component {
            state = {
            Username: "",

            Departure: "",
            
            Arrival: "",
            
            Date: "",
            
            Time: "",

            date: new Date(),
        };

        onSubmit = () =>{
        }

        onChange = date => this.setState({ date })

    render() {
    return (
    <form>
    <input
        placeholder= "Username"
        value={this.state.username}
        onChange={e => this.setState({username: e.target.value})}
    />
     <br/>

    <input
        placeholder= "Departure"

        value={this.state.departure}

        onChange={e => this.setState({departure: e.target.value})}
    />
     <br/>

     <input
        placeholder= "Arrival"
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
    <br/>
    
    <button onClick={() => this.onSubmit()}>Submit</button>
    </form>
    ); 
    }
}
