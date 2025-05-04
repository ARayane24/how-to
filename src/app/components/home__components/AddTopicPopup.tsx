import LaravelApiClient from "@/api-clients/laravel_client";
import { SolutionStep, Topic } from "@/models/topic";
import { getLocalAccount } from "@/utils/local_store";
import { XML } from "@/utils/xml";
import React, { useState } from "react";

interface AddTopicPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTopic: (topic: Topic) => void;
}

const AddTopicPopup: React.FC<AddTopicPopupProps> = ({ isOpen, onClose, onAddTopic }) => {
  const [problem, setProblem] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState<Array<{ title: string; description: string }>>([]);

  const handleAddStep = () => {
    setSteps([...steps, { title: "", description: "" }]);
  };

  const handleStepChange = (index: number, field: "title" | "description", value: string) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
  };

  const handleAddTopic = async () => {
    const now = new Date();
    const newTopic = new Topic(0, 0, problem, description, now, now);

    const solutionSteps = steps.map(
      (step) => new SolutionStep(0, 0, step.title, step.description, now)
    );

    newTopic.idAccount = getLocalAccount()?.id || -1;

    const  result =  await  LaravelApiClient.post("/api/v1/topics", Topic.toXML(newTopic));
    if (!result.ok) {
      console.error("Failed to add topic");
      return;
    }
    const data = await result.text();
    const topic = Topic.fromXML(XML.parseXML(data).documentElement);
    solutionSteps.forEach((step) => {
      LaravelApiClient.post("/api/v1/topics/"+topic.id+"/steps", SolutionStep.toXML(step));
    });

    newTopic.id = topic.id;
    onAddTopic(newTopic);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">Add New Topic</h2>

        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Problem *</label>
          <input
            type="text"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring focus:border-blue-400"
            required
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mt-4 mb-2">Solution Steps</h3>
          {steps.map((step, index) => (
            <div key={index} className="mb-4 space-y-2">
              <p className="font-medium text-gray-600">Step {index + 1}</p>
              <input
                type="text"
                placeholder="Step Title"
                value={step.title}
                onChange={(e) => handleStepChange(index, "title", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              />
              <textarea
                placeholder="Step Description"
                value={step.description}
                onChange={(e) => handleStepChange(index, "description", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
          ))}
          <button
            onClick={handleAddStep}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            + Add Step
          </button>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTopic}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Add Topic
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTopicPopup;
