import React from 'react';
import { useNavigate } from 'react-router-dom';

const InstructorHomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, Instructor!</h2>
      <button onClick={() => navigate('/post-initial-grades')} style={{ marginRight: '1rem' }}>
        ➕ Post Initial Grades
      </button>
      <button onClick={() => navigate('/instructor-replies')}>
        📄 View Review Replies
      </button>
    </div>
  );
};

export default InstructorHomePage;
