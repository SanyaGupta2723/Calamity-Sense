// WeatherDashboard.jsx
import React, { useState, useEffect } from "react";

const WeatherDashboard = () => {
  const BASE = "http://api.weatherapi.com/v1/current.json";
  const KEY = "5915b0e40854404188a95848251709";

  const [query, setQuery] = useState("India");
  const [unit, setUnit] = useState("C");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (q) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${BASE}?key=${KEY}&q=${encodeURIComponent(q)}&aqi=yes`);
      if (!res.ok) throw new Error(res.status);
      const d = await res.json();
      setData(d);
    } catch (err) {
      setError("Error: " + err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(query);
  }, []);

  const toggleUnit = () => {
    setUnit((u) => (u === "C" ? "F" : "C"));
  };

  return (
    <div className="fixed bottom-5 right-5 w-[350px] bg-sky-900/40 backdrop-blur-sm p-4 rounded-xl shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-black">Weather Reports</h2>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search Region"
            className="bg-slate-800/60 px-2 py-1 rounded text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
            onKeyDown={(e) => e.key === "Enter" && fetchWeather(e.target.value)}
          />
          <button
            onClick={toggleUnit}
            className="bg-sky-500 text-white w-7 h-7 rounded-full text-xs font-bold"
          >
            °{unit}
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-32 text-slate-100">Loading...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : data ? (
        <>
          {/* Main weather */}
          <div className="flex gap-3 items-center">
            <div className="w-14 h-14 bg-slate-800/40 rounded-lg flex items-center justify-center">
              <img
                src={
                  data.current.condition.icon.startsWith("http")
                    ? data.current.condition.icon
                    : "https:" + data.current.condition.icon
                }
                alt={data.current.condition.text}
                className="w-10 h-10"
              />
            </div>
            <div>
              <div className="text-xl font-bold text-black">
                {unit === "C"
                  ? Math.round(data.current.temp_c) + "°C"
                  : Math.round(data.current.temp_f) + "°F"}
              </div>
              <div className="text-black text-xs">{data.current.condition.text}</div>
              <div className="text-black text-xs">
                {data.location.name}, {data.location.region || data.location.country}
              </div>
            </div>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
            <div className="bg-sky-900/60 p-2 rounded">
              <div className="text-slate-300">Feels like</div>
              <div className="text-slate-100">
                {unit === "C"
                  ? data.current.feelslike_c + "°C"
                  : data.current.feelslike_f + "°F"}
              </div>
            </div>
            <div className="bg-sky-900/60 p-2 rounded">
              <div className="text-slate-300">Humidity</div>
              <div className="text-slate-100">{data.current.humidity}%</div>
            </div>
            <div className="bg-sky-900/60 p-2 rounded">
              <div className="text-slate-300">Wind</div>
              <div className="text-slate-100">{data.current.wind_kph} KPH</div>
            </div>
            <div className="bg-sky-900/60 p-2 rounded">
              <div className="text-slate-300">Local Time</div>
              <div className="text-slate-100">{data.location.localtime}</div>
            </div>
          </div>

          {/* AQI + Extra */}
          <div className="mt-3 space-y-2">
            <div className="bg-sky-900/60 p-2 rounded">
              <div className="text-slate-300">Air Quality Index</div>
              <div className="font-semibold text-slate-100">
                {data.current.air_quality?.["us-epa-index"] || "—"}
              </div>
            </div>
            <div className="bg-sky-900/60 p-2 rounded text-xs">
              <div className="text-slate-300">Additional Info:</div>
              <div className="text-slate-100">
                Cloud: {data.current.cloud}% | UV: {data.current.uv} | Visibility:{" "}
                {data.current.vis_km} km
              </div>
            </div>

            
            
          </div>
        </>
      ) : (
        <div className="text-slate-400">No data available</div>
      )}
    </div>
  );
};

export default WeatherDashboard;
