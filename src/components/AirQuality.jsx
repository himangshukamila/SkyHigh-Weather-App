import { motion } from "framer-motion";
import { Wind } from "lucide-react";

const AirQuality = ({ data, darkMode }) => {
  const getAQILevel = (aqi) => {
    const levels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    return levels[aqi - 1] || "Unknown";
  };

  const getAQIColor = (aqi) => {
    const colors = {
      1: "from-green-400 to-green-600",
      2: "from-yellow-400 to-yellow-600",
      3: "from-orange-400 to-orange-600",
      4: "from-red-400 to-red-600",
      5: "from-purple-400 to-purple-600",
    };
    return colors[aqi] || "from-gray-400 to-gray-600";
  };

  const aqi = data.list[0].main.aqi;
  const components = data.list[0].components;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`${
        darkMode ? "glass-morphism-dark" : "glass-morphism"
      } rounded-3xl p-6 shadow-xl`}
    >
      <div className="flex items-center gap-3 mb-6">
        <Wind
          className={darkMode ? "text-blue-400" : "text-blue-600"}
          size={28}
        />
        <h2
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Air Quality Index
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AQI Score */}
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`relative w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br ${getAQIColor(
              aqi
            )} flex items-center justify-center shadow-lg`}
          >
            <div className="text-white">
              <div className="text-4xl font-bold">{aqi}</div>
              <div className="text-xs">AQI</div>
            </div>
            <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-white"></div>
          </motion.div>
          <p
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {getAQILevel(aqi)}
          </p>
        </div>

        {/* Components */}
        <div className="grid grid-cols-2 gap-4">
          <ComponentCard
            label="CO"
            value={components.co.toFixed(2)}
            unit="μg/m³"
            darkMode={darkMode}
          />
          <ComponentCard
            label="NO₂"
            value={components.no2.toFixed(2)}
            unit="μg/m³"
            darkMode={darkMode}
          />
          <ComponentCard
            label="O₃"
            value={components.o3.toFixed(2)}
            unit="μg/m³"
            darkMode={darkMode}
          />
          <ComponentCard
            label="PM2.5"
            value={components.pm2_5.toFixed(2)}
            unit="μg/m³"
            darkMode={darkMode}
          />
        </div>
      </div>
    </motion.div>
  );
};

const ComponentCard = ({ label, value, unit, darkMode }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`p-3 rounded-xl ${
      darkMode ? "bg-white/5" : "bg-white/50"
    } border ${darkMode ? "border-white/10" : "border-gray-200"}`}
  >
    <p
      className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"} mb-1`}
    >
      {label}
    </p>
    <p
      className={`text-lg font-bold ${
        darkMode ? "text-white" : "text-gray-900"
      }`}
    >
      {value}
    </p>
    <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
      {unit}
    </p>
  </motion.div>
);

export default AirQuality;
