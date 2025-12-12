import { motion } from "framer-motion";
import { Cloud, CloudRain, Sun } from "lucide-react";

const LoadingScreen = ({ darkMode }) => {
  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
          : "bg-gradient-to-br from-blue-400 via-cyan-300 to-purple-400"
      }`}
    >
      <div className="gradient-bg animate-gradient fixed inset-0 opacity-20"></div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sun
              className={darkMode ? "text-yellow-400" : "text-yellow-300"}
              size={48}
            />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            <Cloud
              className={darkMode ? "text-blue-300" : "text-white"}
              size={56}
            />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -18, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          >
            <CloudRain
              className={darkMode ? "text-cyan-400" : "text-blue-200"}
              size={52}
            />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-3xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Fetching Weather Data
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-2"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className={`w-3 h-3 rounded-full ${
                darkMode ? "bg-blue-400" : "bg-blue-600"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
