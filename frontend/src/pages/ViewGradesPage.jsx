import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GradeSummaryCard from '../components/GradeSummaryCard';
import { useParams } from 'react-router-dom';

const ViewGradesPage = () => {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState('');
  const { courseId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`http://localhost:3000/grades`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const filtered = res.data.grades.filter(g => g.course_id === courseId);
        setGrades(filtered);
      })
      .catch(err => {
        console.error("❌ Grades error:", err.response?.data || err.message);
        setError(err.response?.data?.message || 'Something went wrong');
      });
  }, [courseId]);

  return (
    <div className="grades-page" style={{ padding: '1rem' }}>
      <h2>Grades for course: <em>{courseId}</em></h2>
      {error && <p className="error">{error}</p>}
      {grades.length === 0 && !error && <p>No grades found for this course.</p>}
      {grades.map((grade, idx) => (
        <GradeSummaryCard key={idx} grade={grade} />
      ))}
    </div>
  );
};

export default ViewGradesPage;
