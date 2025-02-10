import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

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

function ReportAge() {
  const [staffData, setStaffData] = useState([]);

  // Fetch data using GraphQL
  const fetchData = async () => {
    const query = `
      {
        people {
          name
          age
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

  const getAgeDistribution = () => {
    const ages = staffData.map((staff) => staff.age);
    const names = staffData.map((staff) => staff.name);
    return {
      labels: names,
      datasets: [
        {
          label: "Age Distribution",
          data: ages,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  };


  return (
    <div>
      <h2>Demographic Overview</h2>
      <div>
        {staffData.length > 0 ? (
          <Bar
            data={getAgeDistribution()}
            options={{ scales: { y: { beginAtZero: true } } }}
          />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}

export default ReportAge;
