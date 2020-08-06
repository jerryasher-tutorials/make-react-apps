import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const key = process.env.REACT_APP_OPENWEATHER_API_KEY;
const endpoint = 'https://api.openweathermap.org/data/2.5/';

// https://api.openweathermap.org/data/2.5/onecall?lat=37.761800&lon=-122.445860&exclude=hourly,minutely&units=imperial&appid=

export default function WeatherChart({ latLong }) {
  const { lat, long: lon } = latLong;
  const [openWeather, setOpenWeather] = useState(null);

  async function get7DayWeather(lat, lon) {
    const query =
      `onecall?lat=${lat}&lon=${lon}` +
      `&exclude=hourly,minutely&units=imperial&appid=${key}`;

    const api_call = `${endpoint}${query}`;

    const response = await fetch(api_call, {});
    const data = await response.json();
    // we have data!

    if (data) {
      setOpenWeather(data);
    } else {
      console.log('problem getting the data from openweather');
    }
  }

  useEffect(() => {
    // console.log('WeatherChart: in useEffect', 'lat', lat, 'lon', lon);
    if (lat && lon) get7DayWeather(lat, lon);
  }, [lat, lon]);

  const labels = [];
  const highs = [];
  const lows = [];
  const weather = [];
  if (openWeather) {
    const { daily = null } = openWeather;
    daily.forEach((day) => {
      const dayName = new Date(day.dt * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
      });

      labels.push(dayName);
      highs.push(day.temp.max);
      lows.push(day.temp.min);
      weather.push(day.weather[0].main);
    });
  }
  const options = {
    tooltips: { mode: 'index', intersect: false },
    scales: {
      xAxes: [
        {
          gridLines: false,
          ticks: { fontColor: '#F680BC', fontSize: 10, padding: 20 },
        },
      ],
      yAxes: [
        {
          gridLines: false,
          ticks: { fontColor: '#F680BC', fontSize: 10, padding: 20 },
        },
      ],
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Highs',
        backgroundColor: '#EC9CAC',
        borderColor: '#EC9CAC',
        data: highs,
      },
      {
        label: 'Lows',
        backgroundColor: '#9CCAF6',
        borderColor: '#9CCAF6',
        data: lows,
      },
    ],
  };

  return (
    <div className="chart">
      {openWeather && <Bar options={options} data={data} />}
    </div>
  );
}
