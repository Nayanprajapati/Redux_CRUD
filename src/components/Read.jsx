import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser } from "../features/userDetailSlice";
import { deleteUser } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";

const Read = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.app);
  const [id, setId] = useState();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

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
      <div>
        {users.length > 0 ? (
          users.map((element) => (
            <div key={element.id} className="card w-50 mx-auto my-3">
              <div className="card-body">
                <h5 className="card-title">{element.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {element.email || "No email provided"}
                </h6>
                <p className="card-text">
                  <strong>Gender:</strong> {element.gender || "N/A"}
                </p>

                <button
                  href="#"
                  className="card-link"
                  onClick={() => [setId(element.id), setShowPopup(true)]}
                >
                  View
                </button>
                <Link to={`/edit/${element.id}`} className="card-link">
                  Edit
                </Link>
                <Link
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
