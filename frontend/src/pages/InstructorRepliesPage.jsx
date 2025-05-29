import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/InstructorRepliesPage.css'; // optional styling

const InstructorRepliesPage = () => {
  const [replies, setReplies] = useState([]);
  const [error, setError] = useState('');
  const [selectedReply, setSelectedReply] = useState(null);
  const [action, setAction] = useState('Total accept');
  const [message, setMessage] = useState('');

  const instructorName = localStorage.getItem("name") || "Instructor";

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/review-replies/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReplies(res.data);
      } catch (err) {
        console.error('Error fetching review replies:', err);
        setError(err.response?.data || 'Failed to fetch replies');
      }
    };

    fetchReplies();
  }, []);

  
const handleSubmitReply = async () => {
  if (!selectedReply) return;

  const token = localStorage.getItem("token");

  const payload = {
    reply_id: selectedReply.id,
    reply_text: message,
    reply_grade: calculateGrade(action, selectedReply.initial_grade)
  };

  try {
    const res = await axios.post("http://localhost:3000/review-replies", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    console.log("✅ API response:", res.data);
    alert("✅ Reply submitted successfully");

    // Update locally instead of re-fetching
    setReplies((prev) =>
      prev.map((r) =>
        r.id === selectedReply.id
          ? { ...r, reply_text: message, reply_grade: payload.reply_grade, replied_at: new Date().toISOString() }
          : r
      )
    );

    // Clear form
    setSelectedReply(null);
    setMessage('');
    setAction('Total accept');
  } catch (err) {
    console.error("❌ Submit error:", err);
    alert("❌ Failed to submit reply.");
  }
};

  const calculateGrade = (type, base) => {
    if (type === "Total accept") return base + 2;
    if (type === "Partial accept") return base + 1;
    return base;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <div className="instructor-replies-page">
      <h2>{instructorName}</h2>

      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Course name</th>
            <th>Exam period</th>
            <th>Student</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {replies.map((r, i) => (
            <tr key={i}>
              <td>{r.course_id}</td>
              <td>{formatDate(r.created_at)}</td>
              <td>student {r.academic_id}</td>
              <td>
                {r.reply_text ? (
                    <span>Responded</span>
                    ) : (
                    <button onClick={() => setSelectedReply(r)}>Reply</button>
                    )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedReply && (
        <div className="reply-form">
          <h4>REPLY TO GRADE REVIEW REQUEST</h4>
          <p><strong>{selectedReply.course_id}</strong> — {formatDate(selectedReply.created_at)} — student {selectedReply.academic_id}</p>

          <label>Action:
            <select value={action} onChange={(e) => setAction(e.target.value)}>
              <option>Total accept</option>
              <option>Partial accept</option>
              <option>Reject</option>
            </select>
          </label>

          <label>Instructor's message:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter reply message..."
            />
          </label>

          <button onClick={handleSubmitReply}>Submit Reply</button>
        </div>
      )}
    </div>
  );
};

export default InstructorRepliesPage;
