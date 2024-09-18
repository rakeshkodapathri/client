import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import axios from 'axios';
import '../styles/AddTeacherForm.css';

function AddTeacherForm() {
    const [name, setName] = useState('');
    const [stream, setStream] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();  // Hook to navigate between pages

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');  // Clear any existing errors
        setSuccessMessage('');  // Clear any existing success messages

        try {
            const response = await axios.post('http://localhost:5010/teachers/add', {
                name,
                stream,
                gender,
                age,
                role
            });

            setName('');
            setStream('');
            setGender('');
            setAge('');
            setRole('');
            setSuccessMessage('Teacher added successfully!');
            
        } catch (err) {
            setError(err.response?.data?.error || 'Error adding teacher');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={() => navigate(-1)} className="back-button">
                Go Back
            </button>  {/* Button to go back to the previous page */}

            <form onSubmit={handleSubmit}>
                <h2>Add Teacher</h2>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
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
                    <label>Stream:</label>
                    <input
                        type="text"
                        value={stream}
                        onChange={(e) => setStream(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label>Age:</label>
                    <input 
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select 
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="">Select Role</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Teacher'}
                </button>
            </form>
        </div>
    );
}

export default AddTeacherForm;
