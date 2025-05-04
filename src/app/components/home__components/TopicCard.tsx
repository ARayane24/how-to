import { Calendar, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Topic, Vote } from "@/models/topic";
import { checkDataInLocal, getLocalAccount } from "@/utils/local_store";
import LoginPopup from "./LoginPopup";
import { useRouter } from "next/navigation";
import LaravelApiClient from "@/api-clients/laravel_client";

const TopicCard = ({
  topic,
  topicScore,
  isSolved = false,
  onClick,
  topicDeleted,
  addSolutionStep,
}: {
  isSolved?: boolean;
  topic: Topic;
  topicScore: number;
  onClick?: () => void;
  topicDeleted?: () => void;
  addSolutionStep?: () => void;
}) => {
  const router = useRouter();
  const [score, setScore] = useState<number>(topicScore || 0);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [voteId, setVoteId] = useState<number>(-1);
  const [userVoteType, setuserVoteType] = useState<"positive" | "negative" | null>(null);
  const currentAccount = getLocalAccount();

  const checkVote = async () => {
    const response = await LaravelApiClient.get("/api/v1/votes/topic/" + topic.id);
    if (!response.ok) throw new Error("Failed to fetch votes");

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");
    const voteNodes = xmlDoc.querySelectorAll("vote");

    voteNodes.forEach((vote) => {
      const idAccount = vote.getAttribute("idAccount");
      if (idAccount === String(currentAccount?.id)) {
        setVoteId(parseInt(vote.getAttribute("id") || "-1"));
        const isPositiveText = vote.querySelector("isPositive")?.textContent?.trim();
        if (isPositiveText === "true") setuserVoteType("positive");
        else if (isPositiveText === "false") setuserVoteType("negative");
      }
    });
  };

  const getScore = async () => {
    const response = await LaravelApiClient.get("/api/v1/votes/topic/" + topic.id);
    if (!response.ok) throw new Error("Failed to fetch votes");

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    const upVotes = xmlDoc.querySelector("voteCounts > upVotes");
    const downVotes = xmlDoc.querySelector("voteCounts > downVotes");
    if (!upVotes || !downVotes) return;

    const totalVotes = parseInt(upVotes.textContent || "0") - parseInt(downVotes.textContent || "0");
    setScore(totalVotes);
  };

  const vote = async (vote: boolean) => {
    const response = await LaravelApiClient.post(
      "/api/v1/topics/" + topic.id + "/vote",
      Vote.toXML(new Vote(0, topic.id, currentAccount?.id || -1, vote))
    );
    if (!response.ok) throw new Error("Failed to vote");
    getScore();
    checkVote();
  };

  const unVote = async () => {
    const response = await LaravelApiClient.delete("/api/v1/votes/" + voteId);
    if (!response.ok) throw new Error("Failed to unvote");
    getScore();
    checkVote();
  };

  const handleUpvote = async () => {
    if (!checkDataInLocal("accessToken")) return handleUserNotLoggedIn();
    if (voteId === -1 || userVoteType === "negative") {
      await vote(true);
    } else if (userVoteType === "positive") {
      await unVote();
    }
  };

  const handleDownvote = async () => {
    if (!checkDataInLocal("accessToken")) return handleUserNotLoggedIn();
    if (voteId === -1 || userVoteType === "positive") {
      await vote(false);
    } else if (userVoteType === "negative") {
      await unVote();
    }
  };

  const handleUserNotLoggedIn = () => {
    setShowLoginPopup(true);
  };

  const closePopup = () => {
    setShowLoginPopup(false);
  };

  const navigate = (path: string) => {
    closePopup();
    router.push("/" + path);
  };

  const deleteTopic = async () => {
    if (!currentAccount || currentAccount.id !== topic.idAccount) return;
    const confirmed = window.confirm("Are you sure you want to delete this topic?");
    if (!confirmed) return;
    const response = await LaravelApiClient.delete(`/api/v1/topics/${topic.id}`);
    if (response.ok) {
      router.refresh(); // or notify parent to remove topic
      topicDeleted?.();
    } else {
      alert("Failed to delete the topic.");
    }
  };

  useEffect(() => {
    checkVote();
    getScore();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-700 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
      >
        <div onClick={onClick} className="cursor-pointer">
          <div className="flex justify-between items-start gap-4">
            <span className={`text-sm px-2 py-1 rounded-full ${isSolved ? "bg-green-500" : "bg-red-900"} text-white`}>
              {isSolved ? "Solved" : "Unsolved"}
            </span>
            <h3 className="text-xl font-semibold text-white">{topic.problem}</h3>
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatDistanceToNow(topic.createdAt, { addSuffix: true })}</span>
            </div>
          </div>
          <p className="text-gray-300 mt-2 line-clamp-2">{topic.description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Button
            onClick={onClick}
            variant="outline"
            className="cursor-pointer bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 hover:text-purple-200 border-purple-500/30"
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
            { currentAccount && currentAccount?.id === topic.idAccount && (
              <Button variant="destructive" onClick={deleteTopic}>
                Delete
              </Button>
            ) }

            { currentAccount && !topic.hasbeenSolved && (<Button className="bg-green-400 text-black"  variant="default" onClick={addSolutionStep}>
              Add solution
            </Button>)}
          </div>
        </div>
      </motion.div>

      {showLoginPopup && (
        <LoginPopup onClose={closePopup}>
          <div className="p-6 flex flex-col">
            <button
              onClick={closePopup}
              className="w-fit self-end mb-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">You need to be logged in</h2>
            <p className="text-gray-500 mb-6">Please log in or sign up to perform this action.</p>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => navigate("login")}>
                Login
              </Button>
              <Button onClick={() => navigate("signin")}>Signin</Button>
            </div>
          </div>
        </LoginPopup>
      )}
    </>
  );
};

export default TopicCard;
