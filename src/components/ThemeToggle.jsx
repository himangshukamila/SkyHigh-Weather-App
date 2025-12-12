import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setDarkMode(!darkMode)}
      className={` cursor-pointer relative w-20 h-10 rounded-full p-1 transition-colors duration-300 flex items-center justify-start ${
        darkMode
          ? "bg-gradient-to-r from-indigo-600 to-purple-600"
          : "bg-gradient-to-r from-yellow-400 to-orange-400"
      } shadow-lg`}
    >
      <motion.div
        animate={{ x: darkMode ? "2.5rem" : "0px" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className=" cursor-pointer w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md z-10"
      >
        {darkMode ? (
          <Moon size={18} className="cursor-pointer text-indigo-600" />
        ) : (
          <Sun size={18} className="cursor-pointer text-orange-500" />
        )}
      </motion.div>

      {darkMode && (
        <>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="cursor-pointer absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-pulse"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="cursor-pointer absolute top-4 left-4 w-1 h-1 bg-white rounded-full animate-pulse"
          />
        </>
      )}
    </motion.button>
  );
};

export default ThemeToggle;
