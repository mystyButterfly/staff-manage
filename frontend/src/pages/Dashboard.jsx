
import "./Dashboard.css";
import { NavLink, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <br />
        <br />
        <h4>Staff Groups:</h4>
        <ul>
          <NavLink className={({isActive}) => (isActive? 'activeNavlink': undefined)} to="/"><li>all staff</li></NavLink>
        </ul>
        <br />
        <br />
        <br />
        <br />
        <h4>Reports:</h4>
        <ul>
          
            <NavLink className={({isActive}) => (isActive? 'activeNavlink': undefined)} to="/reportAge"><li>demographical</li></NavLink>
          
          
            <NavLink className={({isActive}) => (isActive? 'activeNavlink': undefined)} to="/reportRole"><li>job role</li></NavLink>
          
         
            <NavLink className={({isActive}) => (isActive? 'activeNavlink': undefined)} to="/reportCity"> <li>geographic</li></NavLink>
          
        </ul>
      </div>

      <div className="search-table">
        <div className="report-container"><Outlet /></div>
        
      </div>
    </div>
  );
}

export default Dashboard;
