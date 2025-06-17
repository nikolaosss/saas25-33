// File: PostFinalGradesPage.js
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import '../styles/PostFinalGradesPage.css';   // create a twin CSS file or reuse the old one

const PostFinalGradesPage = () => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [message, setMessage] = useState('');

  /* --------------------------------- Helpers -------------------------------- */

  const previewFile = (uploadedFile) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // skip the first two header rows  (0-based => 2 == 3rd row)
      const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '', range: 2 });
      if (!rows.length) {
        setMessage('⚠️ No data found in sheet.');
        return;
      }

      const courseName  = rows[0]['courseId']          || 'Unknown Course';
      const examPeriod  = rows[0]['declarationPeriod'] || 'Unknown Period';
      const gradeCount  = rows.length;

      setParsedData({ course: courseName, period: examPeriod, gradeCount });
      setMessage('📄 File preview loaded. Press CONFIRM to upload.');
    };

    reader.readAsArrayBuffer(uploadedFile);
  };

  /* ------------------------------ Event handlers ---------------------------- */

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setParsedData(null);
    setMessage('');
    if (uploadedFile) previewFile(uploadedFile);
  };

  const handleConfirm = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        'http://localhost:3000/upload-final', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setParsedData({
        course: data.course,
        period: data.period,
        gradeCount: data.gradeCount,
      });
      setMessage('✅ File uploaded and final grades registered successfully!');
    } catch (err) {
      console.error('❌ Upload error:', err.response?.data || err.message);
      setMessage(err.response?.data || 'Upload failed.');
    }
  };

  const handleCancel = () => {
    setFile(null);
    setParsedData(null);
    setMessage('Upload cancelled.');
  };

  /* ---------------------------------- UI ----------------------------------- */

  return (
    <div className="post-grades-container">
      <h2>Instructor name</h2>

      <section className="upload-section">
        <h3>FINAL GRADES POSTING</h3>
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
      </section>

      {parsedData && (
        <section className="parsing-section">
          <h3>XLSX file parsing</h3>

          <label>
            Course:
            <input type="text" value={parsedData.course} readOnly />
          </label>

          <label>
            Period:
            <input type="text" value={parsedData.period} readOnly />
          </label>

          <label>
            n. of grades:
            <input type="text" value={parsedData.gradeCount} readOnly />
          </label>

          <div className="action-buttons">
            <button onClick={handleConfirm}>CONFIRM</button>
            <button onClick={handleCancel}>CANCEL</button>
          </div>
        </section>
      )}

      <section className="message-area">
        <p>{message}</p>
      </section>
    </div>
  );
};

export default PostFinalGradesPage;
