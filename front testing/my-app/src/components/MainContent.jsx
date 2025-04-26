// src/components/MainContent.jsx
import React, { useState, useEffect } from 'react';
import { fetchReadingContent, fetchPracticeContent } from '../api/api';
import TopicContent from './TopicContent';

const MainContent = ({ gameId, selectedTopic, onCompleteChapter }) => {
  const [readingContent, setReadingContent] = useState('');
  const [practiceContent, setPracticeContent] = useState('');
  const [isReading, setIsReading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedTopic) return;

    setLoading(true);
    // fetch reading
    console.log('Fetching reading content for topic: ABC', selectedTopic.id);
    console.log('Game ID:', gameId);
    fetchReadingContent(gameId, selectedTopic.id)
      .then(response => {
        setReadingContent(response.data.reading || 'No reading content available.');
      })
      .catch(() => {
        setReadingContent('Error loading reading content.');
      });

    // fetch practice
    fetchPracticeContent(gameId, selectedTopic.id)
      .then(response => {
        setPracticeContent(response.data.practice || 'No practice content available.');
      })
      .catch(() => {
        setPracticeContent('Error loading practice content.');
      })
      .finally(() => setLoading(false));
  }, [gameId, selectedTopic]);

  if (!selectedTopic) {
    return <main className="content"><p>Select a topic to view details</p></main>;
  }

  if (loading) {
    return <main className="content"><p>Loading content...</p></main>;
  }

  return (
    <main className="content">
      <h1>{selectedTopic.topicName}</h1>
      <p>{selectedTopic.description}</p>

      {isReading ? (
        <TopicContent
          type="reading"
          content={readingContent}
          onDoneReading={() => setIsReading(false)}
        />
      ) : (
        <TopicContent
          type="practice"
          content={practiceContent}
          onCompleteChapter={() => onCompleteChapter(selectedTopic.id)}
        />
      )}
    </main>
  );
};

export default MainContent;
