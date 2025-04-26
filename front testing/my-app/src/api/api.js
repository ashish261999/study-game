// import axios from 'axios';

// const BASE_URL = 'http://localhost:8080/api';

// export const fetchTopics = (playerId) => axios.get(`${BASE_URL}/topics/${playerId}`);
// export const fetchReadingContent = (topicId) => axios.get(`${BASE_URL}/content/read/${topicId}`);
// export const fetchPracticeContent = (topicId) => axios.get(`${BASE_URL}/content/practice/${topicId}`);
// export const completeChapter = (playerId, topicId) => axios.post(`${BASE_URL}/complete/${playerId}/${topicId}`);


import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Modify the fetchTopics function to include gameId as an integer
export const fetchTopics = (gameId, playerId) => 
  axios.get(`${BASE_URL}/game/${gameId}/topics/${playerId}`);

// Modify the fetchReadingContent function to include gameId as an integer
export const fetchReadingContent = (gameId, topicId) => 
  axios.get(`${BASE_URL}/game/${gameId}/content/read/${topicId}`);

// Modify the fetchPracticeContent function to include gameId as an integer
export const fetchPracticeContent = (gameId, topicId) => 
  axios.get(`${BASE_URL}/game/${gameId}/content/practice/${topicId}`);

// Modify the completeChapter function to include gameId as an integer
export const completeChapter = (gameId, playerId, topicId) => 
  axios.post(`${BASE_URL}/game/${gameId}/complete/${playerId}/${topicId}`);
