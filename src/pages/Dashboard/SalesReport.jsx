// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register necessary components for Chart.js
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function SalesReport() {
//   // Data for the chart
//   const data = {
//     labels: [
//       'January', 'February', 'March', 'April', 'May', 'June', 
//       'July', 'August', 'September', 'October', 'November', 'December'
//     ], // 12 months for the X-axis
//     datasets: [
//       {
//         label: 'Sales ($)',
//         data: [500, 700, 400, 800, 1000, 600, 750, 900, 850, 950, 1100, 1200], // Sales data for 12 months
//         backgroundColor: 'rgba(54, 162, 235, 0.6)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Options for the chart
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top', // Position of the legend
//       },
//       title: {
//         display: true,
//         text: 'Yearly Sales Report', // Title of the chart
//       },
//     },
//   };

//   return (
//     <div style={{ width: '90%', margin: '0 auto' }}>
//       <Bar data={data} options={options} />
//     </div>
//   );
// }


import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SalesReport() {
  // Data for the chart
  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ], // 12 months for the X-axis
    datasets: [
      {
        label: 'Sales ($)',
        data: [500, 700, 400, 800, 1000, 600, 750, 900, 850, 950, 1100, 1200], // Sales data for 12 months
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to adjust height dynamically
    plugins: {
      legend: {
        position: 'top', // Position of the legend
        labels: {
          font: {
            size: 12, // Smaller font size for legend on small screens
          },
        },
      },
      title: {
        display: true,
        text: 'Yearly Sales Report', // Title of the chart
        font: {
          size: 16, // Smaller font size for title
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10, // Smaller font size for X-axis labels
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 10, // Smaller font size for Y-axis labels
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-wrapper mb-5">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
