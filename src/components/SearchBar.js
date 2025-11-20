import React, { useState } from "react";

export default function SearchBar({ onSearch, onUseLocation, loading }) {
  const [city, setCity] = useState("");

  function submit(e) {
    e && e.preventDefault();
    if (!city.trim()) return;
    onSearch(city.trim());
  }

  return (
    <form className="search-row" onSubmit={submit}>
      <input
        className="city-input"
        placeholder="Enter city (e.g., Mumbai, Tokyo)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={loading}
      />
      <button className="btn primary" type="submit" disabled={loading}>
        Search
      </button>
      <button
        className="btn secondary"
        type="button"
        onClick={onUseLocation}
        disabled={loading}
      >
        📍 Use My Location
      </button>
    </form>
  );
}
