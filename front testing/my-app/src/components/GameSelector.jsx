import React, { useState, useEffect } from "react";
import { fetchTopics, completeChapter } from '../api/api';

function GameSelector() {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(1);  // Default to gameId 1
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const playerId = 1;  // Static or dynamic playerId

  // Fetch available games (you can modify the API to support fetching available games)
  useEffect(() => {
    // Example: fetch games (replace with your own API call)
    // fetchGames()
    //   .then(response => setGames(response.data));

    setGames([
      { id: 1, name: 'Game 1' },
      { id: 2, name: 'Game 2' },
      { id: 3, name: 'Game 3' },
    ]);
  }, []);

  // Fetch topics when the selected game changes
  useEffect(() => {
    setLoading(true);
    fetchTopics(selectedGameId, playerId)
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        setTopics(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedGameId, playerId]);  // Re-run when selectedGameId or playerId changes

  const handleGameChange = (event) => {
    setSelectedGameId(Number(event.target.value));
  };

  const handleCompleteChapter = (topicId) => {
    completeChapter(selectedGameId, playerId, topicId)
      .then(() => fetchTopics(selectedGameId, playerId))
      .then(response => setTopics(response.data))
      .catch(() => {
        // Handle error case here
      });
  };

  return (
    <div>
      <h1>Select a Game</h1>
      <select onChange={handleGameChange} value={selectedGameId}>
        {games.map(game => (
          <option key={game.id} value={game.id}>
            {game.name}
          </option>
        ))}
      </select>

      {loading ? (
        <div>Loading topics...</div>
      ) : (
        <div>
          <h2>Topics</h2>
          <ul>
            {topics.map(topic => (
              <li key={topic.id}>
                {topic.name}{" "}
                <button onClick={() => handleCompleteChapter(topic.id)}>
                  Complete Chapter
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GameSelector;
