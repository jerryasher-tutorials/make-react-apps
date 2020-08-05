import React, { useState } from 'react';
import './App.css';
import GeoForm from './components/GeoForm';
import WeatherChart from './components/WeatherChart';

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
      <GeoForm setLatLong={setLatLong} />
      <div>LatLong: {latLongStr}</div>
      {/* chart goes here */}
      {latLong.status !== null && <WeatherChart latLong={latLong} />}
    </div>
  );
}
