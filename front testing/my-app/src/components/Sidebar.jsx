import React from 'react';
import TopicList from './TopicList';

const Sidebar = ({ topics, onTopicClick, selectedTopicId }) => (
  <aside className="sidebar">
    <TopicList
      topics={topics}
      onTopicClick={onTopicClick}
      selectedTopicId={selectedTopicId} // Pass the selectedTopicId here
    />
  </aside>
);

export default Sidebar;
