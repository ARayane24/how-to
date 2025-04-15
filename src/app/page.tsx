"use client";
import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Topic } from "@/models/topic";
import PageWrapper from "./(main)/components/PageWrapper";
import TopicCard from "./components/home__components/TopicCard";
import FloatingButton from "./components/home__components/FloatingButton";

const Home = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const mock = [
          {
            id: 1,
            idAccount: 101,
            problem: "React performance issues",
            description:
              "My React application is slow, especially when rendering large lists. What are the best practices for optimizing performance?",
            updatedAt: new Date(Date.now() - 3600000 * 24), // 1 day ago
            createdAt: new Date(Date.now() - 3600000 * 48), // 2 days ago
          },
          {
            id: 2,
            idAccount: 102,
            problem: "Tailwind CSS customization",
            description:
              "How can I customize Tailwind CSS to fit my specific design needs? I want to change the default colors and spacing.",
            updatedAt: new Date(Date.now() - 3600000 * 12), // 12 hours ago
            createdAt: new Date(Date.now() - 3600000 * 72), // 3 days ago
          },
          {
            id: 3,
            idAccount: 103,
            problem: "Redux vs. Context API",
            description:
              "What are the pros and cons of using Redux versus the Context API for state management in a React application?",
            updatedAt: new Date(), // Just now
            createdAt: new Date(Date.now() - 3600000 * 24 * 7), // 1 week ago
          },
          {
            id: 4,
            idAccount: 104,
            problem: "Next.js data fetching",
            description:
              "What are the different methods for fetching data in Next.js (getServerSideProps, getStaticProps, etc.) and when should I use each one?",
            updatedAt: new Date(),
            createdAt: new Date(Date.now() - 3600000 * 24 * 30),
          },
          {
            id: 5,
            idAccount: 105,
            problem: "GraphQL vs REST",
            description:
              "Can someone explain the main differences between GraphQL and REST and the advantages/disadvantages of each?",
            updatedAt: new Date(),
            createdAt: new Date(),
          },
        ]; // your mock data
        setTopics(mock.map(Topic.fromJson));
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
            <TopicCard key={topic.id} topic={topic} topicScore={0} />
          ))}
        </div>
      </PageWrapper>
      <FloatingButton onClick={() => {}} />
    </>
  );
};

export default Home;
