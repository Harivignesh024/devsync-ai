import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function TeamDashboard() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [combinedSummary, setCombinedSummary] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const navigate = useNavigate();

  const addMember = () => {
    setTeamMembers([...teamMembers, { user: "", updates: [""] }]);
  };

  const updateMember = (index, field, value) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  const updateUpdate = (memberIndex, updateIndex, value) => {
    const updated = [...teamMembers];
    updated[memberIndex].updates[updateIndex] = value;
    setTeamMembers(updated);
  };

  const addUpdate = (memberIndex) => {
    const updated = [...teamMembers];
    updated[memberIndex].updates.push("");
    setTeamMembers(updated);
  };

  const generateTeamSummary = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/team-summary",
        { team: teamMembers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCombinedSummary(res.data.summary);
      setDocUrl(`http://localhost:5000${res.data.doc_url}`);
    } catch (err) {
      alert("Error generating team summary");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const goToPersonal = () => {
    navigate("/dashboard");
  };

  return (
    <div className="App"> {/* ✅ Centering with App class */}
      <h2>👥 DevSync AI - Team Summary</h2>

      {teamMembers.length === 0 ? (
        <p>No team members added. Click "➕ Add Team Member" to begin.</p>
      ) : (
        teamMembers.map((member, idx) => (
          <div className="member-card" key={idx}>
            <input
              type="text"
              placeholder="GitHub Username"
              value={member.user}
              onChange={(e) => updateMember(idx, "user", e.target.value)}
            />
            {member.updates.map((update, uidx) => (
              <textarea
                key={uidx}
                placeholder="Update"
                value={update}
                onChange={(e) => updateUpdate(idx, uidx, e.target.value)}
              />
            ))}
            <button onClick={() => addUpdate(idx)}>➕ Add Update</button>
          </div>
        ))
      )}

      <div className="button-row">
        <button onClick={addMember}>➕ Add Team Member</button>
        <button onClick={generateTeamSummary}>🧠 Generate Team Summary</button>
        <button onClick={goToPersonal}>📄 Personal Dashboard</button>
        <button onClick={logout}>🚪 Logout</button>
      </div>

      {combinedSummary && (
        <div className="summary-section">
          <h3>📝 Combined Team Summary</h3>
          <pre>{combinedSummary}</pre>
          <a href={docUrl} download>
            <button>📥 Download Summary</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default TeamDashboard;
