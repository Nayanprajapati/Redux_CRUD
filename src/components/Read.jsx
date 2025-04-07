import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser, deleteUser } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";

const Read = () => {
  const dispatch = useDispatch();
  const { users, loading, error, searchData } = useSelector(
    (state) => state.app
  );
  const [id, setId] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [genderFilter, setGenderFilter] = useState("all");

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  // Filter users based on searchData and genderFilter
  const filteredUsers = users.filter((element) => {
    const isNameMatch =
      searchData.length === 0 ||
      element.name.toLowerCase().includes(searchData.toLowerCase());
    const isGenderMatch =
      genderFilter === "all" || element.gender.toLowerCase() === genderFilter;

    return isNameMatch && isGenderMatch;
  });

  return (
    <div>
      {showPopup && (
        <CustomModal
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}

      <h2 className="text-center my-4">All Data</h2>

      <div className="mb-3">
        {/* Gender Filter Radio Buttons */}
        <input
          className="form-check-input"
          type="radio"
          name="gender"
          value="all"
          id="allGender"
          checked={genderFilter === "all"}
          onChange={() => setGenderFilter("all")}
        />
        <label className="form-check-label" htmlFor="allGender">
          All
        </label>

        <input
          className="form-check-input"
          type="radio"
          name="gender"
          value="male"
          id="maleGender"
          checked={genderFilter === "male"}
          onChange={() => setGenderFilter("male")}
        />
        <label className="form-check-label" htmlFor="maleGender">
          Male
        </label>

        <input
          className="form-check-input"
          type="radio"
          name="gender"
          value="female"
          id="femaleGender"
          checked={genderFilter === "female"}
          onChange={() => setGenderFilter("female")}
        />
        <label className="form-check-label" htmlFor="femaleGender">
          Female
        </label>
      </div>

      <div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((element, index) => (
            <div
              key={`${element.id}-${index}`}
              className="card w-50 mx-auto my-3"
            >
              <div className="card-body">
                <h5 className="card-title">{element.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {element.email || "No email provided"}
                </h6>
                <p className="card-text">
                  <strong>Gender:</strong> {element.gender || "N/A"}
                </p>

                <button
                  className="card-link"
                  onClick={() => {
                    setId(element.id);
                    setShowPopup(true);
                  }}
                >
                  View
                </button>
                <Link to={`/edit/${element.id}`} className="card-link">
                  Edit
                </Link>
                <Link
                  to="#"
                  onClick={() => dispatch(deleteUser(element.id))}
                  className="card-link"
                >
                  Delete
                </Link>
              </div>
            </div>
          ))
        ) : (
          <h5 className="text-center">No users found</h5>
        )}
      </div>
    </div>
  );
};

export default Read;
