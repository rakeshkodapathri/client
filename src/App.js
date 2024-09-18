// frontend/src/App.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Students from './components/students/Students';
import StudentList from './components/students/StudentList';
import TeacherList from './components/teachers/TeacherList';
import AddStudentForm from './components/students/AddStudentForm';
import AddTeacherForm from './components/teachers/AddTeacherForm';
import HomePage from './components/home/HomePage';
import About from './components/home/About';
import Contact from './components/home/Contact';
import Navbar from './components/home/Navbar';
import TeacherDetail from './components/teachers/TeacherDetail';
import StudentDetail from './components/students/StudentDetail';

import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';

function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token is in localStorage
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

    return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path ="/" element = {<Landing />} />
        <Route path="/login" element= {<Login />} />
        <Route path ="/register" element = {<Register />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/students" element={<PrivateRoute><Students /></PrivateRoute>} />
        <Route path="/students/list" element={<PrivateRoute><StudentList /></PrivateRoute>} />
        <Route path="/students/add" element={<PrivateRoute><AddStudentForm /></PrivateRoute>} />
        <Route path="/students/:id" element={<PrivateRoute><StudentDetail /></PrivateRoute>} />
        
        <Route path="/teachers/list" element={<PrivateRoute><TeacherList /></PrivateRoute>} />
        <Route path="/teachers/add" element={<PrivateRoute><AddTeacherForm /></PrivateRoute>} />
        <Route path="/teachers/:id" element={<PrivateRoute><TeacherDetail /></PrivateRoute>} />

      </Routes>
    </Router>
  );
}

export default App;
