// setup-project.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Settings
const projectName = 'my-app'; // Change project name if needed

// 1. Create Vite + React app
console.log('Creating Vite + React project...');
execSync(`npm create vite@latest ${projectName} -- --template react`, { stdio: 'inherit' });

// 2. Move into project
process.chdir(projectName);

// 3. Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// 4. Create folder structure and files
console.log('Creating folders and files...');

const createFile = (filePath, content) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Created: ${filePath}`);
};

const folderStructure = {
  'src/api': {
    'api.js': `import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const fetchTopics = (playerId) => axios.get(\`\${BASE_URL}/topics/\${playerId}\`);
export const fetchReadingContent = (topicId) => axios.get(\`\${BASE_URL}/content/read/\${topicId}\`);
export const fetchPracticeContent = (topicId) => axios.get(\`\${BASE_URL}/content/practice/\${topicId}\`);
export const completeChapter = (playerId, topicId) => axios.post(\`\${BASE_URL}/complete/\${playerId}/\${topicId}\`);
`
  },
  'src/components': {
    'TopicList.jsx': `import React from 'react';

const TopicList = ({ topics, onTopicClick, selectedTopicId }) => (
  <div className="topic-list">
    {topics.length === 0 ? (
      <div>No topics available</div>
    ) : (
      topics.map(topic => (
        <div
          key={topic.id}
          className={\`topic-item \${topic.locked ? "locked" : "unlocked"} \${selectedTopicId === topic.id ? "active" : ""}\`}
          onClick={() => onTopicClick(topic)}
        >
          {topic.topicName} {topic.locked && "🔒"}
        </div>
      ))
    )}
  </div>
);

export default TopicList;
`,
    'Sidebar.jsx': `import React from 'react';
import TopicList from './TopicList';

const Sidebar = ({ topics, onTopicClick, selectedTopicId }) => (
  <aside className="sidebar">
    <TopicList
      topics={topics}
      onTopicClick={onTopicClick}
      selectedTopicId={selectedTopicId}
    />
  </aside>
);

export default Sidebar;
`,
    'TopicContent.jsx': `import React from 'react';

const TopicContent = ({ content, type, onDoneReading, onCompleteChapter }) => (
  <div className={\`topic-content \${type}\`}>
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
`,
    'MainContent.jsx': `import React, { useState, useEffect } from 'react';
import { fetchReadingContent, fetchPracticeContent, completeChapter } from '../api/api';
import TopicContent from './TopicContent';

const MainContent = ({ selectedTopic, onCompleteChapter }) => {
  const [readingContent, setReadingContent] = useState('');
  const [practiceContent, setPracticeContent] = useState('');
  const [isReading, setIsReading] = useState(true);

  useEffect(() => {
    if (selectedTopic) {
      fetchReadingContent(selectedTopic.id)
        .then(response => setReadingContent(response.data.reading || "No reading content available."))
        .catch(() => setReadingContent("No reading content available."));

      fetchPracticeContent(selectedTopic.id)
        .then(response => setPracticeContent(response.data.practice || "No practice content available."))
        .catch(() => setPracticeContent("No practice content available."));
    }
  }, [selectedTopic]);

  const handleDoneReading = () => setIsReading(false);

  return (
    <main className="content">
      {selectedTopic ? (
        <>
          <h1>{selectedTopic.topicName}</h1>
          <p>{selectedTopic.description}</p>

          {isReading && readingContent && (
            <TopicContent 
              content={readingContent}
              type="reading"
              onDoneReading={handleDoneReading}
            />
          )}

          {!isReading && practiceContent && (
            <TopicContent 
              content={practiceContent}
              type="practice"
              onCompleteChapter={() => onCompleteChapter(selectedTopic.id)}
            />
          )}
        </>
      ) : (
        <p>Select a topic to view details</p>
      )}
    </main>
  );
};

export default MainContent;
`,
    'App.jsx': `import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { fetchTopics, completeChapter } from '../api/api';
import '../styles/App.css';

function App() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const playerId = 1;

  useEffect(() => {
    fetchTopics(playerId)
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
  }, [playerId]);

  const handleTopicClick = (topic) => {
    if (!topic.locked) {
      setSelectedTopic(topic);
    }
  };

  const handleCompleteChapter = (topicId) => {
    completeChapter(playerId, topicId)
      .then(() => {
        fetchTopics(playerId);
        setSelectedTopic(null);
      })
      .catch(() => {});
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
`
  },
  'src/styles': {
    'App.css': `/* App CSS */

.container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  padding: 10px;
  background-color: #f4f4f4;
}

.content {
  flex: 1;
  padding: 20px;
}

.topic-item {
  cursor: pointer;
  padding: 10px;
  margin-bottom: 5px;
}

.topic-item.active {
  background-color: #2196F3;
  color: white;
}

.topic-item.locked {
  color: gray;
}

.topic-content {
  margin-top: 20px;
}

.topic-content.reading {
  background-color: #f1f1f1;
  padding: 15px;
}

.topic-content.practice {
  background-color: #e8f5e9;
  padding: 15px;
}

button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
`
  },
  'src': {
    'main.jsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import './styles/App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`
  }
};

// Create files
Object.entries(folderStructure).forEach(([folder, files]) => {
  Object.entries(files).forEach(([fileName, content]) => {
    const filePath = path.join(process.cwd(), folder, fileName);
    createFile(filePath, content);
  });
});

console.log('🚀 Project setup complete!');
console.log('👉 cd', projectName);
console.log('👉 npm run dev');
