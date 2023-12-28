<template>
    <div>
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
          type: 'bar', // or 'line', 'pie', etc.
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
                beginAtZero: false
              }
            }
          }
        });
      }
    }
  };
  </script>
  