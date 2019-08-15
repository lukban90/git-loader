import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/layout/NavBar";
import Alert from "./components/layout/Alert";

import Users from "./components/users/Users";
import Search from "./components/users/Search";
import User from "./components/users/User";

import About from "./components/pages/About";

import GithubState from "./context/github/GithubState";

import "./App.css";

const App = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // search Github users
  // const searchUsers = async text => {
  //   setLoading(true);

  //   const data = await fetch(
  //     `https://api.github.com/search/users?q=${text}&
  //     client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //     &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   ).then(response => response.json());

  //   //parse data.items into users | set loader gif OFF
  //   setUsers(data.items);
  //   setLoading(false);
  // };

  // get single Github User
  // const getUser = async username => {
  //   setLoading(true);
  //   const data = await fetch(
  //     `https://api.github.com/users/${username}
  //     ?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //     &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   ).then(response => response.json());

  //   //parse data into users | set loader gif OFF
  //   setUser(data);
  //   setLoading(false);
  // };

  // get users repo
  const getUserRepos = async username => {
    setLoading(true);
    const data = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    ).then(response => response.json());

    //parse data into users | set loader gif OFF
    setRepos(data);
    setLoading(false);
  };

  // clear users from state
  // const clearUsers = () => {
  //   setUsers([]);
  //   setLoading(false);
  // };

  // set alert to user
  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <GithubState>
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
                    <Search setAlert={showAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User {...props} getUserRepos={getUserRepos} repos={repos} />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
