import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import searchIcon from "./assets/search.png";
import clear from "./assets/clear.png";
import cloud from "./assets/cloud.png";
import drizzle from "./assets/drizzle.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import wind from "./assets/wind.png";
import humidity from "./assets/humidity.png";

const API_KEY = "7707c549f9638546f951e192651ae6a1"; // Replace with your actual API key
const DEFAULT_CITY = "London"; // Default city shown when app loads

function Weather() {
    const [city, setCity] = useState(DEFAULT_CITY);
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    // Function to fetch weather data
    const getWeatherByCity = (city) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
            .then((response) => {
                setWeather(response.data);
                setError("");
            })
            .catch(() => {
                setError("City not found");
            });
    };

    // Load default city weather when the app starts
    useEffect(() => {
        getWeatherByCity(DEFAULT_CITY);
    }, []);

    // Function to handle search
    const searchWeather = () => {
        if (!city) return;
        getWeatherByCity(city);
    };

    // Handle "Enter" key press
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            searchWeather();
        }
    };

    // Function to determine which weather icon to show
    const getWeatherIcon = () => {
        if (!weather) return clear;
        const main = weather.weather[0].main.toLowerCase();
        if (main.includes("cloud")) return cloud;
        if (main.includes("drizzle")) return drizzle;
        if (main.includes("rain")) return rain;
        if (main.includes("snow")) return snow;
        return clear;
    };

    return (
        <div className="weather">
            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for a city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyDown} // Enable "Enter" key search
                />
                <img src={searchIcon} alt="Search" onClick={searchWeather} />
            </div>

            {/* Error Message */}
            {error && <p className="error">{error}</p>}

            {/* Weather Data UI */}
            {weather && (
                <>
                    <img src={getWeatherIcon()} alt="Weather Icon" className="weather-icon" />
                    <p className="temp">{Math.round(weather.main.temp)}°C</p>
                    <p className="location">{weather.name}</p>

                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity} alt="Weather Condition" />
                            <div>
                                <p>{weather.weather[0].description}</p> {/* Weather Description */}
                                <span>Description</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind} alt="Wind Speed" />
                            <div>
                                <p>{weather.wind.speed} km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Weather;
