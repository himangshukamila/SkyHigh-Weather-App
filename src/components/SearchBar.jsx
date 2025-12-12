import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";

const SearchBar = ({ onSearch, darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm("");
    }
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Reverse geocoding to get city name
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${
                import.meta.env.VITE_WEATHER_API_KEY || "YOUR_API_KEY"
              }`
            );
            const data = await response.json();

            if (data && data.length > 0) {
              onSearch(data[0].name);
            }
          } catch (error) {
            console.error("Error getting location name:", error);
          } finally {
            setIsGettingLocation(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to retrieve your location. Please check your browser settings."
          );
          setIsGettingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setIsGettingLocation(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a city..."
              className={`w-full px-6 py-4 pl-14 rounded-2xl text-lg outline-none transition-all duration-300 ${
                darkMode
                  ? "bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:bg-white/15 focus:border-white/40"
                  : "bg-white/80 text-gray-900 placeholder-gray-500 border border-gray-200 focus:bg-white focus:border-blue-400"
              } backdrop-blur-lg`}
            />
            <Search
              className={`absolute left-5 top-1/2 transform -translate-y-1/2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
              size={20}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                : "bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white"
            } shadow-lg hover:shadow-xl`}
          >
            Search
          </motion.button>

          <motion.button
            type="button"
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              darkMode
                ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                : "bg-white/80 hover:bg-white text-gray-900 border border-gray-200"
            } backdrop-blur-lg shadow-lg hover:shadow-xl flex items-center gap-2`}
          >
            <MapPin
              size={20}
              className={isGettingLocation ? "animate-pulse" : ""}
            />
            {isGettingLocation ? "Getting..." : "My Location"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBar;
