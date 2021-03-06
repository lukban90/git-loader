/**
 * NOTE: ACTIONS FILE - FETCH API, SEARCH USERS, ETC...
 */
import React, { useReducer } from "react";
//import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    user: {},
    users: [],
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // get user
  const getUser = async username => {
    setLoading();
    const data = await fetch(
      `https://api.github.com/users/${username}
      ?client_id=${githubClientId}
      &client_secret=${githubClientSecret}`
    ).then(response => response.json());

    dispatch({
      type: GET_USER,
      payload: data
    });
  };

  // search users
  const searchUsers = async text => {
    setLoading();

    const data = await fetch(
      `https://api.github.com/search/users?q=${text}&
      client_id=${githubClientId}
      &client_secret=${githubClientSecret}`
    ).then(response => response.json());

    dispatch({
      type: SEARCH_USERS,
      payload: data.items
    });
  };

  // get repos
  const getUserRepos = async username => {
    setLoading();
    const data = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    ).then(response => response.json());

    dispatch({
      type: GET_REPOS,
      payload: data
    });
  };

  // clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        user: state.user,
        users: state.users,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
