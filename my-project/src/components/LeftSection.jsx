import React from "react";
import "./LeftSection.css";

const LeftSection = ({ images }) => {
  return (
    <div className="left-section-container">
      <div>HIHIHIHI</div>
      {images &&
        images.length > 0 &&
        images.map((cat, index) => (
          <li key={index}>
            {cat.breeds && cat.breeds.length > 0 ? (
              <>
                <img src={cat.url} alt="" />
                <div>
                  A {cat.breeds[0].name} from {cat.breeds[0].origin}
                </div>
              </>
            ) : (
              "Unknown breed"
            )}
          </li>
        ))}
    </div>
  );
};

export default LeftSection;
