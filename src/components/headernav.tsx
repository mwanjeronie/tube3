import React, { CSSProperties } from "react";

const headerStyle: CSSProperties = {
  padding: 8,
  backgroundColor: "rgba(113, 61, 146, 1)", // Slightly transparent purple
  color: "#fbb251",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
};

const buttonStyle: CSSProperties = {
 
};


export default function Header() {
  return (
    <header style={headerStyle}>
      <div style={{ fontWeight: "bold", fontSize: "1.5em", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
        TUBE 3.0
      </div>
    
     
    </header>
  );
}
