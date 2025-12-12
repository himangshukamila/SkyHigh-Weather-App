import { motion } from "framer-motion";
import { Sunrise, Sunset, Moon } from "lucide-react";

const SunMoonInfo = ({ weatherData, darkMode }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getMoonPhase = () => {
    // Simple moon phase calculation
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let c = 0;
    let e = 0;
    let jd = 0;
    let b = 0;

    if (month < 3) {
      const tempYear = year - 1;
      const tempMonth = month + 12;
      c = tempYear / 100;
      e = 2 - c + Math.floor(c / 4);
      jd =
        Math.floor(365.25 * (tempYear + 4716)) +
        Math.floor(30.6001 * (tempMonth + 1)) +
        day +
        e -
        1524.5;
    } else {
      c = year / 100;
      e = 2 - c + Math.floor(c / 4);
      jd =
        Math.floor(365.25 * (year + 4716)) +
        Math.floor(30.6001 * (month + 1)) +
        day +
        e -
        1524.5;
    }

    b = jd - 2451550.1;
    b = b / 29.530588853;
    b = b - Math.floor(b);

    const phase = b * 29.530588853;

    if (phase < 1.84566) return "🌑 New Moon";
    else if (phase < 5.53699) return "🌒 Waxing Crescent";
    else if (phase < 9.22831) return "🌓 First Quarter";
    else if (phase < 12.91963) return "🌔 Waxing Gibbous";
    else if (phase < 16.61096) return "🌕 Full Moon";
    else if (phase < 20.30228) return "🌖 Waning Gibbous";
    else if (phase < 23.99361) return "🌗 Last Quarter";
    else if (phase < 27.68493) return "🌘 Waning Crescent";
    else return "🌑 New Moon";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <InfoBox
        icon={<Sunrise size={32} />}
        title="Sunrise"
        value={formatTime(weatherData.sys.sunrise)}
        gradient="from-orange-400 to-yellow-500"
        darkMode={darkMode}
      />
      <InfoBox
        icon={<Sunset size={32} />}
        title="Sunset"
        value={formatTime(weatherData.sys.sunset)}
        gradient="from-purple-500 to-pink-500"
        darkMode={darkMode}
      />
      <InfoBox
        icon={<Moon size={32} />}
        title="Moon Phase"
        value={getMoonPhase()}
        gradient="from-blue-500 to-indigo-600"
        darkMode={darkMode}
      />
    </motion.div>
  );
};

const InfoBox = ({ icon, title, value, gradient, darkMode }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className={`${
      darkMode ? "glass-morphism-dark" : "glass-morphism"
    } rounded-2xl p-6 transition-all duration-300 hover:shadow-xl overflow-hidden relative`}
  >
    <div
      className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-10 rounded-full blur-2xl`}
    ></div>

    <div className="relative z-10">
      <div className={`${darkMode ? "text-blue-400" : "text-blue-600"} mb-3`}>
        {icon}
      </div>
      <p
        className={`text-sm ${
          darkMode ? "text-gray-400" : "text-gray-600"
        } mb-2`}
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
    </div>
  </motion.div>
);

export default SunMoonInfo;
