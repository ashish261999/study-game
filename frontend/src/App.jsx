import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readingContent, setReadingContent] = useState(""); 
  const [practiceContent, setPracticeContent] = useState(""); 
  const [error, setError] = useState(null);
  const [isReading, setIsReading] = useState(true); // To toggle between reading and practice
  const playerId = 1; // You can dynamically set this depending on the logged-in player

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = () => {
    axios.get(`http://localhost:8080/api/topics/${playerId}`)
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
      .catch(error => {
        setError("Error fetching topics. Please try again later.");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedTopic) {
      loadContent(selectedTopic.id);
    }
  }, [selectedTopic]);

  const handleTopicClick = (topic) => {
    if (!topic.locked) {
      setSelectedTopic(topic);
      setReadingContent("");
      setPracticeContent("");
      setIsReading(true); // Reset to show reading first
    }
  };

  const loadContent = (topicId) => {
    console.log("Loading content for topic:", topicId); // Debugging the topicId
    
    // Fetch Reading Content
    axios.get(`http://localhost:8080/api/content/read/${topicId}`)
      .then(response => {
        console.log("Reading Content Response:", response.data);  // Debugging response
        if (response.data && response.data.reading) {
          setReadingContent(response.data.reading); // Set content if available
        } else {
          console.log("Reading content is empty or unavailable:", response.data);
          setReadingContent("No reading content available.");
        }
      })
      .catch(error => {
        console.error("Error fetching reading content:", error);
        setError("Error loading reading content.");
      });

    // Fetch Practice Content
    axios.get(`http://localhost:8080/api/content/practice/${topicId}`)
      .then(response => {
        console.log("Practice Content Response:", response.data);  // Debugging response
        if (response.data && response.data.practice) {
          setPracticeContent(response.data.practice);  // Set content if available
        } else {
          console.log("Practice content is empty or unavailable:", response.data);
          setPracticeContent("No practice content available.");
        }
      })
      .catch(error => {
        console.error("Error fetching practice content:", error);
        setPracticeContent("Error fetching practice content.");
      });
  };

  const completeChapter = () => {
    if (selectedTopic) {
      axios.post(`http://localhost:8080/api/complete/${playerId}/${selectedTopic.id}`)
        .then(response => {
          fetchTopics(); 
          setReadingContent(""); 
          setPracticeContent(""); 
          setSelectedTopic(null); 
          setIsReading(true);
        })
        .catch(error => {
          setError("Error completing chapter. Please try again later.");
        });
    }
  };

  const handleDoneReading = () => {
    setIsReading(false); // Switch to Practice section after reading
  };

  if (loading) {
    return <div>Loading topics...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <aside className="sidebar">
        {topics.length === 0 ? (
          <div>No topics available</div>
        ) : (
          topics.map(topic => (
            <div
              key={topic.id}
              className={`topic-item ${topic.locked ? "locked" : "unlocked"} ${selectedTopic?.id === topic.id ? "active" : ""}`}
              onClick={() => handleTopicClick(topic)}
            >
              {topic.topicName} {topic.locked && "🔒"}
            </div>
          ))
        )}
      </aside>

      <main className="content">
        {selectedTopic ? (
          <>
            <h1>{selectedTopic.topicName}</h1>
            <p>{selectedTopic.description}</p>

            {/* Show Reading Content First */}
            {readingContent && isReading && (
              <div className="topic-content reading">
                <h2>📖 Reading:</h2>
                <p>{readingContent}</p>

                <button 
                  onClick={handleDoneReading}
                  style={{ marginTop: "10px", backgroundColor: "#2196F3", color: "white" }}
                >
                  Done Reading ➡️
                </button>
              </div>
            )}

            {/* Show Practice Content */}
            {practiceContent && !isReading && (
              <div className="topic-content practice">
                <h2>📝 Practice:</h2>
                <p>{practiceContent}</p>

                <button 
                  onClick={completeChapter}
                  style={{ marginTop: "10px", backgroundColor: "#4CAF50", color: "white" }}
                >
                  Complete Chapter ✅
                </button>
              </div>
            )}
          </>
        ) : (
          <p>Select a topic to view details</p>
        )}
      </main>
    </div>
  );
}

export default App;
