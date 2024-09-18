// frontend/src/components/AddStudentForm.js
import React, { useState } from 'react';
import axios from 'axios';

function AddStudentForm() {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [profile, setProfile] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // For showing success messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/students/add', {
        name,
        grade,
        profile,
      });

      // Clear the form and display a success message
      setName('');
      setGrade('');
      setProfile('');
      setError('');
      setSuccess('Student added successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding student');
      setSuccess(''); // Clear any previous success message
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add Student</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Grade:</label>
          <input
            type="number"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Profile:</label>
          <input
            type="text"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
          />
        </div>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudentForm;
