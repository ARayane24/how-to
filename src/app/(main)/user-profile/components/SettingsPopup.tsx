import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ActionButton from "../../components/ActionButton";

const SettingsPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <DialogContent className="bg-gray-800/90 text-white border-gray-700 backdrop-blur-md rounded-xl shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">Settings</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Manage your application settings.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {/* Notifications Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Enable Notifications</span>
                  <label className="relative inline-flex items-center mr-5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationsEnabled}
                      onChange={() =>
                        setNotificationsEnabled(!notificationsEnabled)
                      }
                      className="sr-only peer"
                    />
                    <div
                      className={cn(
                        "w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300",
                        "peer-checked:after:translate-x-full peer-checked:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all",
                        "peer-checked:bg-blue-600 rounded-full dark:bg-gray-700 peer-focus:ring-blue-800 dark:border-gray-600"
                      )}
                    ></div>
                  </label>
                </div>

                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Dark Mode</span>
                  <label className="relative inline-flex items-center mr-5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                      className="sr-only peer"
                    />
                    <div
                      className={cn(
                        "w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300",
                        "peer-checked:after:translate-x-full peer-checked:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all",
                        "peer-checked:bg-blue-600 rounded-full dark:bg-gray-700 peer-focus:ring-blue-800 dark:border-gray-600"
                      )}
                    ></div>
                  </label>
                </div>

                {/* Language Select */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Select Language</span>
                  <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="bg-gray-700 text-white border border-gray-600 rounded-md p-2"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="ar">العربية</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <ActionButton
                  onClick={onClose}
                  className="bg-gray-700/50 text-gray-300 hover:bg-gray-700/70"
                >
                  Close
                </ActionButton>
              </DialogFooter>
            </DialogContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default SettingsPopup;
