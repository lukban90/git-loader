import React, { Component } from "react";
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";

import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false
  };

  // async componentDidMount() {
  //   //set loader gif ON
  //   this.setState({ loading: true });

  //   const data = await fetch(
  //     `https://api.github.com/users?
  //     client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //     &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   ).then(response => response.json());

  //   //parse data into users | set loader gif OFF
  //   this.setState({ users: data, loading: false });
  // }

  //search Github users
  searchUsers = async text => {
    this.setState({ loading: true });
    const data = await fetch(
      `https://api.github.com/search/users?q=${text}&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    ).then(response => response.json());

    //parse data into users | set loader gif OFF
    this.setState({ users: data.items, loading: false });
  };

  // clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  render() {
    const { loading, users } = this.state;
    return (
      <div className="App">
        <NavBar />
        <div className="container">
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
