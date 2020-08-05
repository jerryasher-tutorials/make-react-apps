import React, { useState, useEffect } from 'react';

// openweathermap.org
// course:
// https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely&units=imperial&appid=bb96c7f9ac6f57dc00333727c5407547

const key = process.env.REACT_APP_OPENWEATHER_API_KEY;
const endpoint = 'https://api.openweathermap.org/data/2.5/';

// https://api.openweathermap.org/data/2.5/onecall?lat=37.761800&lon=-122.445860&exclude=hourly,minutely&units=imperial&appid=349147899309bf857db33d928042ed78

export default function WeatherChart({ latLong }) {
  const { lat, long: lon } = latLong;

  const [data, setData] = useState({
    status: null,
    current: null,
    daily: null,
  });

  async function getWeather(lat, lon) {
    const query =
      `onecall?lat=${lat}&lon=${lon}` +
      `&exclude=hourly,minutely&units=imperial&appid=${key}`;

    const api_call = `${endpoint}${query}`;

    console.log('getWeather -> api_call', api_call);
    const response = await fetch(api_call, {});
    console.log('getWeather -> response', response);
    console.dir(response);
    const data = await response.json();
    // we have data!

    console.log('WeatherChart -> data', data);
    console.dir(data);

    setData(data);
  }

  useEffect(() => {
    console.log('WeatherChart: in useEffect', 'lat', lat, 'lon', lon);
    if (lat && lon) getWeather(lat, lon);
  }, [lat, lon]);

  const { current = null, daily = null } = data;
  /*
  console.log('WeatherChart -> status', status);
  console.log('WeatherChart -> current', current);
  console.log('WeatherChart -> daily', daily);
*/

  return <dir>Weather API Call</dir>;
}
