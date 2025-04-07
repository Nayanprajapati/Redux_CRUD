import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUser } from "../features/userDetailSlice";

const Navbar = () => {
  const allusers = useSelector((state) => state.app.users);
  const dispatch = useDispatch();

  const searchData = useSelector((state) => state.app.searchData);

  const handleSearchChange = (e) => {
    dispatch(searchUser(e.target.value));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <h4 className="navbar-brand m-0">CRUD</h4>

        <div className="collapse navbar-collapse d-flex justify-content-between">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Create Data
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/read" className="nav-link">
                All Data {allusers.length ? `(${allusers.length})` : ""}
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
              onChange={handleSearchChange}
              style={{ width: "500px" }}
            />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
