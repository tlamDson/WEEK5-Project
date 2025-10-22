import React, { useEffect, useState } from "react";
import "./Main.css";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
const Main = () => {
  const API_KEY = import.meta.env.VITE_CAT_API_KEY;
  const [cats, setCats] = useState(null);
  const [viewedCats, setViewedCats] = useState([]);
  const [banList, setBanList] = useState([]);

  const fetchCats = async () => {
    const params = new URLSearchParams({
      limit: 10,
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

    const isCatBanned = (cat) => {
      if (!cat.breeds || cat.breeds.length === 0) return false;

      const breed = cat.breeds[0];
      const catAttributes = [
        breed.name,
        breed.origin,
        breed.weight?.imperial || "N/A",
        breed.life_span,
      ];

      return catAttributes.some((attribute) => banList.includes(attribute));
    };

    const validCat = data.find((cat) => !isCatBanned(cat));

    if (validCat) {
      setCats(validCat);
      setViewedCats((viewedCats) => [...viewedCats, validCat]);
    } else {
      fetchCats();
    }
  };
  const handleAddList = (info) => {
    if (!banList.includes(info)) {
      setBanList((prev) => [...prev, info]);
    }
  };

  const handleRemoveList = (itemToRemove) => {
    setBanList((prev) => prev.filter((item) => item !== itemToRemove));
  };

  useEffect(() => {
    console.log("ViewedCats updated:", viewedCats);
  }, [viewedCats]);

  return (
    <>
      <LeftSection images={viewedCats} />
      <RightSection banList={banList} onRemoveItem={handleRemoveList} />
      <div className="main">
        <h3>Select an attribute to ban it</h3>
        <span>Trippin on cat</span>
        <div>Discover cats from your wildest dreams!</div>
        <div>😺😸😹😻😼😽🙀😿😾</div>
        {cats && (
          <>
            <div>
              <button onClick={() => handleAddList(cats.breeds[0].name)}>
                Name: <strong>{cats.breeds[0].name}</strong>
              </button>
              <button onClick={() => handleAddList(cats.breeds[0].origin)}>
                Origin: <strong>{cats.breeds[0].origin}</strong>
              </button>
              <button
                onClick={() =>
                  handleAddList(cats.breeds[0].weight?.imperial || "N/A")
                }
              >
                Weight:{" "}
                <strong>{cats.breeds[0].weight?.imperial || "N/A"}</strong>
              </button>
              <button onClick={() => handleAddList(cats.breeds[0].life_span)}>
                Life Span: <strong>{cats.breeds[0].life_span} years</strong>
              </button>
            </div>
          </>
        )}
        <button onClick={() => fetchCats()} className="discover-button">
          Discover
        </button>

        {cats ? (
          <div className="cat-display">
            <img
              src={cats.url}
              alt="cat"
              width={250}
              style={{ borderRadius: "10px" }}
            />
          </div>
        ) : (
          <div className="no-cats-message">No cats yet!!!</div>
        )}
      </div>
    </>
  );
};

export default Main;
