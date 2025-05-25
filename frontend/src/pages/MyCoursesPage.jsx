import React, { useEffect, useState } from 'react';
import '../styles/MyCoursesPage.css';

const email = localStorage.getItem("email");

const MyCoursesPage = () => {
  const [grades, setGrades] = useState([]);

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
              <td>fall 2024</td> {/* προσωρινά */}
              <td>closed</td> {/* προσωρινά */}
              <td>
                <button className="action-btn">view my grades</button>
                <button className="action-btn" disabled>ask for review</button>
                <button className="action-btn" disabled>view review status</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyCoursesPage;
