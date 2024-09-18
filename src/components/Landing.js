import React from "react";
import { Link } from 'react-router-dom';

function Landing(){
    return(
        <div>
      <h2>School</h2>
      <ul>
        <li><Link to="/Login">Login</Link></li>
        <li><Link to="/Register">Register</Link></li>
      </ul>
    </div>
    )
};

export default Landing;