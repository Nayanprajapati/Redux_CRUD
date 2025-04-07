import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/userDetailSlice";
import axios from "axios";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate after the update
  const users = useSelector((state) => state.app.users);
  const [updateData, setUpdatedData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [submitting, setSubmitting] = useState(false); // Loading state for form submission

  // Fetch user data from store or API
  useEffect(() => {
    const fetchUser = async () => {
      if (users.length > 0) {
        const singleUser = users.find((user) => user.id === id);
        setUpdatedData(singleUser);
        setLoading(false);
      } else {
        try {
          const res = await axios.get(
            `https://67f15e22c733555e24acfa75.mockapi.io/crud/${id}`
          );
          setUpdatedData(res.data);
        } catch (err) {
          console.error("Failed to fetch user:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [id, users]);

  const newData = (e) => {
    setUpdatedData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Start loading when submitting

    try {
      await dispatch(updateUser(updateData));

      // Fetch the updated data again
      const res = await axios.get(
        `https://67f15e22c733555e24acfa75.mockapi.io/crud/${id}`
      );
      setUpdatedData(res.data); // ✅ Set updated data to re-render form with new values

      // Redirect to the "Read" page after update is done
      navigate("/read"); // Navigate to the Read page (list of users)
    } catch (err) {
      console.error("Failed to refresh after update", err);
    } finally {
      setSubmitting(false); // End loading when submission is done
    }
  };

  if (loading || !updateData) {
    return <h4 className="text-center my-5">Loading user data...</h4>;
  }

  return (
    <div>
      <h2 className="my-2">Edit the data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={updateData.name || ""}
            onChange={newData}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={updateData.email || ""}
            onChange={newData}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="text"
            name="age"
            className="form-control"
            value={updateData.age || ""}
            onChange={newData}
          />
        </div>

        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Male"
            type="radio"
            checked={updateData.gender === "Male"}
            onChange={newData}
          />
          <label className="form-check-label ms-2">Male</label>
        </div>

        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Female"
            type="radio"
            checked={updateData.gender === "Female"}
            onChange={newData}
          />
          <label className="form-check-label ms-2">Female</label>
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Updating..." : "Submit"}
        </button>
      </form>

      {/* Optionally, show loading spinner or message */}
      {submitting && (
        <div className="text-center">Please wait, updating...</div>
      )}
    </div>
  );
};

export default Update;
