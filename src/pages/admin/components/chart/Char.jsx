import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    let myChart = null;

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40, 45, 80, 65, 63, 60],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        }
      });
    }

    // Clean up function
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, []);

  return (
    <div className="chart">
      <h3 className="chartTitle">Les reservations</h3>
      <canvas ref={chartRef} width="400" height="100"></canvas>
    </div>
  );
};

export default ChartComponent;
