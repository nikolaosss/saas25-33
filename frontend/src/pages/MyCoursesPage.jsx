import React, { useEffect, useState } from 'react';
import CourseGradesPanel from '../components/CourseGradesPanel';
import QuestionChart from '../components/QuestionChart';
import '../styles/MyCoursesPage.css';

const email = localStorage.getItem("email");

const MyCoursesPage = () => {
  const [grades, setGrades] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGrades = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await fetch('http://localhost:3000/grades', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.status === 'success') {
          setGrades(data.grades);
        }
      } catch (err) {
        console.error('Error fetching grades:', err);
      }
    };

    fetchGrades();
  }, []);

  const handleViewGrades = async (courseId) => {
    const selected = grades.find(g => g.course_id === courseId);
    setSelectedCourse(selected);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/statistics?courseId=${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching statistics:', err);
      setError('Failed to fetch statistics');
    }
  };

  const buildQuestionAveragesData = (stats) => {
    return Array.from({ length: 10 }, (_, i) => {
      const key = `q0${i + 1}_avg`;
      return {
        question: `Q${i + 1}`,
        average: stats[key] ?? 0,
      };
    });
  };

  return (
    <div className="courses-container">
      <h2>Email: {email}</h2>

      <table>
        <thead>
          <tr>
            <th>course name</th>
            <th>exam period</th>
            <th>grading status</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((g, index) => (
            <tr key={index}>
              <td>{g.course_id}</td>
              <td>{g.declaration_period || 'fall 2024'}</td>
              <td>closed</td>
              <td>
                <button
                  className="action-btn"
                  onClick={() => handleViewGrades(g.course_id)}
                >
                  view my grades
                </button>
                <button className="action-btn" disabled>ask for review</button>
                <button className="action-btn" disabled>view review status</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCourse && (
        <div className="grades-section">
          <h3>Course Overview: <em>{selectedCourse.course_id}</em></h3>
          <CourseGradesPanel grade={selectedCourse} />

          {/*<div className="grade-box">
            <h4>{selectedCourse.course_id} - Questions Average</h4>
            {stats ? (
              <QuestionChart data={buildQuestionAveragesData(stats)} />
            ) : error ? (
              <p>{error}</p>
            ) : (
              <p>Loading chart...</p>
            )}
          </div>*/}
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;
