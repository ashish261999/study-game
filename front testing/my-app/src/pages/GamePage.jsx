import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import { fetchTopics, completeChapter } from '../api/api';
import'./GamePage.css'

const GamePage = () => {
  const { gameId} = useParams(); // Get the gameId from the URL as a string
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const playerId = 1; // Sample player ID, make this dynamic if needed

  useEffect(() => {
    const parsedGameId = parseInt(gameId, 10); // Parse gameId as an integer

    if (isNaN(parsedGameId)) {
      console.error('Invalid gameId:', gameId);
      setLoading(false); // Set loading to false if gameId is invalid
      return;
    }

    console.log('Fetching topics for gameId:', parsedGameId); // Log the parsed gameId

    fetchTopics(parsedGameId, playerId) // Pass parsed gameId to the API
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        console.log('Fetched topics: abce', data); // Log the fetched topics
        setTopics(data);
        setSelectedTopic(data[0].id || null); // Set the first topic as selected if available
        setLoading(false);
        if (data.length > 0) {
          const firstUnlocked = data.find(topic => !topic.locked);
          if (firstUnlocked) setSelectedTopic(firstUnlocked);
        }
      })
      .catch(() => {
        console.error('Error fetching topics');
        setLoading(false);
      });
  }, [gameId]); // Re-run when gameId changes

  const handleTopicClick = (topic) => {
    if (!topic.locked) {
      setSelectedTopic(topic);
    }
  };

  const handleCompleteChapter = (topicId) => {
    const parsedGameId = parseInt(gameId, 10);

    if (isNaN(parsedGameId)) {
      console.error('Invalid gameId:', gameId);
      return;
    }

    completeChapter(parsedGameId, playerId, topicId)
      .then(() => {
        return fetchTopics(parsedGameId, playerId);
      })
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        setTopics(data);
        const firstUnlocked = data.find(topic => !topic.locked);
        setSelectedTopic(firstUnlocked || null);
      })
      .catch(() => {
        console.error('Error completing chapter');
      });
  };

  if (loading) {
    return <div>Loading topics...</div>;
  }

  return (
    <div className="game-page-container">
      <Sidebar
        topics={topics}
        onTopicClick={handleTopicClick}
        selectedTopicId={selectedTopic?.id}
      />
      <MainContent
        gameId={gameId}
        selectedTopic={selectedTopic}
        onCompleteChapter={handleCompleteChapter}
      />
    </div>
  );
};

export default GamePage;
