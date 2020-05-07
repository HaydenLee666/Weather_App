import React from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherApp from './component/WeatherApp.js'
import 'weather-icons/css/weather-icons.css';

function App() {
  return (
    <div className="App">
      <WeatherApp />
    </div>
  );
}

export default App;
