"use client";
import { useEffect, useState } from "react";
import { Loader2, AlertCircle, Search } from "lucide-react";
import { Topic } from "@/models/topic";
import PageWrapper from "./(main)/components/PageWrapper";
import TopicCard from "./components/home__components/TopicCard";
import FloatingButton from "./components/home__components/FloatingButton";
import LaravelApiClient from "@/api-clients/laravel_client";
import { XML } from "@/utils/xml";
import { useRouter } from "next/navigation";
import { checkDataInLocal } from "@/utils/local_store";
import AddTopicPopup from "./components/home__components/AddTopicPopup";

const Home = () => {
  const router = useRouter();
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await LaravelApiClient.get("/api/v1/topics");
        if (!response.ok) {
          throw new Error("Failed to fetch topics");
        }

        const text = await response.text();
        const xmlDoc = XML.parseXML(text);

        const topics = Array.from(xmlDoc.getElementsByTagName("topic"))
          .map((topic) => Topic.fromXML(topic))
          .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

        setTopics(topics);
        setLoading(false);
      } catch (err) {
        setError(err?.toString() + " : Failed to fetch topics.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredTopics = topics.filter((topic) =>
    topic.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return (
      <PageWrapper title="Topics" subtitle="Loading...">
        <Loader2 className="animate-spin mx-auto text-purple-400" />
      </PageWrapper>
    );

  if (error)
    return (
      <PageWrapper title="Topics">
        <div className="text-red-400 flex items-center gap-2">
          <AlertCircle />
          {error}
        </div>
      </PageWrapper>
    );

  return (
    <>
      <PageWrapper title="Topics" subtitle="Quick view on recent topics">
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-white w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <Search className="absolute left-3 top-2.5 text-white" size={18} />
          </div>
        </div>

        <div className="space-y-6">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                isSolved={true}
                topic={topic}
                topicScore={0}
                onClick={() => {
                  router.push(`/topic-details?topicId=${topic.id}`);
                }}
              />
            ))
          ) : (
            <p className="text-gray-500 italic">No topics match your search.</p>
          )}
        </div>
      </PageWrapper>

      {checkDataInLocal("accessToken") && (
        <FloatingButton onClick={() => setIsAddTopicOpen(true)} />
      )}

      {isAddTopicOpen && (
        <AddTopicPopup
          isOpen={true}
          onClose={() => setIsAddTopicOpen(false)}
          onAddTopic={(topic) => {
            setTopics((prev) => [topic, ...prev]);
          }}
        />
      )}
    </>
  );
};

export default Home;
