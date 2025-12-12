import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setDarkMode(!darkMode)}
      className={`relative w-20 h-10 rounded-full p-1 transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-r from-indigo-600 to-purple-600"
          : "bg-gradient-to-r from-yellow-400 to-orange-400"
      } shadow-lg`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md ${
          darkMode ? "translate-x-10" : "translate-x-0"
        }`}
      >
        {darkMode ? (
          <Moon size={18} className="text-indigo-600" />
        ) : (
          <Sun size={18} className="text-orange-500" />
        )}
      </motion.div>

      {/* Stars decoration for dark mode */}
      {darkMode && (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-pulse"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-4 left-4 w-1 h-1 bg-white rounded-full animate-pulse"
          />
        </>
      )}
    </motion.button>
  );
};

export default ThemeToggle;
