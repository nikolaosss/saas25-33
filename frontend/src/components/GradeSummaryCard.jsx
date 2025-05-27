import React from 'react';
import '../styles/GradeSummaryCard.css'; // Αν θέλεις να προσθέσεις στυλ

const GradeSummaryCard = ({ grade }) => {
  return (
    <div className="grade-card">
      <h3>{grade.course_id} - {grade.declaration_period}</h3>
      <p><strong>Total Grade:</strong> {grade.final_grade ?? 'N/A'}</p>
      <div className="questions">
        {[...Array(10)].map((_, i) => {
          const key = `q${i + 1}`;
const altKey = `q0${i + 1}`;
const val = grade[key] ?? grade[altKey] ?? 'N/A';
            console.log("🧾 FULL grade object:", grade);

          return (
            <p key={key}><strong>Q{i + 1}:</strong> {val}</p>
          );
        })}
      </div>
    </div>
  );
};

export default GradeSummaryCard;
