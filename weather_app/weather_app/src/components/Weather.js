import React, { useEffect, useState } from "react";
import "./css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Time from './Time.js';
import Forecast from './Forecast.js';
import Pressure from './Pressure.js';
import Carousel from 'react-bootstrap/Carousel';

const Weather = () => {

    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Delhi");
    const [loading, setLoading] = useState(false);
    // const [tempo,settempo] = useState(null);
    let res = "";
    useEffect(() => {
        const fetchApi = async () => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=110f2b9ec97d037c60903a1418abba54`
            const response = await fetch(url);
            const resJson = await response.json();
            res = response;
            setCity(resJson);
        };
        
        fetchApi().then(() => setLoading(true))
    }, [search]);

    function sun(pro) {
        const hours = new Date(city.sys[pro] * 1000).getHours();
        const minutes = new Date(city.sys[pro] * 1000).getMinutes();
        let str = hours + ":";

        if (minutes < 10 && minutes > 0) {
            str += "0" + minutes;
        }
        else if (minutes >= 10) {
            str += minutes;
        }
        else {
            str += "00";
        }
        return str;
    }
    function searchingHandler(event) {
        setLoading(false);
        setSearch(event.target.value);
        res = "";
    }
    return (
        // <div className="body">
        <div className="box">
            <div className="inputData">
                <input
                    type="search"
                    className="inputField"
                    onBlur={searchingHandler}
                >
                </input>

            </div>
            <br></br>
            <div className="time" style={{ textAlign: "center", marginTop: "4rem" }}>
                <Time />
            </div>

            <br></br>

            {!city ? (
                <p className="errorMsg"> No Data Found </p>
            ) : (
                <div>
                    <div>
                        <h6 className="location">
                            {search}
                        </h6>
                        <h1 className="temp">
                            {(loading) && city.main.temp}°C
                            </h1>
                        <h3 className="tempmin_max"> Min :{(loading === true) && city.main.temp_min}°C | Max :{(loading === true) && city.main.temp_max}°C</h3>
                        <div>
                            {/* <h2>{(loading) && city.weather.map((desc) => {
                            return desc.main
                        }) }</h2><br></br> */}
                            <br></br>
                            <h3 style={{ textAlign: "center", fontSize: "34px", textTransform: "capitalize", fontWeight: "initial" }}>{(loading) ? city.weather.map((desc) => {
                                return desc.description
                            }) : null} <i class="fab fa-skyatlas"></i></h3>
                            <br></br><br></br>

                            <Carousel>
                                <Carousel.Item interval={20000}>
                                    <h2 style={{ textAlign: "center", fontSize: "25px", fontWeight: "bold" }}>Sunrise:  {(loading) ? sun('sunrise') : null}  <i class="fas fa-sun" style={{ color: "yellow" }} ></i> </h2>
                                    <h2 style={{ textAlign: "center", fontSize: "25px", fontWeight: "bold" }}> Sunset:  {(loading) ? sun('sunset') : null} <i class="fas fa-cloud-sun"></i></h2>
                                    <br></br><br></br>
                                </Carousel.Item>
                                <Carousel.Item interval={20000} >

                                    <h2 style={{ textAlign: "center", fontSize: "25px", fontWeight: "bold" }}>Humidity <i class="fas fa-thermometer-half" style={{ color: "black" }}></i></h2>
                                    <h2 style={{ textAlign: "center", fontSize: "25px", fontWeight: "bold" }}> <Forecast humidity={city.main.humidity} /> </h2>
                                    <br></br><br></br>

                                </Carousel.Item>
                                <Carousel.Item interval={20000}>
                                    <h2 style={{ textAlign: "center", fontSize: "25px", fontWeight: "bold" }}>Pressure <i class="fab fa-cloudscale"></i></h2>
                                    <h2 style={{ textAlign: "center", fontSize: "25px", fontWeight: "bold" }}> <Pressure pressure={city.main.pressure} /> </h2>
                                    <br></br><br></br>
                                </Carousel.Item>
                                <Carousel.Item interval={20000}>
                                    <h2 style={{ textAlign: "center", fontSize: "25px", fontWeight: "bold" }}>Wind Speed <i class="fas fa-wind"></i></h2>
                                    <h2 style={{ textAlign: "center", fontSize: "25px", fontWeight: "bold" }}>{(loading) ? city.wind.speed : null} Km/h</h2>
                                    <br></br><br></br>
                                </Carousel.Item>

                            </Carousel>
                        </div>
                        <br />
                    </div>
                    <div className="wave -one"></div>
                    <div className="wave -two"></div>
                    <div className="wave -three"></div>

                </div>
            )}

        </div>
        // </div>

    )
}
export default Weather;