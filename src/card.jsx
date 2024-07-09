import './App.css'
import React, { useState, useEffect } from 'react';
import clear from '../src/images/clear.png'
import clouds from '../src/images/clouds.png'
import drizzle from '../src/images/drizzle.png'
import humidity from '../src/images/humidity.png'
import mist from '../src/images/mist.png'
import rain from '../src/images/rain.png'
import search from '../src/images/search.png'
import snow from '../src/images/snow.png'
import wind from '../src/images/wind.png'
const apiKey = "3539462816d350f07142478f7522d3d9";
const url = `https://api.openweathermap.org/data/2.5/weather?&unit=metric`;

function BasicExample() {
    const [weatherIcon, setWeatherIcon] = useState(clear);
    // const [errorMessage, setErrorMessage] = useState(null); //no need more
    
    useEffect(() => {
        let updateTemp = document.getElementById("tempOutput");
        let updateHumidity = document.getElementById("updateHumidity");
        let updateWind = document.getElementById("updateWind");
        let updateCity = document.getElementById("updateCity");
        let newCity = document.querySelector(".search input");
        let button = document.querySelector(".search button");
        let updateWeather = document.querySelector(".weather img");
    async function checkWeather(City){
        const response = await fetch(url + `&appid=${apiKey}` + `&q=${City}`);
        if(response.ok){
        let data = await 
        response.json();
        let finalTemp = data.main.temp - 273.15;
        let weatherDesc = data.weather[0].main; // weather update
        updateCity.innerText = data.name;
        updateWind.innerText = `  ${data.wind.speed}km/hr`;
        updateHumidity.innerText = ` ${data.main.humidity}%`;
        updateTemp.innerText = `${finalTemp.toFixed(2)}°C`;

        switch (weatherDesc) {
            case 'Clear':
              setWeatherIcon(clear);
              break;
            case 'Clouds':
              setWeatherIcon(clouds);
              break;
            case 'Drizzle':
              setWeatherIcon(drizzle);
              break;
            case 'Rain':
              setWeatherIcon(rain);
              break;
            case 'Mist':
              setWeatherIcon(mist);
              break;
            case 'Snow':
              setWeatherIcon(snow);
              break;
            default:
              setWeatherIcon(clouds); // Default icon for unknown weather conditions
              break;
            }
            //   setErrorMessage(null); //no need more
            }
        else {
            // setErrorMessage('City not found. Please enter a valid city name.'); //no need more
            alert("city not found...")
            window.location.reload();
        }
    }
    button.addEventListener('click', ()=>{
        checkWeather(newCity.value);
        
    })

    return () => {
        button.removeEventListener('click', () => {
          checkWeather(newCity.value);
        });
      };
    }, []);

  return (
    <div className='main'>
        <h1>Weather App</h1>
    <div className="card">
        <div className='search'>
        <input type="text" placeholder="Search city" id='cityName'/>
        <button id='button'><img src={search}/></button>
        </div>
        <div className='weather'>
            <img src={weatherIcon} className='weather-icon' alt='loading...'/>
            <h1 id='tempOutput'>32&deg;C</h1>
            <h2 className="city" id ="updateCity">New Delhi</h2>
            <div className="details">
                <div className="col">
                    <img src={humidity} alt="" />
                    <div>
                        <p className="humidity">Humidity &nbsp;</p>
                        <p className="humidity-value" id = "updateHumidity">45%</p>
                    </div>
                </div>
                <div className="col-2">
                    <img src={wind} alt="" />
                    <div>
                        <p className="wind">Wind &nbsp;</p>
                        <p className="windSpeed "id = "updateWind">2km/hr</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    
  );
}




export default BasicExample;
