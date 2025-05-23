import React from "react";
import "../css/CustomModal.css";
import { useSelector } from "react-redux";

const CustomModal = ({ id, showPopup, setShowPopup }) => {
  const alluser = useSelector((state) => state.app.users);
  const singleUser = alluser.filter((element) => element.id === id);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setShowPopup(false)}>Close</button>
        <h2>{singleUser[0].name}</h2>
        <h2>{singleUser[0].email}</h2>
        <h2>{singleUser[0].age}</h2>
        <h2>{singleUser[0].gender}</h2>
      </div>
    </div>
  );
};

export default CustomModal;
