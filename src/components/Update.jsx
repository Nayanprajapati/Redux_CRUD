import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Update = () => {
  const { id } = useParams();
  const [updateData, setUpdatedData] = useState();
  const users = useSelector((state) => state.app.users);

  useEffect(() => {
    if (id) {
      const singleUser = users.filter((element) => element.id === id);
      setUpdatedData(singleUser[0]);
    }
  }, []);

  const getUserData = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2 className="my-2">Edit the data</h2>
      <form className="w-50 mx-auto my-5 ">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={updateData?.name || ""}
            onChange={getUserData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={updateData?.email || ""}
            onChange={getUserData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="text"
            name="age"
            className="form-control"
            value={updateData?.age || ""}
            onChange={getUserData}
          />
        </div>

        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Male"
            type="radio"
            checked={updateData?.gender === "Male"}
            onChange={getUserData}
          />
          <label className="form-check-label">Male</label>
        </div>

        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Female"
            type="radio"
            checked={updateData?.gender === "Female"}
            onChange={getUserData}
          />
          <label className="form-check-label">Female</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
