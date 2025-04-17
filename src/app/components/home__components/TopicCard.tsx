import { Calendar, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Topic } from "@/models/topic";

const TopicCard = ({
  topic,
  topicScore,
  onClick,
}: {
  topic: Topic;
  topicScore: number;
  onClick?: () => void;
}) => {
  const [score, setScore] = useState<number>(topicScore || 0); // assuming topic has `score` prop

  const handleUpvote = () => setScore((prev) => prev + 1);
  const handleDownvote = () => setScore((prev) => prev - 1);

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className=" cursor-pointer bg-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-700 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
    >
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-xl font-semibold text-white">{topic.problem}</h3>
        <div className="flex items-center gap-2 text-gray-400">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            {formatDistanceToNow(topic.createdAt, { addSuffix: true })}
          </span>
        </div>
      </div>

      <p className="text-gray-300 mt-2 line-clamp-2">{topic.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <Button
          variant="outline"
          className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 hover:text-purple-200 border-purple-500/30"
        >
          <MessageSquare className="mr-2 w-4 h-4" /> View Details
        </Button>

        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={handleUpvote}
            className="cursor-pointer text-green-400 hover:text-green-300"
          >
            <ThumbsUp className="w-5 h-5" />
          </Button>
          <span className="text-white font-semibold">{score}</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleDownvote}
            className="cursor-pointer text-red-400 hover:text-red-300"
          >
            <ThumbsDown className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicCard;
