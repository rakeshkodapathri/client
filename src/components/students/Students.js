import React from 'react';
import { Link } from 'react-router-dom';

function Students() {
  return (
    <div>
      <h2>Students</h2>
      <ul>
        <li><Link to="/students/list">Student List</Link></li>
        <li><Link to="/students/add">Add a Student</Link></li>
      </ul>
    </div>
  );
}

export default Students;
