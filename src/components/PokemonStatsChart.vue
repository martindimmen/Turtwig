<template>
    <div class="chart-container">
      <canvas ref="statsChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables, LinearScale, BarElement, CategoryScale } from 'chart.js';
  Chart.register(...registerables, LinearScale, BarElement, CategoryScale);
  
  export default {
    props: {
      stats: Array,
    },
    data() {
      return {
        chart: null,
      };
    },
    mounted() {
      this.createChart();
    },
    methods: {
      createChart() {
        const ctx = this.$refs.statsChart.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'bar', 
          data: {
            labels: this.stats.map(stat => stat.stat.name),
            datasets: [{
              label: 'Stats',
              data: this.stats.map(stat => stat.base_stat),
              backgroundColor: this.stats.map(() => 'rgba(75, 192, 192, 0.2)'), // Custom color for bars
              borderColor: this.stats.map(() => 'rgba(75, 192, 192, 1)'), // Custom border color for bars
              borderWidth: 2
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                max: 255,
                grid: {
                  color: 'rgba(200, 200, 200, 0.5)', // Custom grid line color
                },
                ticks: {
                  color: '#4A5568', // Custom tick color
                }
              },
              x: {
                ticks: {
                  color: '#4A5568', // Custom tick color
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: '#4A5568', // Custom legend labels color
                }
              }
            }
          }
        });
      },
      updateChart() {
        if (this.chart) {
          this.chart.data.labels = this.stats.map(stat => stat.stat.name);
          this.chart.data.datasets[0].data = this.stats.map(stat => stat.base_stat);
          this.chart.update();
        }
      }
    },
    watch: {
      stats: {
        deep: true,
        handler() {
          this.updateChart();
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .chart-container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: #4A5568; /* Dark gray text color */
  }
  
  #statsChart {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  </style>
  