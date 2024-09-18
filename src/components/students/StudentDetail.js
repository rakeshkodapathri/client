import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Detail.css';

function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:5010/students/${id}`);
        setStudent(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching student details');
      }
    };

    fetchStudent();
  }, [id]);

  const handleGradeChange = (id, newGrade) => {
    setStudent((prevStudent) => ({ ...prevStudent, grade: newGrade }));
  };

  const submitGrade = async (id, grade) => {
    try {
      await axios.post(`http://localhost:5010/students/${id}/grade`, { grade });
      setError('');
    } catch (err) {
      setError(error || 'Error updating grade');
    }
  };

  return (
    <div className="detail-container">
      {error && <p className="error-message">{error}</p>}

      <h1>Student Details</h1>
      {student ? (
        <div>
          <h3>{student.name}</h3>
          <p><span>Current Grade:</span> {student.grade || 'N/A'}</p>
          <input
            type="number"
            placeholder="Enter new grade"
            value={student.grade || ''}
            onChange={(e) => handleGradeChange(student._id, e.target.value)}
          />
          <button
            onClick={() => submitGrade(student._id, student.grade)}
          >
            Update Grade
          </button>
        </div>
      ) : (
        <p className="loading-message">Loading student...</p>
      )}
    </div>
  );
}

export default StudentDetail;
