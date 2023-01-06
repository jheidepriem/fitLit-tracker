import { Chart } from "chart.js/auto";

const weeklyWaterContainer = document.querySelector(".weekly-water-container");
const sleepDataContainer = document.querySelector(".sleep-data-container");
const weeklyActivityContainer = document.querySelector(".activity-data-container")

const waterGraph = (waterData) => {
  weeklyWaterContainer.innerHTML = `<canvas id="weekWater"></canvas>`;
  const ctx = document.getElementById("weekWater").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [
        {
          label: "Ounces of Water",
          data: waterData,
          backgroundColor: [
            "rgba(113, 223, 255, 0.2)",
            "rgba(171, 217, 255, 0.2)",
            "rgba(113, 223, 231, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(113, 223, 255, 0.2)",
            "rgba(171, 217, 255, 0.2)",
          ],
          borderColor: [
            "rgb(113, 223, 255)",
            "rgb(171, 217, 255)",
            "rgb(113, 223, 231)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(113, 223, 255)",
            "rgb(171, 217, 2255)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const sleepGraph = (sleepData1, sleepData2) => {
  sleepDataContainer.innerHTML = `<canvas id="weekSleep"></canvas>`;
  const ctx = document.getElementById("weekSleep").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [
        {
          label: "Weekly Hours",
          data: sleepData1,
          borderColor: "rgb(77, 18, 238)",
          backgroundColor: "rgb(248, 246, 246)",
        },
        {
          label: "Weekly Quality",
          data: sleepData2,
          borderColor: "rgb(63, 209, 203)",
          backgroundColor: "rgb(248, 246, 246)",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Weekly Sleep Data",
        },
      },
    },
  });
};

const weeklyActivityGraph = (weekData1, weekData2, weekData3) => {
  weeklyActivityContainer.innerHTML = `<canvas id="weekActivity"></canvas>`;
  const ctx = document.getElementById("weekActivity").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [
    {
      label: 'Number of Steps',
      fill: false,
      backgroundColor:  "rgb(248, 246, 246)",
      borderColor: "rgb(77, 18, 238)",
      data: weekData1, 
    }, {
      label: 'Minutes Active',
      fill: false,
      backgroundColor:  "rgb(248, 246, 246)",
      borderColor: "rgb(77, 18, 238)",
      borderDash: [5, 5],
      data: weekData2,
    }, {
      label: 'Flights of Stairs Climbed',
      backgroundColor:  "rgb(248, 246, 246)",
      borderColor: "rgb(77, 18, 238)",
      data: weekData3,
      fill: true,
    },
  ],
},
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Weekly Activity Graph'
      },
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Month'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value'
        },
      },
    },
  },
  });
};

export { waterGraph, sleepGraph, weeklyActivityGraph };