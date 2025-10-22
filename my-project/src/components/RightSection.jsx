import React from "react";
import "./RightSection.css";

const RightSection = ({ banList, onRemoveItem }) => {
  return (
    <div className="right-section-container">
      <h3>Banned Attributes</h3>
      <div>A list of banned characteristics:</div>
      <div className="ban-list">
        {banList && banList.length > 0 ? (
          banList.map((item, index) => (
            <div
              onClick={() => onRemoveItem(item)}
              key={index}
              className="ban-item clickable"
            >
              {item}
            </div>
          ))
        ) : (
          <div className="no-bans">No banned attributes yet</div>
        )}
      </div>
    </div>
  );
};

export default RightSection;
