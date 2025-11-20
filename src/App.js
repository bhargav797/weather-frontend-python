import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

/**
 * Backend base URL — set using environment variable.
 * When deploying, set REACT_APP_API_URL to your Render backend URL (no trailing slash).
 * Example: REACT_APP_API_URL=https://my-weather-backend.onrender.com
 */
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchCity(city) {
    setError("");
    setLoading(true);
    setWeather(null);
    try {
      const res = await fetch(`${API_BASE}/api/weather/by-city?city=${encodeURIComponent(city)}`);
      if (!res.ok) {
        const details = await res.json().catch(()=>null);
        throw new Error(details?.message || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }

  async function searchByCoords(lat, lon) {
    setError("");
    setLoading(true);
    setWeather(null);
    try {
      const res = await fetch(`${API_BASE}/api/weather/by-coords?lat=${lat}&lon=${lon}`);
      if (!res.ok) {
        const details = await res.json().catch(()=>null);
        throw new Error(details?.message || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <header className="header">
        <h1>Weather Check</h1>
        <p className="sub">Search by city name or use your current location.</p>
      </header>

      <main className="main">
        <SearchBar
          onSearch={searchCity}
          onUseLocation={() => {
            setError("");
            setWeather(null);
            setLoading(true);
            if (!navigator.geolocation) {
              setError("Geolocation not supported by your browser");
              setLoading(false);
              return;
            }
            navigator.geolocation.getCurrentPosition(
              (pos) => searchByCoords(pos.coords.latitude, pos.coords.longitude),
              (err) => {
                setError("Unable to get location: " + err.message);
                setLoading(false);
              },
              { timeout: 10000 }
            );
          }}
          loading={loading}
        />

        <div className="feedback">
          {loading && <div className="muted">Loading...</div>}
          {error && <div className="error">{error}</div>}
        </div>

        <div className="result-area">
          {weather ? <WeatherCard data={weather} /> : null}
        </div>
      </main>

      <footer className="footer">
        Data provided by OpenWeatherMap. Developed by Bhargav Gol
      </footer>
    </div>
  );
}

export default App;
