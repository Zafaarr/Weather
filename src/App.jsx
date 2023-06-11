import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.scss";
import cloudy from "./img/Clody.jpg";
import sunny from "./img/Sunny.jpg";
import rain from "./img/Rainy.jpg";
import thunder from "./img/Thunder.jpg";
import foggy from "./img/Foggy.jpg";
import snow from "./img/Snow.jpg";
import "boxicons";
import axios from "axios";
import dayjs from "dayjs";
import { getData } from "./Redux/Redux";
import { cities } from "./Cities/cities";

function App() {
  const [data, setData] = useState({
    gradus: 31,
    name: "Tashkent",
    humidity: 10,
    clouds: 0,
    speed: 2,
    rainy: 1,
    type: "Sunny",
    image: cloudy,
  });

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=098343866cc4d3fa020da63f886ce5cd&units=metric`;
      fetchWeatherData(apiUrl);
    }
  };

  const handleSearch = (selectedCity) => {
    setName(selectedCity);
    if (selectedCity !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=098343866cc4d3fa020da63f886ce5cd&units=metric`;
      fetchWeatherData(apiUrl);
    }
  };

  const fetchWeatherData = (apiUrl) => {
    axios
      .get(apiUrl)
      .then((response) => {
        let img = "";
        if (response.data.weather[0].main === "Clouds") {
          img = cloudy;
        } else if (response.data.weather[0].main === "Clear") {
          img = sunny;
        } else if (response.data.weather[0].main === "Rain") {
          img = rain;
        } else if (response.data.weather[0].main === "Thunderstorm") {
          img = thunder;
        } else if (response.data.weather[0].main === "Mist") {
          img = foggy;
        } else {
          img = cloudy;
        }
        if (response.data.rain) {
          setData({
            ...data,
            gradus: response.data.main.temp,
            name: response.data.name,
            humidity: response.data.main.humidity,
            clouds: response.data.clouds.all,
            speed: response.data.wind.speed,
            rainy: response.data.rain["1h"],
            type: response.data.weather[0].main,
            image: img,
          });
          console.log("response", response.data);
        } else {
          setData({
            ...data,
            gradus: response.data.main.temp,
            name: response.data.name,
            humidity: response.data.main.humidity,
            clouds: response.data.clouds.all,
            speed: response.data.wind.speed,
            rainy: 0,
            type: response.data.weather[0].main,
            image: img,
          });
        }
        setError("");
        console.log("response", response.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setError("Invalid city name");
        } else {
          setError("");
        }
        console.log(err);
      });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handelSubmit(e);
    }
  };

  const date = new Date();
  const formatted3 = Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  }).format(date);

  const withTime24HourFormat = dayjs(date).format("hh:mm");

  return (
    <div className="wrapper">
      <div className="container">
        <div className="container__left">
          <div className="error">{error}</div>
          <img src={data.image} alt="img" className="background__img" />
          <div className="brand">the.weather</div>
          <div className="weather__info">
            <div className="weather__gradus">{Math.floor(data.gradus)}°</div>
            <div className="weather__location">
              <h2>{data.name}</h2>
              <div className="weather__time">
                <p className="current__time">
                  {withTime24HourFormat} - {formatted3}
                </p>
              </div>
            </div>
            <div className="weather__type">{data.type}</div>
          </div>
        </div>
        <div className="container__right">
          <form type="submit" className="search__input">
            <input
              name="input"
              className="input"
              placeholder="Another location"
              type="text"
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress} // Handle Enter key press
            />
            <div onClick={handelSubmit} className="search__icon">
              <box-icon name="search"></box-icon>
            </div>
          </form>
          <div className="regions">
            {cities.map((city, i) => (
              <p key={i} onClick={() => handleSearch(city)}>
                {city}
              </p>
            ))}
          </div>
          <div className="weather__detailes">
            <h4>Weather Details</h4>
            <div className="single__details">
              <p>
                {data.type}
                <span>{data.clouds} %</span>
              </p>
              <p>
                Humidity<span>{data.humidity} %</span>
              </p>
              <p>
                Wind<span>{data.speed} km</span>
              </p>
              <p>
                Rain<span>{data.rainy} mm</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
