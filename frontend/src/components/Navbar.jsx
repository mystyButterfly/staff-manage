
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <Link to="/"><b>Dashboard</b></Link>
      <div>
        <Link to="/howuse">How to use?</Link>
        <Link to="/about">About project</Link>
      </div>
    </nav>
  );
}

export default Navbar;
