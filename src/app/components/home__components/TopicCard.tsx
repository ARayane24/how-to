import { Calendar, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import { Topic, Vote } from "@/models/topic";
import { checkDataInLocal, getLocalAccount } from "@/utils/local_store";
import LoginPopup from "./LoginPopup";
import { useRouter } from "next/navigation";
import LaravelApiClient from "@/api-clients/laravel_client";
import { XML } from "@/utils/xml";

const TopicCard = ({
  topic,
  topicScore,
  isSolved = false,
  onClick,
}: {
  isSolved?: boolean;
  topic: Topic;
  topicScore: number;
  onClick?: () => void;
}) => {
  const router = useRouter();
  const [score, setScore] = useState<number>(topicScore || 0);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [voteId, setVoteId] = useState<Number>(-1);

  const [userVoteType, setuserVoteType] = useState<"positive" | "negative" | null>(null);

  const checkVote = async () => {
    const response = await LaravelApiClient.get(
      "/api/v1/votes/topic/" + topic.id
    );

    if (!response.ok) {
      throw new Error("Failed to fetch votes");
    }

    const xmlText = await response.text();

    // Parse XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    // Get all <vote> elements
    const voteNodes = xmlDoc.querySelectorAll("vote");

    const currentAccountId = getLocalAccount()?.id || -1;

    voteNodes.forEach((vote) => {
      const idAccount = vote.getAttribute("idAccount");
      if (idAccount === String(currentAccountId)) {
        setVoteId(parseInt(vote.getAttribute("id") || "-1"));
        const isPositiveText = vote
          .querySelector("isPositive")
          ?.textContent?.trim();
        if (isPositiveText === "true") {
          setuserVoteType("positive");
        } else if (isPositiveText === "false") {
          setuserVoteType( "negative");
        }
      }
    });

    console.log("Vote ID: ", voteId);
    console.log("User Vote Type: ", userVoteType);
    console.log("Current Account ID: ", currentAccountId);
    console.log("Vote Nodes: ", xmlText);
  };

  const getScore = async () => {
    const response = await LaravelApiClient.get(
      "/api/v1/votes/topic/" + topic.id
    );

    if (!response.ok) {
      throw new Error("Failed to fetch votes");
    }

    const xmlText = await response.text();

    // Parse XML string to DOM
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    // Extract the <total> tag
    const upVotes = xmlDoc.querySelector("voteCounts > upVotes");
    const downVotes = xmlDoc.querySelector("voteCounts > downVotes");

    if (
      !upVotes ||
      isNaN(parseInt(upVotes.textContent || "")) ||
      !downVotes ||
      isNaN(parseInt(downVotes.textContent || ""))
    ) {
      throw new Error("Invalid vote count in XML response");
    }

    const totalVotes =
      parseInt(upVotes.textContent!) - parseInt(downVotes.textContent!);
    setScore(totalVotes);
  };
  useEffect(() => {
    checkVote();
    getScore();
  }, []);

  const vote = async (vote: boolean) => {
    const response = await LaravelApiClient.post(
      "/api/v1/topics/" + topic.id + "/vote",
      Vote.toXML(new Vote(0, topic.id, getLocalAccount()?.id || -1, vote))
    );

    if (!response.ok) {
      throw new Error("Failed to fetch votes");
    }
    getScore();
    checkVote();
  };

  const unVote = async () => {
    const response = await LaravelApiClient.delete(
      "/api/v1/votes/" + voteId
    );
    if (!response.ok) {
      throw new Error("Failed to fetch votes");
    }
  }

  const handleUpvote = async () => {
      if (checkDataInLocal("accessToken")) {
      if (voteId === -1 || userVoteType === "negative") {
        await vote(true);
        setScore((prev) => prev + 1);
      } else {
        if (userVoteType === "positive") {
          await unVote();
          setScore((prev) => prev - 1);
        }
        setVoteId(-1);
      }
    } else {
      handleUserNotLoggedIn();
    }
  }
  const handleDownvote = async () => {
    if (checkDataInLocal("accessToken")) {
    if (voteId === -1 || userVoteType === "positive") {
      await vote(false);
      setScore((prev) => prev - 1);
    } else {
      if (userVoteType === "negative") {
        await unVote();
        setScore((prev) => prev + 1);
      }
      setVoteId(-1);
    }
  } else {
    handleUserNotLoggedIn();
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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className=" bg-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-700 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
      >
        <div onClick={onClick} className="cursor-pointer">
          <div className="flex justify-between items-start gap-4">
            {isSolved ? (
              <span className="text-sm bg-green-500 text-white px-2 py-1 rounded-full">
                Solved
              </span>
            ) : (
              <span className="text-sm bg-red-900 text-white px-2 py-1 rounded-full">
                Unsolved
              </span>
            )}
            <h3 className="text-xl font-semibold text-white">
              {topic.problem}
            </h3>
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {formatDistanceToNow(topic.createdAt, { addSuffix: true })}
              </span>
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
            <h2 className="text-lg font-semibold mb-4">
              You need to be logged in
            </h2>
            <p className="text-gray-500 mb-6">
              Please log in or sign up to perform this action.
            </p>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  navigate("login");
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("signin");
                }}
              >
                Signin
              </Button>
            </div>
          </div>
        </LoginPopup>
      )}
    </>
  );
};

export default TopicCard;
