// frontend/src/components/StudentList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // Import the plus icon

import '../styles/ListStyles.css'; // Using the single CSS file

function StudentList() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  const userType = localStorage.getItem('userType');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5010/students');
        setStudents(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching students');
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="list-container">
      <h2>Student List</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="list-grid">
      {userType === 'admin' && (
         <div className="add-card">
         <Link to={'/students/add'}>
           <FontAwesomeIcon icon={faPlus} size="2x" />
           <p>Add Student</p>
         </Link>
       </div>
      )}
        {students.length > 0 ? (
          students.map((student) => (
            <div className="list-card" key={student._id}>
              <Link to={`/students/${student._id}`}>
                <h3>{student.name}</h3>
              </Link>
            </div>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </div>
      
    </div>
  );
}

export default StudentList;
