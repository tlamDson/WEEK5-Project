import React, { useEffect, useState } from "react";
import "./Main.css";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
const Main = () => {
  const API_KEY =
    "live_tbB37LmNuBZ7MV7Mz3g694YXb5Jc3yKmrYCu6IaQGM9QWSWXf4iW9lghX0N3uXDS";
  const [cats, setCats] = useState(null);
  const [prevImages, setPrevImages] = useState([]);
  const [banList, setBanList] = useState([]);

  const fetchCats = async () => {
    const params = new URLSearchParams({
      limit: 1,
      page: 0,
      order: "RAND",
      has_breeds: 1,
      size: "med",
    });

    const res = await fetch(
      `https://api.thecatapi.com/v1/images/search?${params}`,
      {
        headers: { "x-api-key": API_KEY },
      }
    );

    const data = await res.json();
    console.log("API Response:", data);
    setCats(data[0]);
    console.log(data[0]);
    console.log(cats);
    setPrevImages((prevImages) => [...prevImages, data[0]]);
    console.log(prevImages);
  };
  const handleAddList = (info) => {
    setBanList((prev) => [...banList, info]);
  };

  return (
    <>
      <LeftSection images={prevImages} />
      <h3>Select an attribute in your listing to ban it</h3>
      {banList && banList.map((item) => <button>{item}</button>)}
      <div className="main">
        <span>Trippin on cat</span>
        <div>Discover cats from your wildest dreams!</div>
        <div>😺😸😹😻😼😽🙀😿😾</div>
        {cats && (
          <>
            <div>
              <button onClick={() => handleAddList(cats.breeds[0].name)}>
                {" "}
                Name: <strong>{cats.breeds[0].name}</strong>
              </button>
              <button onClick={() => handleAddList(cats.breeds[0].origin)}>
                <strong>Origin:</strong> {cats.breeds[0].origin}
              </button>
              <button
                onClick={() =>
                  handleAddList(cats.breeds[0].weight?.imperial || "N/A")
                }
              >
                <strong>Weight:</strong>{" "}
                {cats.breeds[0].weight?.imperial || "N/A"}
              </button>
              <button onClick={() => handleAddList(cats.breeds[0].life_span)}>
                <strong>Life Span:</strong> {cats.breeds[0].life_span} years
              </button>
            </div>
          </>
        )}
        <button
          onClick={() => fetchCats()}
          style={{ marginTop: "10px", marginBottom: "20px" }}
        >
          Get New Cats
        </button>

        {cats ? (
          <div>
            <img
              src={cats.url}
              alt="cat"
              width={250}
              style={{ borderRadius: "10px" }}
            />
            <br />
          </div>
        ) : (
          <div>No cats yet!!!</div>
        )}
      </div>
    </>
  );
};

export default Main;
