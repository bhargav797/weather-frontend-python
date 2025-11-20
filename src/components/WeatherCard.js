import React from "react";

function WeatherLine({ label, value }) {
  return (
    <div className="line">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  );
}

export default function WeatherCard({ data }) {
  const w = (data?.weather && data.weather[0]) || {};
  const main = data?.main || {};
  const wind = data?.wind || {};
  return (
    <div className="card">
      <div className="card-head">
        <h2>{data.city}{data.country ? `, ${data.country}` : ""}</h2>
        <div className="desc">{w.main} — {w.description}</div>
      </div>

      <div className="card-body">
        <div className="temp">{main.temp != null ? `${Math.round(main.temp)}°C` : "—"}</div>
        <div className="grid">
          <WeatherLine label="Feels like" value={main.feels_like != null ? `${Math.round(main.feels_like)}°C` : "—"} />
          <WeatherLine label="Humidity" value={main.humidity != null ? `${main.humidity}%` : "—"} />
          <WeatherLine label="Pressure" value={main.pressure != null ? `${main.pressure} hPa` : "—"} />
          <WeatherLine label="Wind" value={wind.speed != null ? `${wind.speed} m/s` : "—"} />
          <WeatherLine label="Lat / Lon" value={data.coord ? `${data.coord.lat}, ${data.coord.lon}` : "—"} />
        </div>
      </div>
    </div>
  );
}
