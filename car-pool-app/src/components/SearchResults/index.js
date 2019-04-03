import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
class SearchResults extends Component {
  state = {
    mySearch: 0
  };

  styles = {
    fontSize: 30,
    fontWeight: "bold"
  };

  render() {
    return (
      <div>
        <h1>Search Results </h1>;
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button className="btn btn-secondary btn-sm">
          View Driver Profile
        </button>
        <br />
        <button className={this.changeButtonColour()}>go back</button>
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
export default withFirebase(SearchResults);
