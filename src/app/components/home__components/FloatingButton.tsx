import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const FloatingButton = ({ onClick }: { onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="fixed bottom-8 right-8 z-50"
  >
    <Button
      onClick={onClick}
      className="bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg p-4"
    >
      <PlusCircle className="w-8 h-8" />
    </Button>
  </motion.div>
);

export default FloatingButton;
