import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/layout/NavBar";
import Alert from "./components/layout/Alert";

import Users from "./components/users/Users";
import Search from "./components/users/Search";
import User from "./components/users/User";

import About from "./components/pages/About";

import "./App.css";
import { async } from "q";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
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

  // search Github users
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

  // get single Github User
  getUser = async username => {
    this.setState({ loading: true });
    const data = await fetch(
      `https://api.github.com/users/${username}
      ?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    ).then(response => response.json());

    //parse data into users | set loader gif OFF
    this.setState({ user: data, loading: false });
  };

  // get users repo
  getUserRepos = async username => {
    this.setState({ loading: true });
    const data = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    ).then(response => response.json());

    //parse data into users | set loader gif OFF
    this.setState({ repos: data, loading: false });
  };

  // clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  // set alert to user
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { loading, users, user, repos, alert } = this.state;
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
