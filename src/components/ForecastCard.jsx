import { motion } from "framer-motion";

const ForecastCard = ({ forecast, darkMode, index }) => {
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`${
        darkMode ? "glass-morphism-dark" : "glass-morphism"
      } rounded-2xl p-4 text-center transition-all duration-300 hover:shadow-xl`}
    >
      <p
        className={`text-sm font-semibold mb-2 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {formatDate(forecast.dt)}
      </p>

      <motion.img
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        src={getWeatherIcon(forecast.weather[0].icon)}
        alt={forecast.weather[0].description}
        className="w-16 h-16 mx-auto mb-2"
      />

      <p
        className={`text-xs mb-2 capitalize ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {forecast.weather[0].description}
      </p>

      <div className="flex justify-center items-center gap-2">
        <span
          className={`text-lg font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {Math.round(forecast.main.temp)}°
        </span>
        <span
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          / {Math.round(forecast.main.temp_min)}°
        </span>
      </div>
    </motion.div>
  );
};

export default ForecastCard;
