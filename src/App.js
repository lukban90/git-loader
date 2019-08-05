import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";

class App extends Component {
  state = {
    users: [],
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const data = await fetch("https://api.github.com/users").then(response =>
      response.json()
    );
    console.log(data);
    this.setState({ users: data, loading: false });
  }

  render() {
    const { loading, users } = this.state;
    return (
      <div className="App">
        <NavBar />
        <div className="container">
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
