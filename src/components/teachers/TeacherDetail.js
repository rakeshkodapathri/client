import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Detail.css';

function TeacherDetail() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/teachers/${id}`);
        setTeacher(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching teacher details');
      }
    };

    fetchTeacher();
  }, [id]);

  return (
    <div className="detail-container">
      {error && <p className="error-message">{error}</p>}
      {teacher ? (
        <div>
          <h2>{teacher.name}</h2>
          <p><span>Employee ID:</span> {teacher.employeeId}</p>
          <p><span>Stream:</span> {teacher.stream}</p>
          <p><span>Gender:</span> {teacher.gender}</p>
          <p><span>Age:</span> {teacher.age}</p>
          <p><span>Role:</span> {teacher.role}</p>
        </div>
      ) : (
        <p className="loading-message">Loading teacher details...</p>
      )}
    </div>
  );
}

export default TeacherDetail;
