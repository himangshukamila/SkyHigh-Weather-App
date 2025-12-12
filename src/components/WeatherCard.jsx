import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

const WeatherCard = ({ weatherData, darkMode }) => {
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getBackgroundGradient = (weather) => {
    const main = weather.toLowerCase();
    if (main.includes("clear")) {
      return darkMode
        ? "from-blue-900 to-purple-900"
        : "from-yellow-300 to-orange-400";
    } else if (main.includes("cloud")) {
      return darkMode
        ? "from-gray-700 to-gray-900"
        : "from-gray-300 to-gray-500";
    } else if (main.includes("rain") || main.includes("drizzle")) {
      return darkMode
        ? "from-blue-800 to-blue-950"
        : "from-blue-400 to-blue-600";
    } else if (main.includes("snow")) {
      return darkMode
        ? "from-cyan-800 to-blue-900"
        : "from-cyan-200 to-blue-300";
    } else if (main.includes("thunder")) {
      return darkMode
        ? "from-purple-900 to-gray-900"
        : "from-purple-500 to-gray-700";
    }
    return darkMode
      ? "from-blue-900 to-purple-900"
      : "from-blue-400 to-purple-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getBackgroundGradient(
        weatherData.weather[0].main
      )} p-8 shadow-2xl`}
    >
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="relative z-10">
        {/* Location and Date */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-white/90 mb-2">
              <MapPin size={20} />
              <span className="text-lg">
                {weatherData.name}, {weatherData.sys.country}
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Calendar size={16} />
              <span>{formatDate()}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <motion.img
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1 }}
              src={getWeatherIcon(weatherData.weather[0].icon)}
              alt={weatherData.weather[0].description}
              className="w-32 h-32 drop-shadow-2xl animate-float"
            />
          </div>
        </div>

        {/* Temperature and Description */}
        <div className="flex items-end gap-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-start"
          >
            <span className="text-8xl md:text-9xl font-bold text-white">
              {Math.round(weatherData.main.temp)}
            </span>
            <span className="text-4xl font-light text-white/80 mt-4">°C</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="pb-4"
          >
            <p className="text-2xl text-white capitalize mb-1">
              {weatherData.weather[0].description}
            </p>
            <p className="text-white/70">
              Feels like {Math.round(weatherData.main.feels_like)}°C
            </p>
          </motion.div>
        </div>

        {/* Min/Max Temperature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex gap-6 text-white/80"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">↑</span>
            <span className="font-semibold">
              {Math.round(weatherData.main.temp_max)}°C
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">↓</span>
            <span className="font-semibold">
              {Math.round(weatherData.main.temp_min)}°C
            </span>
          </div>
        </motion.div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
