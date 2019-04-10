import React, { useEffect, useState } from 'react';
import SmallSpinner from '../../../../users/components/UI/SmallSpinner/SmallSpinner';

const WeatherWidget = props => {
  const [positions, setPositions] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [dailyWeatherData, setDailyWeatherData] = useState({});
  useEffect(() => { getUserLocation(); }, []);
  useEffect(() => { if(positions && positions.longitude && positions.latitude) weatherApi(positions.longitude, positions.latitude); }, [positions]);

  const getUserLocation = async () => {
    if(!localStorage.location){
      const user = await fetch('https://api.ipdata.co/?api-key=83a6049fdd6a9c358a1492180a87d5164e130b0162faca9627a7f782');
      const { longitude, latitude, city, country_name } = await user.json();
      setPositions({ longitude, latitude, city, country_name });
      localStorage.setItem('location', JSON.stringify({ longitude, latitude, city, country_name }));
    }else {
      const loc = JSON.parse(localStorage.getItem('location'));
      setPositions({ ...loc });
    }

  }

  const weatherApi = async (long,lat) => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const weather = await fetch(`${proxy}https://api.darksky.net/forecast/06776b9a1d887f4a3cb4543190b21c6b/${lat},${long}`);
    const {currently, daily} = await weather.json();
    const { temperature, summary, icon, time, apparentTemperature } = currently;
    setWeatherData({ temperature: Math.floor((temperature - 32) * 5/9), summary, day: new Date(time * 1000).toLocaleDateString('en-US',{weekday: 'long'}), datum: new Date(time * 1000).toLocaleDateString(), tempFeels: Math.floor((apparentTemperature - 32) * 5/9), icon });
    const days = daily.data.slice(1,8);
    const daysData = [];

    for(let obj of days) {
      const { time, apparentTemperatureHigh, icon } = obj;
      const dayData = { temperature: Math.floor((apparentTemperatureHigh - 32) * 5/9), day: new Date(time * 1000).toLocaleDateString('en-US',{weekday: 'long'}), icon }
      daysData.push(dayData);
    }
    setDailyWeatherData(daysData);
  }

  if(!weatherData.datum || !dailyWeatherData.length) {
    return (
      <div className="col-xl-8 mb-30 bg-white">
        <SmallSpinner/>
      </div>
    );
  }else {
    return (
      <div className="col-xl-8 mb-30">
        <div className="card card-statistics text-center h-100">
          <div className="bg-white pb-15 pt-15">
            <p className="mb-10 today-date text-dark">{weatherData.datum}</p>
            <h4 className="mb-0 text-dark">{positions.city}, {positions.country_name}</h4>
          </div>
          <div className="card-body">
            <div className="weather-icon py-3 text-warning">
              <i className={`wi wi-forecast-io-${weatherData.icon}`}></i>
            </div>
            <h2 className="mt-20 text-white">{weatherData.temperature}° C</h2>
            <p className="text-white">Feels like {weatherData.tempFeels}° C</p>
            <p className="today-day text-white">{weatherData.day}</p>
            <div className="divider mt-30 mb-30"></div>  
            <div className="row no-gutters">
              {dailyWeatherData.map((day, index) => {
                return(
                  <div key={index} className="col-6 col-md-3 col-sm-3">
                    <div className="weather-icon icon2 mb-20 text-white"> 
                      <i className={`wi wi-forecast-io-${day.icon}`}></i>
                      <h4 className="mt-20 text-white">{day.temperature}° C</h4>
                      <p className="today-day text-white">{day.day}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherWidget;