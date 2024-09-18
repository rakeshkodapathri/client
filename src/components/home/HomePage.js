import { Link } from 'react-router-dom';
function HomePage() {
  
  return (
    <div>
      <header className="hero">
        <h2>Welcome to My Homepage</h2>
        <p>Explore the navigation links to learn more!</p>
      </header>

      <h1>Alexander Mackenzie Secondary School Management System</h1>

      <ul>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/teachers/list">Teachers </Link></li>
      </ul>
    </div>
  );
}

export default HomePage;
