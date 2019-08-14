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

  // get repos

  // clear users

  // set loading

  return (
    <GithubContext.Provider
      value={{
        user: state.user,
        users: state.users,
        repos: state.repos,
        loading: state.loading
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
