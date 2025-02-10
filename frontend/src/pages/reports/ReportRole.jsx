import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
// Import Chart.js and register necessary components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { NODE_SERVER_URL } from "../../App";

// Register the components to be used in the charts
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function ReportRole() {
  const [staffData, setStaffData] = useState([]);

  // Fetch data using GraphQL
  const fetchData = async () => {
    const query = `
      {
        people {
          occupation
        }
      }
    `;

    try {
      const response = await fetch(`${NODE_SERVER_URL}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setStaffData(data.data.people);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // end fetching data

  const getRoleDistribution = () => {
    const roleCounts = {};

    staffData.forEach((staff) => {
      roleCounts[staff.occupation] = (roleCounts[staff.occupation] || 0) + 1; // Changed from staff.role to staff.occupation
    });

    return {
      labels: Object.keys(roleCounts),
      datasets: [
        {
          label: "Role Distribution",
          data: Object.values(roleCounts),
          backgroundColor: "rgba(153, 102, 255, 0.6)",
        },
      ],
    };
  };

  return (
    <div>
      <div>
        <h2>Role Distribution</h2>
        {staffData.length > 0 ? (
          <Pie data={getRoleDistribution()} />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}

export default ReportRole;
