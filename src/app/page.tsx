"use client";
import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Topic } from "@/models/topic";
import PageWrapper from "./(main)/components/PageWrapper";
import TopicCard from "./components/home__components/TopicCard";
import FloatingButton from "./components/home__components/FloatingButton";
import LaravelApiClient from "@/api-clients/laravel_client";
import { XML } from "@/utils/xml";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>([]);
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

        const topics = Array.from(xmlDoc.getElementsByTagName("topic")).map(
          (topic) => Topic.fromXML(topic)
        );

        setTopics(topics);
        setLoading(false);
      } catch (err) {
        setError(err?.toString() + " : Failed to fetch topics.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        <div className="space-y-6">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              topicScore={0}
              onClick={() => {
                router.push(`/topic-details?topicId=${topic.id}`);
              }}
            />
          ))}
        </div>
      </PageWrapper>
      <FloatingButton onClick={() => {}} />
    </>
  );
};

export default Home;
