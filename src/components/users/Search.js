import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
  const [text, setText] = useState("");

  const onChange = e => setText(e.target.value);

  /**
   * 'prop drill' up to App
   * must be a valid user to function
   */
  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please Enter A Valid User", "light");
    } else {
      searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          value={text}
          name="text"
          placeholder="Search Users..."
          onChange={onChange}
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
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired
};

export default Search;
