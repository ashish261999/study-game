import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { fetchTopics, completeChapter } from '../api/api';
import '../styles/App.css';

function App() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const playerId = 1;  // You can modify this dynamically if needed
  const gameId = 1;    // Set the gameId here, you can dynamically change this as needed

  useEffect(() => {
    // Fetch topics based on gameId and playerId
    fetchTopics(gameId, playerId)
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        setTopics(data);
        setLoading(false);
        if (data.length > 0) {
          const firstUnlocked = data.find(topic => !topic.locked);
          if (firstUnlocked) {
            setSelectedTopic(firstUnlocked);
          }
        }
      })
      .catch(() => setLoading(false));
  }, [gameId, playerId]);  // Re-run when gameId or playerId changes

  const handleTopicClick = (topic) => {
    if (!topic.locked) {
      setSelectedTopic(topic);
    }
  };

  const handleCompleteChapter = (topicId) => {
    completeChapter(gameId, playerId, topicId)
      .then(() => {
        return fetchTopics(gameId, playerId); // fetch topics after completing
      })
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        setTopics(data);
        // Optional: Auto-select the next unlocked topic
        const firstUnlocked = data.find(topic => !topic.locked);
        setSelectedTopic(firstUnlocked || null);
      })
      .catch(() => {
        // Handle error case here
      });
  };

  if (loading) {
    return <div>Loading topics...</div>;
  }

  return (
    <div className="container">
      <Sidebar
        topics={topics}
        onTopicClick={handleTopicClick}
        selectedTopicId={selectedTopic?.id}
      />
      <MainContent
        selectedTopic={selectedTopic}
        onCompleteChapter={handleCompleteChapter}
      />
    </div>
  );
}

export default App;
