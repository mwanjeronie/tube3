import React, { useState } from "react";
import { FaWallet, FaPlus, FaUser } from "react-icons/fa";

const navStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  backgroundColor: "rgba(113, 61, 146, 1)",
  display: "flex",
  justifyContent: "space-around",
  padding: "10px 0",
  zIndex: 1000,
};

const iconStyle: React.CSSProperties = {
  color: "#fbb251",
  fontSize: "24px",
  cursor: "pointer",
};

const formStyle: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  zIndex: 1001,
};

export default function BottomNav() {
  const [showForm, setShowForm] = useState(false);

  const handleIconClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <nav style={navStyle}>
        <div style={iconStyle}>
          <FaWallet />
        </div>
        <div style={iconStyle} onClick={handleIconClick}>
          <FaPlus />
        </div>
        <div style={iconStyle}>
          <FaUser />
        </div>
      </nav>
      {showForm && (
        <div style={formStyle}>
          <h2>Create YouTube Video View Campaign</h2>
          <form>
            <div>
              <label>Video URL:</label>
              <input type="text" />
            </div>
            <div>
              <label>Budget:</label>
              <input type="number" />
            </div>
            <div>
              <label>Duration:</label>
              <input type="text" />
            </div>
            <button type="button" onClick={handleCloseForm}>
              Close
            </button>
            <button type="submit">Create Campaign</button>
          </form>
        </div>
      )}
    </>
  );
}