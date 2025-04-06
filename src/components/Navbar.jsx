import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = ({ searchData, setSearchData }) => {
  const allusers = useSelector((state) => state.app.users);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <h4 className="navbar-brand m-0">RTK</h4>

        <div className="collapse navbar-collapse d-flex justify-content-between">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Create Post
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/read" className="nav-link">
                All Post {allusers.length ? `(${allusers.length})` : ""}
              </Link>
            </li>
          </ul>

          <form className="d-flex" role="search">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              style={{ width: "500px" }}
            />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
