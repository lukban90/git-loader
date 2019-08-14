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

const GithubState = props => {
  const initialState = {
    user: {},
    users: [],
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // get user

  // search users
  const searchUsers = async text => {
    setLoading();

    const data = await fetch(
      `https://api.github.com/search/users?q=${text}&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    ).then(response => response.json());

    dispatch({
      type: SEARCH_USERS,
      payload: data.items
    });
  };

  // get repos

  // clear users

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        user: state.user,
        users: state.users,
        repos: state.repos,
        loading: state.loading,
        searchUsers
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
