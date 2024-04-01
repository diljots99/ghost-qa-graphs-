import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useParams } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Function to group data by time intervals
const groupDataByInterval = (data, interval) => {
  const groups = [];
  let currentGroup = [];
  let previousTimestamp = null;

  data.forEach((item) => {
    const timestamp = item.timeStamp;
    if (
      previousTimestamp === null ||
      timestamp - previousTimestamp <= interval
    ) {
      currentGroup.push(item);
    } else {
      groups.push(currentGroup);
      currentGroup = [item];
    }
    previousTimestamp = timestamp;
  });

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
};

const ChartComponent = ( ) => {
  const [data, setData] = useState([]);
  const [testId, setTestId] = useState(null);
  console.log('testId', testId);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('testId');
    if (id) {
      setTestId(id);
      fetchData(id);
    }else{
        setTestId(31);
        fetchData(31);
    }
    fetchData(id);
  }, [ ]);

  const fetchData = async (id) => {
    try {
      const response = await fetch(
        `http://65.1.188.67:8010/api/performance-tests/${id}/monitor_container_run/`
      );
      const jsonData = await response.json();
      console.log("jsonData", jsonData);
      console.log("jsonData.raw_data", jsonData.raw_data);
      setData(jsonData.raw_data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  // Group data by intervals of 10 seconds
  const groupedData = groupDataByInterval(data, 600); // 10000 milliseconds = 10 seconds

  // Aggregate data within each interval
  const aggregatedData = groupedData.map((group) => {
    const timestamps = group.map((item) => new Date(item.timeStamp).getTime());
    const elapsedTimes = group.map((item) => item.elapsed);
    const elapsedUSers = group.map((item) => item.allThreads);
    const elapsedLatency = group.map((item) => item.Latency);
    const bytes = group.map((item) => item.bytes);


    const averageElapsed =
      elapsedTimes.reduce((sum, value) => sum + value, 0) / elapsedTimes.length;
    const averageUsers =
      elapsedUSers.reduce((sum, value) => sum + value, 0) / elapsedUSers.length;
    const averageLatency =
    elapsedLatency.reduce((sum, value) => sum + value, 0) / elapsedLatency.length;
    const averagebytes =
    bytes.reduce((sum, value) => sum + value, 0) / bytes.length;


    console.log("group", group);
    return {
      timestamp: group[group.length - 1].timeStamp, // Use the timestamp of the first item in the group
      elapsed: averageElapsed,
      allThreads: averageUsers,
      Latency: averageLatency,
      bandwidth: averagebytes/averageElapsed
    };
  });

  const timestamps = aggregatedData.map((item) => item.timestamp);
  const elapsedTimes = aggregatedData.map((item) => item.elapsed);
  const users = aggregatedData.map((item) => item.allThreads);
  const Latency = aggregatedData.map((item) => item.Latency);
  const bandwidth = aggregatedData.map((item) => item.bandwidth);

  //   const timestamps = data.map(item => item.timeStamp);
  //   const timestamps = data.map(item => new Date(item.timeStamp).getTime());
  //   const elapsedTimes = data.map(item => item.elapsed);
  //   const users = data.map(item => item.allThreads);
  console.log("timestamps", timestamps);
  console.log("elapsedTimes", elapsedTimes);

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: "Elapsed Time",
        data: elapsedTimes,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        cubicInterpolationMode: "monotone",
      },
    ],
  };
  const usersData = {
    labels: timestamps,
    datasets: [
      {
        label: "Total  User",
        data: users,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        cubicInterpolationMode: "monotone",
      },
    ],
  };
  const latencyChartData = {
    labels: timestamps,
    datasets: [
      {
        label: "Latency",
        data: Latency,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        cubicInterpolationMode: "monotone",
      },
    ],
  };

  const bandwidthChartData = {
    labels: timestamps,
    datasets: [
      {
        label: "bandwidth",
        data: Latency,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        cubicInterpolationMode: "monotone",
      },
    ],
  };
  //   const chartOptions = {
  //     scales: {
  //       x: {
  //         type: 'linear',
  //         ticks: {
  //           callback: function (value, index, values) {
  //             // Format timestamp to a readable date or time
  //             return new Date(value).toLocaleString();
  //           },
  //         },
  //         grid: {
  //           display: true,
  //         },
  //       },
  //       y: {
  //         beginAtZero: true,
  //         grid: {
  //           display: true,
  //         },
  //       },
  //     },
  //     plugins: {
  //       legend: {
  //         display: true,
  //         position: 'top',
  //       },
  //     },
  //   };

  console.log("chartData", chartData);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          maxWidth: "45%",
        minWidth: "45%",
          margin: "10px",
          borderColor: "red",
        }}
      >
        <h2>Time Stamp vs users</h2>
        <Line data={usersData} />
      </div>
      <div
        style={{
          maxWidth: "45%",
        minWidth: "45%",

          margin: "10px",
          borderColor: "red",
        }}
      >
        <h2>Time Stamp vs Response Time</h2>
        <Line data={chartData} />
      </div>

      <div
        style={{
          maxWidth: "45%",
        minWidth: "45%",

          margin: "10px",
          borderColor: "red",
        }}
      >
        <h2>Time Stamp vs Latency</h2>
        <Line data={latencyChartData} />
      </div>

      <div
        style={{
          maxWidth: "45%",
        minWidth: "45%",

          margin: "10px",
          borderColor: "red",
        }}
      >
        <h2>Time Stamp vs bandwidth</h2>
        <Line data={bandwidthChartData} />
      </div>
    </div>
  );
};

export default ChartComponent;
