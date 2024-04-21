import { useState } from "react";
import { Link } from "react-router-dom";
import "./searchBar.scss";

const SearchBar = () => {
  const [query, setQuery] = useState({
    type: "",
    city: "",
    minPrice: 0,
    maxPrice: 1000000,
  });

  const switchType = (type) => {
    setQuery((prev) => ({ ...prev, type }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="search-bar">
      <div className="buttons">
        <button
          onClick={() => switchType("buy")}
          className={query.type === "buy" ? "active" : ""}
        >
          Buy
        </button>
        <button
          onClick={() => switchType("rent")}
          className={query.type === "rent" ? "active" : ""}
        >
          Rent
        </button>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City Location"
          name="city"
          onChange={() => handleChange}
        />
        <input
          type="number"
          placeholder="Min Price"
          min={1}
          name="minPrice"
          onChange={() => handleChange}
        />
        <input
          type="number"
          placeholder="Max Price"
          min={1}
          name="maxPrice"
          onChange={() => handleChange}
        />
        <Link
          to={`/list?type=${query.type}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&city=${query.city}`}
        >
          <button type="submit">
            <img src="/search.png" alt="search" />
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SearchBar;
