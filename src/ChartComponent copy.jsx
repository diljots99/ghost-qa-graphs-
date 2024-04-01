import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartComponent = ({ data }) => {
  // Extracting timeStamp and elapsed from the data
  const timestamps = data.map(item => item.timeStamp);
  const elapsedTimes = data.map(item => item.elapsed);
    console.log(data)
    console.log(elapsedTimes)
    console.log(timestamps)
  // Creating the dataset for the chart
  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Elapsed Time',
        data: elapsedTimes,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Time Stamp vs Elapsed Time</h2>
      <Line data={chartData} />
    </div>
  );
};

export default ChartComponent;
