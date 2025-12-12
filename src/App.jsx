import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import WeatherCard from "./components/WeatherCard.jsx";
import SearchBar from "./components/SearchBar.jsx";
import ForecastCard from "./components/ForecastCard.jsx";
import AirQuality from "./components/AirQuality.jsx";
import SunMoonInfo from "./components/SunMoonInfo.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import { Cloud, Wind, Droplets, Eye, Gauge, MapPin } from "lucide-react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "YOUR_API_KEY";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("London");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const weatherResponse = await axios.get(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(weatherResponse.data);

      const { lat, lon } = weatherResponse.data.coord;

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setForecastData(forecastResponse.data);

      // Fetch air quality
      const airQualityResponse = await axios.get(
        `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      setAirQualityData(airQualityResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch weather data");
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  if (loading && !weatherData) {
    return <LoadingScreen darkMode={darkMode} />;
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
          : "bg-gradient-to-br from-blue-400 via-cyan-300 to-purple-400"
      }`}
    >
      <div className="gradient-bg animate-gradient fixed inset-0 opacity-20 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h1
            className={`text-4xl md:text-5xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            } flex items-center gap-3`}
          >
            <Cloud className="animate-float" size={48} />
            WeatherVibe
          </h1>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </motion.div>

        <SearchBar onSearch={handleSearch} darkMode={darkMode} />

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/20 border border-red-500 text-white px-6 py-4 rounded-2xl mb-6"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {weatherData && (
            <motion.div
              key={weatherData.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Main Weather Card */}
              <WeatherCard weatherData={weatherData} darkMode={darkMode} />

              {/* Additional Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <InfoCard
                  icon={<Wind />}
                  title="Wind Speed"
                  value={`${weatherData.wind.speed} m/s`}
                  darkMode={darkMode}
                />
                <InfoCard
                  icon={<Droplets />}
                  title="Humidity"
                  value={`${weatherData.main.humidity}%`}
                  darkMode={darkMode}
                />
                <InfoCard
                  icon={<Eye />}
                  title="Visibility"
                  value={`${(weatherData.visibility / 1000).toFixed(1)} km`}
                  darkMode={darkMode}
                />
                <InfoCard
                  icon={<Gauge />}
                  title="Pressure"
                  value={`${weatherData.main.pressure} hPa`}
                  darkMode={darkMode}
                />
              </div>

              {/* Sun & Moon Info */}
              <SunMoonInfo weatherData={weatherData} darkMode={darkMode} />

              {/* Air Quality */}
              {airQualityData && (
                <AirQuality data={airQualityData} darkMode={darkMode} />
              )}

              {/* 5-Day Forecast */}
              {forecastData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2
                    className={`text-2xl font-bold mb-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    5-Day Forecast
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {forecastData.list
                      .filter((_, index) => index % 8 === 0)
                      .slice(0, 5)
                      .map((forecast, index) => (
                        <ForecastCard
                          key={index}
                          forecast={forecast}
                          darkMode={darkMode}
                          index={index}
                        />
                      ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`mt-12 text-center pb-6 ${
            darkMode ? "text-gray-400" : "text-gray-700"
          }`}
        >
          <p className="flex items-center justify-center gap-2">
            <MapPin size={16} />
            Powered by OpenWeatherMap API
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

// Info Card Component
const InfoCard = ({ icon, title, value, darkMode }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className={`${
      darkMode ? "glass-morphism-dark" : "glass-morphism"
    } rounded-2xl p-6 transition-all duration-300`}
  >
    <div className={`${darkMode ? "text-blue-400" : "text-blue-600"} mb-2`}>
      {icon}
    </div>
    <p
      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-1`}
    >
      {title}
    </p>
    <p
      className={`text-2xl font-bold ${
        darkMode ? "text-white" : "text-gray-900"
      }`}
    >
      {value}
    </p>
  </motion.div>
);

export default App;
