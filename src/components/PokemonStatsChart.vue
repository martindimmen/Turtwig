<template>
    <div class="chart-container">
      <canvas id="statsChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);
  
  export default {
    props: {
      stats: Array,
    },
    mounted() {
      this.createChart();
    },
    methods: {
      createChart() {
        const ctx = document.getElementById('statsChart').getContext('2d');
        const statNames = this.stats.map(stat => stat.stat.name);
        const statValues = this.stats.map(stat => stat.base_stat);
  
        new Chart(ctx, {
          type: 'bar', 
          data: {
            labels: statNames,
            datasets: [{
              label: 'Stats',
              data: statValues,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                max:255,
              }
            }
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .chart-container {
    max-width: 400px; /* Adjust the max width as needed */
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  /* Add some extra styling for the canvas */
  #statsChart {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  </style>
  