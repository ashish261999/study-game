import React from 'react';

const TopicList = ({ topics, onTopicClick, selectedTopicId }) => (
  <div className="topic-list">
    {topics.length === 0 ? (
      <div>No topics available</div>
    ) : (
      topics.map(topic => (
        <div
          key={topic.id}
          className={`topic-item ${topic.locked ? "locked" : "unlocked"} ${selectedTopicId === topic.id ? "active" : ""}`}
          onClick={() => onTopicClick(topic)}
        >
          {topic.topicName} {topic.locked && "🔒"}
        </div>
      ))
    )}
  </div>
);

export default TopicList;
