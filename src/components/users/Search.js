import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
  state = {
    text: ""
  };

  onChange = e => {
    this.setState({ text: e.target.value });
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired
  };

  /**
   * 'prop drill' up to App
   * must be a valid user to function
   */
  // onSubmit = e => {
  //   e.preventDefault();
  //   this.state.text
  //     ? this.props.searchUsers(this.state.text)
  //     : console.log("Must Enter Valid User");
  //   this.setState({ text: "" });
  // };
  onSubmit = e => {
    e.preventDefault();
    this.props.searchUsers(this.state.text);
    this.setState({ text: "" });
  };

  render() {
    const { showClear, clearUsers } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            value={this.state.text}
            name="text"
            placeholder="Search Users..."
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {showClear && (
          <button className="btn btn-light btn-block" onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
