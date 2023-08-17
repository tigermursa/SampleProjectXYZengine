import React from "react";
import { NavLink } from "react-router-dom";

const NaigationBar = () => {
  return (
    <div>
      <div className="navbar text-white absolute">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3  p-2 shadow bg-black rounded-box w-52 z-10"
            >
              <ul className="menu menu-horizontal px-1 font-bold flex gap-3 flex-col">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/result">Result</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
              </ul>
            </ul>
          </div>
          <NavLink
            to="/"
            className="btn btn-ghost normal-case text-2xl font-bold "
          >
            XYZ Company
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold flex gap-3">
            {/* lg nav items here */}
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/result">Result</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/hi">Do Not Click</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NaigationBar;
