import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countries = ({ countries }) => {
  // State to hold the selected country
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (selectedCountry) {
      const capital = selectedCountry.capital[0];
      const apiKey = import.meta.env.VITE_SOME_KEY
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;
  
      axios.get(url)
        .then(response => setWeather(response.data))
        .catch(error => console.error('Error fetching weather data:', error));
    }
  }, [selectedCountry]);

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (selectedCountry) {
    // Display single country view
    const country = selectedCountry || countries[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital && country.capital[0]}</p>
        <p>Area: {country.area} km²</p>
        <h3>Languages:</h3>
        <ul>
          {country.languages && Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} style={{ width: '150px' }} />
        {weather && (
          <div>
            <h3>Weather in {country.capital[0]}</h3>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
        <button onClick={() => setSelectedCountry(null)}>Close</button>
      </div>
    )
  } else {
    // Display multi country view
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={() => setSelectedCountry(country)}>Show Details</button>
          </li>
        ))}
      </ul>
    )
  }
}

export default Countries
