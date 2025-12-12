import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, X } from "lucide-react";

const SearchBar = ({ onSearch, darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  // State to toggle the mobile search input
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm("");
      // Close mobile search after searching
      setIsMobileSearchOpen(false);
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
      className="cursor-pointer mb-8"
    >
      {/* MOBILE VIEW ONLY: Initial Button Row 
        (Hidden on 'md' screens and up, hidden if search is open)
      */}
      {!isMobileSearchOpen && (
        <div className="flex gap-2 md:hidden">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileSearchOpen(true)}
            className={`flex-1 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              darkMode
                ? "bg-white/10 text-white border border-white/20"
                : "bg-white/80 text-gray-900 border border-gray-200"
            } backdrop-blur-lg shadow-lg flex items-center justify-center gap-2`}
          >
            <Search size={20} />
            Search City
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
            className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                : "bg-gradient-to-r from-blue-400 to-purple-500 text-white"
            } shadow-lg flex items-center justify-center`}
          >
            {isGettingLocation ? (
              <MapPin size={20} className="animate-pulse" />
            ) : (
              <MapPin size={20} />
            )}
          </motion.button>
        </div>
      )}

      {/* MAIN FORM 
        (Always visible on 'md' screens. On mobile, only visible if isMobileSearchOpen is true)
      */}
      <form
        onSubmit={handleSubmit}
        className={`relative ${
          isMobileSearchOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row gap-2`}
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a city..."
            autoFocus={isMobileSearchOpen} // Auto focus when opened on mobile
            className={`w-full px-6 py-4 pl-14 pr-12 rounded-2xl text-lg outline-none transition-all duration-300 ${
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

          {/* Mobile Only: Close Button inside input */}
          {isMobileSearchOpen && (
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(false)}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 md:hidden ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Buttons Group */}
        <div className="flex gap-2">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 md:flex-none px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                : "bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white"
            } shadow-lg hover:shadow-xl`}
          >
            Search
          </motion.button>

          {/* Location button - Hidden on mobile when form is open to save space, visible on Desktop */}
          <motion.button
            type="button"
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`hidden md:flex px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              darkMode
                ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                : "bg-white/80 hover:bg-white text-gray-900 border border-gray-200"
            } backdrop-blur-lg shadow-lg hover:shadow-xl items-center gap-2`}
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
