const salesData = [
  { month: "January", sales: 100000 },
  { month: "February", sales: 200000 },
  { month: "March", sales: 312000 },
  { month: "April", sales: 400000 },
  { month: "May", sales: 500000 },
  { month: "June", sales: 600000 },
  { month: "July", sales: 700000 },
  { month: "August", sales: 800000 },
  { month: "September", sales: 900000 },
  { month: "October", sales: 1000000 },
  { month: "November", sales: 5100000 },
  { month: "December", sales: 10000000 },
];

const thresholds = [
  { label: "Low", limit: 3000000, color: "red" },
  { label: "Medium", limit: 7000000, color: "orange" },
  { label: "High", limit: Infinity, color: "blue" },
];

const buttonsDiv = document.getElementById("buttons");
const statusDiv = document.getElementById("status");

// Create buttons dynamically
salesData.forEach((entry) => {
  const btn = document.createElement("button");
  btn.innerText = entry.month;
  btn.onclick = () => updateGauge(entry.sales, entry.month);
  buttonsDiv.appendChild(btn);
});

// Initialize chart
const ctx = document.getElementById("gaugeChart").getContext("2d");
const gaugeChart = new Chart(ctx, {
  type: "gauge",
  data: {
    labels: thresholds.map((t) => t.label),
    datasets: [
      {
        value: 0,
        data: [3000000, 4000000, 3000000],
        backgroundColor: thresholds.map((t) => t.color),
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    needle: {
      radiusPercentage: 2,
      widthPercentage: 3.2,
      lengthPercentage: 80,
      color: "gray",
    },
    valueLabel: {
      display: true,
      formatter: (value) => `${(value / 1000000).toFixed(1)}m`,
      fontSize: 20,
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `Range: ${context.label}`,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutBounce",
    },
  },
});

function updateGauge(value, month) {
  gaugeChart.data.datasets[0].value = value;
  gaugeChart.update();

  const status = thresholds.find((t) => value <= t.limit);
  statusDiv.innerHTML = `Status: <span class="status-label ${status.label.toLowerCase()}">${
    status.label
  }</span>`;
}

// Set initial value
updateGauge(salesData[0].sales, salesData[0].month);
