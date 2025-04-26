import React from 'react';

const TopicContent = ({ content, type, onDoneReading, onCompleteChapter }) => (
  <div className={`topic-content ${type}`}>
    <h2>{type === 'reading' ? '📖 Reading:' : '📝 Practice:'}</h2>
    <p>{content}</p>

    {type === 'reading' && (
      <button onClick={onDoneReading} style={{ marginTop: "10px", backgroundColor: "#2196F3", color: "white" }}>
        Done Reading ➡️
      </button>
    )}

    {type === 'practice' && (
      <button onClick={onCompleteChapter} style={{ marginTop: "10px", backgroundColor: "#4CAF50", color: "white" }}>
        Complete Chapter ✅
      </button>
    )}
  </div>
);

export default TopicContent;
