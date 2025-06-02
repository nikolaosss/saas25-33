import React, { useEffect, useState } from 'react';
import CourseGradesPanel from '../components/CourseGradesPanel';
import QuestionChart from '../components/QuestionChart';
import '../styles/MyCoursesPage.css';

const email = localStorage.getItem("email");

const MyCoursesPage = () => {
  const [grades, setGrades] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [reviewStatus, setReviewStatus] = useState(null);

  const [reviewMessage, setReviewMessage] = useState('');

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
    setShowReviewForm(false);
    setShowStats(true);
    setReviewStatus(null); 

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

  const handleAskForReview = (courseId) => {
    const selected = grades.find(g => g.course_id === courseId);
    setSelectedCourse(selected);
    setShowReviewForm(true);
    setShowStats(false);
    setReviewStatus(null); 

  };

  const handleSubmitReview = async () => {
    console.log("Selected course:", selectedCourse);

    const token = localStorage.getItem('token');
    const academic_id = localStorage.getItem('academicId'); // ή student_id
    const courseId = selectedCourse.course_id;
    const initialGrade = selectedCourse.final_grade;
    const instructor_id =  selectedCourse.uploaded_by;
    const today = new Date().toISOString().split('T')[0];

    const payload = {
      academic_id: academic_id,
      course_id: courseId,
      initial_grade: initialGrade,
      message: reviewMessage,
      status: 'pending',
      instructor_id: instructor_id,
      created_at: today
    };

    try {
      const res = await fetch('http://localhost:3000/review-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('Review request submitted successfully!');
        setShowReviewForm(false);
        setReviewMessage('');
      } else {
        const errorData = await res.json();
        alert('Error submitting review request: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Something went wrong while submitting the review request.');
    }
  };

  const handleViewReviewStatus = async (courseId) => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:3000/review-requests/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      const match = data.find(r => r.course_id === courseId);

      if (match) {
        setSelectedCourse({ course_id: courseId }); // για να εμφανιστεί το header
        setReviewStatus(match);
        setShowReviewForm(false);
        setShowStats(false);
      } else {
        alert("No review request found for this course.");
      }
    } catch (err) {
      console.error("Error fetching review status:", err);
      alert("Failed to fetch review status.");
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
                <button
                  className="action-btn"
                  onClick={() => handleAskForReview(g.course_id)}
                >
                  ask for review
                </button>
                <button
                  className="action-btn"
                  onClick={() => handleViewReviewStatus(g.course_id)}
                >
                  view review status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {reviewStatus && (
        <div className="review-status-box">
          <h3>REVIEW REQUEST STATUS — {selectedCourse.course_id}</h3>

          <label>Message FROM instructor</label>
          <textarea
            readOnly
            value={reviewStatus.reply_text || "No reply yet..."}
            rows="4"
            cols="50"
          />
          <br />

          {reviewStatus.reply_text && (
            <>
              <button className="action-btn">Download attachment</button>
              <button className="action-btn">Ack</button>
            </>
          )}
        </div>
      )}


      {showReviewForm && selectedCourse && (
        <div className="review-form">
          <h3>NEW REVIEW REQUEST — {selectedCourse.course_id} - {selectedCourse.declaration_period}</h3>
          
          <label>Message to instructor</label>
          <textarea
            rows="4"
            cols="50"
            value={reviewMessage}
            onChange={(e) => setReviewMessage(e.target.value)}
            placeholder="Explain why you think your grade should be reviewed..."
          />
          <br />

          <button className="action-btn" onClick={handleSubmitReview}>
            submit grade review request
          </button>
        </div>
      )}

  
      {selectedCourse && showStats && (
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
