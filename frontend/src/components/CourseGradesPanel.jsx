import React, { useEffect, useState } from 'react';
import '../styles/CourseGradesPanel.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CourseGradesPanel = ({ grade }) => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/statistics?courseId=${grade.course_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setStats(data);

    } catch (err) {
      setError('Failed to fetch statistics');
      console.error('Stats error:', err);
    }
  };

  fetchStats();
}, [grade.course_id]);

  return (
   <div className="grades-panel-grid">
  {/* Panel 1: My grades */}
  <div className="grade-box">
    <h4>my grades<br />{grade.course_id} - {grade.declaration_period}</h4>
    <p><strong>Total:</strong> {grade.final_grade ?? 'N/A'}</p>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
      <p key={i}><strong>Q{i}:</strong> {grade[`q0${i}`] ?? grade[`q${i}`] ?? 'N/A'}</p>
    ))}
  </div>

  {/* Panel 2: Total statistics */}
  {stats && (
    <div className="grade-box">
      <h4>{grade.course_id} - total statistics</h4>
      <p><strong>Students:</strong> {stats.count}</p>
      <p><strong>Average:</strong> {stats.average?.toFixed(2)}</p>
    </div>
  )}

  {/* Panel 3: Chart with Q1-Q10 average */}
  {stats && (
    <div className="grade-box full-width">
      <h4>{grade.course_id} - Questions Average</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={Array.from({ length: 10 }, (_, i) => {
            const qNum = (i + 1).toString().padStart(2, '0');
            return {
              name: `Q${i + 1}`,
              avg: stats[`q${qNum}_avg`] ?? 0
            };
          })}
        >
          <XAxis dataKey="name" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Bar dataKey="avg" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )}
</div>

  );
};

export default CourseGradesPanel;
