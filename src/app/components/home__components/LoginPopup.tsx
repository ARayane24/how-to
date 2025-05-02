import { ReactNode } from "react";
import { motion } from "framer-motion";

interface LoginPopupProps {
  onClose: () => void;
  children: ReactNode;
}

const LoginPopup = ({ onClose, children }: LoginPopupProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default LoginPopup;