import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import user from "../../images/user.png";
import "./Header.scss";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";

const Header = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  //debounce function implementation
  const debounce = (func, timeout = 500) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const handleChange = debounce((e) => {
    dispatch(fetchAsyncMovies(e.target.value));
    dispatch(fetchAsyncShows(e.target.value));
  });

  useEffect(() => {
    dispatch(fetchAsyncMovies(text));
    dispatch(fetchAsyncShows(text));
  }, [text]);

  return (
    <div className="header">
      <div className="logo">
        <Link style={{ color: "white" }} to="/">
          Movie App
        </Link>
      </div>
      <div className="searchbar">
        <input
          type="text"
          value={text}
          className="searchbar-input"
          placeholder="Search Movies and Shows"
          onChange={(e) => {
            setText(e.target.value);
            handleChange(e);
          }}
        />
        {text != "" && (
          <div className="reset-search">
            <img
              className="close-icon"
              src="https://t4.ftcdn.net/jpg/00/75/69/13/240_F_75691329_CLLuXHPb6zqvgBnFkQjVnufsLEtmbL3e.jpg"
              onClick={() => setText("")}
            />
          </div>
        )}
      </div>

      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
};

export default Header;
