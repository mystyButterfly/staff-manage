import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
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

function ReportCity() {
  const [staffData, setStaffData] = useState([]);

// fetch data using graphQL
  const fetchData = async () => {
    const query = `
    {
      people {
        city
      }
    }
    `;

    try {
      const response = await fetch(`${NODE_SERVER_URL}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({query}),
      });
      const data = await response.json();
      setStaffData(data.data.people);
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // end fetching data

  const getGeoDistribution = () => {
    const cityCounts = {};

    // Count the number of staff in each city
    staffData.forEach((staff) => {
      const { city } = staff; // Assuming the city key exists in the fetched data
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });

    const labels = Object.keys(cityCounts);
    const counts = Object.values(cityCounts);

    return {
      labels: labels,
      datasets: [
        {
          label: "Number of Staff by City",
          data: counts,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  };

  return (
    <div>
      <h2>Geographic Distribution of Staff</h2>
      <div>
        {staffData.length > 0 ? (
          <Bar
            data={getGeoDistribution()}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Number of Staff',
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: 'City',
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                },
              },
            }}
          />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}

export default ReportCity;
