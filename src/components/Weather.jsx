import React, { useEffect, useState } from "react";
import "./weather.css";
import { IoSearch } from "react-icons/io5";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        temp: Math.floor(data.main.temp),
        speed: data.wind.speed,
        location: data.name,
        icon: data.weather[0].icon,
      });
      setValue("");
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather api");
    }
  };

  useEffect(() => {
    handleSubmit("Chennai");
  }, []);

  return (
    <div className="weather">
      <div className="search-btn">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <IoSearch className="icon" onClick={() => handleSubmit(value)} />
      </div>

      {weatherData ? (
        <>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
            alt="wheather icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temp}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.speed}km/h </p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h5 className="error">No data to show</h5>
      )}
    </div>
  );
};

export default Weather;
