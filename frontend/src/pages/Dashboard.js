import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Dashboard() {
  const [events, setEvents] = useState("");
  const [summary, setSummary] = useState("");
  const [history, setHistory] = useState([]);
  const [githubInfo, setGithubInfo] = useState(null);
  const [docUrl, setDocUrl] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const generate = async () => {
    try {
      const eventList = events.split("\n").filter(Boolean);
      const res = await axios.post(
        "http://localhost:5000/api/generate",
        { events: eventList },
        axiosConfig
      );
      setSummary(res.data.summary);
      setDocUrl(`http://localhost:5000${res.data.doc_url}`);
      setShowSummary(true);
    } catch (err) {
      alert("Error generating summary");
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/history", axiosConfig);
      setHistory(res.data.history);
      setShowHistory(true);
    } catch (err) {
      alert("Error fetching history");
    }
  };

  const fetchGitHubUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/github/${username}`);
      setGithubInfo(res.data);
    } catch (err) {
      alert("GitHub user not found");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="App">
      <h2>🚀 DevSync AI - Dashboard</h2>
      <p>Welcome, {username}</p>

      <textarea
        rows="10"
        placeholder="Paste your commit messages here..."
        value={events}
        onChange={(e) => setEvents(e.target.value)}
      /><br />

      {/* Always-visible Buttons */}
      <button onClick={generate}>🧠 Generate Summary</button>
      <button onClick={fetchHistory}>📜 Show History</button>
      <button onClick={fetchGitHubUser}>🔍 Fetch GitHub Profile</button>
      <br />
      <button onClick={() => navigate("/team")}>👥 Team Dashboard</button>
      <button onClick={logout}>🚪 Logout</button>

      {/* Show Summary */}
      {showSummary && summary && (
        <>
          <h3>📋 Summary</h3>
          <pre>{summary}</pre>
          {docUrl && (
            <a href={docUrl} download>
              <button>📥 Download Summary</button>
            </a>
          )}
        </>
      )}

      {/* Show History */}
      {showHistory && (
        <>
          <h3>🕘 Summary History</h3>
          {history.length === 0 ? (
            <p>No history found.</p>
          ) : (
            <ul>
              {history.map((h, i) => (
                <li key={i}>
                  <pre>{h.summary}</pre>
                  <small>{new Date(h.timestamp).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* GitHub Info */}
      {githubInfo && (
        <>
          <h3>👤 GitHub Info</h3>
          <p><strong>Username:</strong> {githubInfo.login}</p>
          <p><strong>Public Repos:</strong> {githubInfo.public_repos}</p>
          <p><strong>Followers:</strong> {githubInfo.followers}</p>
          <p>
            <strong>Profile:</strong>{" "}
            <a href={githubInfo.html_url} target="_blank" rel="noreferrer">
              View Profile
            </a>
          </p>
        </>
      )}
    </div>
  );
}

export default Dashboard;
