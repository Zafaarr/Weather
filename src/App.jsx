import { useEffect, useState } from "react";
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

function App() {
  const [data, setData] = useState({
    gradus: 31,
    name: "Tashkent",
    humidity: 10,
    speed: 2,
    rainy: 1,
    type: "Sunny",
    image: cloudy,
  });

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=tashkent&appid=098343866cc4d3fa020da63f886ce5cd&units=metric`;
  //   axios
  //     .get(apiUrl)
  //     .then((response) => console.log(response.data))
  //     .catch((error) => console.log(error));
  // }, []);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=098343866cc4d3fa020da63f886ce5cd&units=metric`;
      axios.get(apiUrl).then((response) => {
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
            speed: response.data.wind.speed,
            rainy: response.data.rain["1h"],
            type: response.data.weather[0].main,
            image: img,
          });
        } else {
          setData({
            ...data,
            gradus: response.data.main.temp,
            name: response.data.name,
            humidity: response.data.main.humidity,
            speed: response.data.wind.speed,
            rainy: 1,
            type: response.data.weather[0].main,
            image: img,
          });
        }
        setError("");
        console.log("response", response.data);
      });
      // .catch((err) => {
      //   if (err.response.status === 404) {
      //     setError("Invalid city name");
      //   } else {
      //     setError("");
      //   }
      //   console.log(err);
      // });
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
          <div className="weather__info">
            <div className="weather__gradus">{Math.floor(data.gradus)} °C</div>
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
          <form onClick={handelSubmit} type="submit" className="search__input">
            <input
              name="input"
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Another location"
              type="text"
            />
            <div className="search__icon">
              <box-icon name="search"></box-icon>
            </div>
          </form>
          <div className="regions">
            <p>Tashkent</p>
            <p>Samarkand</p>
            <p>Bukhara</p>
            <p>Urgench</p>
            <p>Nukus</p>
            <p>Navoiy</p>
            <p>Qarshi</p>
            <p>Termiz</p>
            <p>Fergana</p>
            <p>Namangan</p>
            <p>Andijon</p>
            <p>Guliston</p>
            <p>Jizzakh</p>
          </div>
          <div className="weather__detailes">
            <h4>Weather Details</h4>
            <div className="single__details">
              <p>
                {data.type}
                <span>12 %</span>
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
