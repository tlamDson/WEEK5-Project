import React, { useState } from "react";
import "./RightSection.css";
const RightSection = () => {
  const [banList, setBanList] = useState([]);
  const handleAddList = () => {
    setBanList((prev) => [...banList, prev]);
  };
  return (
    <div className="right-section-container">
      <div>A list of bans characters</div>
    </div>
  );
};

export default RightSection;
