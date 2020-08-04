import React, { useState } from 'react';
import './App.css';
import GeoForm from './components/GeoForm';

// openweathermap.org
// course:
// https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely&units=imperial&appid=bb96c7f9ac6f57dc00333727c5407547
// api key: bb96c7f9ac6f57dc00333727c5407547

const openweather_api_key = process.env.REACT_APP_OPENWEATHER_API_KEY;
const openweather_endpoint = 'api.openweathermap.org/data/2.5';

const home_lat = 37.7618;
const home_long = -122.44586;

// https://api.openweathermap.org/data/2.5/onecall?lat=37.761800&lon=-122.445860&exclude=hourly,minutely&units=imperial&appid=349147899309bf857db33d928042ed78

export default function App() {
  const [latLong, setLatLong] = useState({ status: null, lat: '', long: '' });
  // 1. have a form, type in a city
  // 2. geocode to convert city to lat long
  // 3. pass lat long to weather to get weather data
  // 4. format it for chart
  // 5. display the chart

  let latLongStr = '';
  if (latLong.status) {
    latLongStr = `${latLong.status} -> ${latLong.lat}, ${latLong.long}`;
  }

  return (
    <div className="app">
      {/* form goes here */}
      <GeoForm updateLatLong={setLatLong} />
      <div>LatLong: {latLongStr}</div>
      {/* chart goes here */}
      {latLong && <WeatherChart latLong={latLong} />}
    </div>
  );
}
// component to take lat long, get weather, display chart
const WeatherChart = ({ latLong }) => <>chart</>;
