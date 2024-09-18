
// frontend/src/components/TeacherList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // Import the plus icon
import '../styles/ListStyles.css'; // Using the single CSS file

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/teachers');
        setTeachers(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching teachers');
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="list-container">
      <h2>Teacher List</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="list-grid">
        {/* Add Teacher Card */}
        {userType === 'admin' && (
         <div className="add-card">
         <Link to={'/teachers/add'}>
           <FontAwesomeIcon icon={faPlus} size="2x" />
           <p>Add Teacher</p>
         </Link>
       </div>
      )}

        {/* Teacher Cards */}
        {teachers.length > 0 ? (
          teachers.map((teacher) => (
            <div className="list-card" key={teacher._id}>
              <Link to={`/teachers/${teacher._id}`}>
                <h3>{teacher.name}</h3>
              </Link>
            </div>
          ))
        ) : (
          <p>No teachers found.</p>
        )}
      </div>
    </div>
  );
}

export default TeacherList;
