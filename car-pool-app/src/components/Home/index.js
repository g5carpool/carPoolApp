import React, { Component } from 'react';
import {Redirect } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';


class Home extends Component {
  render() {
    return (
      <div>
      <header class="masthead  text-white text-center">
    <div class="container">
    <h1 class="text-uppercase mb-0">Car Pool G5</h1>
    <hr class="star-light"></hr>
    <h2 class="font-weight-light mb-0">Share a Journey</h2>
    </div>
    </header>
    <br></br>
        <HomePage />
      </div>
    );
  }
}
class HomePage extends Component {
  state = {
    redirect1: false
  };
  setRedirect1 = () => {
    this.setState({
      redirect1: true
    })
  }
  setRedirect2 = () => {
    this.setState({
      redirect2: true
    })
  }
  renderRedirect1 = () => {
    if (this.state.redirect1) {
      return <Redirect to='/driver' />
    }
  }
  renderRedirect2 = () => {
    if (this.state.redirect2) {
      return <Redirect to='/searchresults' />
    }
  }

  onSubmit = () => {
    this.props.history.push(ROUTES.DRIVER);

  }

  onChange = date => this.setState({ date })

  render() {
    return (
      <div class="center">
        {this.renderRedirect1()}
        {this.renderRedirect2()}
        <button id="create"class='btn-xl' onClick={this.setRedirect1}>Create a trip</button>
        <button id="search" class='btn-xl' onClick={this.setRedirect2}>Search for trip</button>
      </div>
    );
  }
}

export default  Home;

