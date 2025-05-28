const rawJson = document.getElementById("jsonData").textContent;
const data = JSON.parse(rawJson);

const maxValue = 10000000;
let chart;

const statusEl = document.getElementById("statusText");
const monthBtnContainer = document.getElementById("month-buttons");

function getCategory(value) {
  if (value <= 3000000) return "Low";
  if (value < 7000000) return "Medium";
  return "High";
}

function getColor(category) {
  switch (category) {
    case "Low":
      return "rgba(255, 99, 132, 0.8)";
    case "Medium":
      return "rgba(255, 159, 64, 0.8)";
    case "High":
      return "rgba(75, 192, 192, 0.8)";
  }
}

function setStatus(category) {
  statusEl.textContent = category;
  statusEl.className = `status-box status-${category.toLowerCase()}`;
}

function updateChart(value) {
  const category = getCategory(value);
  setStatus(category);

  const angle = (value / maxValue) * 180;

  chart.data.datasets[0].data = [value, maxValue - value];
  chart.options.plugins.tooltip.callbacks.label = () => `Category: ${category}`;
  chart.update();
}

function initChart(value) {
  const canvas = document.getElementById("gaugeChart");
  const ctx = canvas.getContext("2d");
  
  // Set canvas dimensions
  canvas.width = 600;
  canvas.height = 300;
  
  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Value", "Remaining"],
      datasets: [
        {
          data: [value, maxValue - value],
          backgroundColor: [getColor(getCategory(value)), "#e0e0e0"],
          borderWidth: 0,
          circumference: 180,
          rotation: 270,
          cutout: "80%",
        },
      ],
    },
    options: {
      responsive: false, // Disable automatic resizing
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `Category: ${getCategory(ctx.chart.data.datasets[0].data[0])}`,
          },
        },
      },
    },
  });
}

const excelInputB = document.getElementById("excelFileB");
let gaugeData = [];

// New function to accept JSON array directly
window.renderGaugeFromJson = function(jsonData) {
  console.log('Raw JSON data:', jsonData);
  const mapped = (jsonData || []).map(row => ({
    Month: row.Month || row.month || row['Month'] || row[Object.keys(row)[0]],
    Sales: Number(row.Sales || row.sales || row['Sales'] || row[Object.keys(row)[1]])
  })).filter(row => row.Month && !isNaN(row.Sales));
  
  console.log('Mapped data:', mapped);
  if (mapped.length === 0) {
    console.error('No valid data found after mapping');
    return;
  }
  
  renderGaugeUI(mapped); // Ensure we call renderGaugeUI with the mapped data
};

if (excelInputB) {
  excelInputB.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;
    window.parseExcelFileToJson(file, function(jsonData) {
      if (!jsonData.sheetB || jsonData.sheetB.length === 0) {
        alert('No data found in Task 1 (b) sheet');
        return;
      }
      window.renderGaugeFromJson(jsonData.sheetB);
    });
  });
}

function createMonthButtons() {
  gaugeData.forEach((entry, i) => {
    const btn = document.createElement("button");
    btn.textContent = entry.Month;
    btn.classList.add("month");
    if (i === 0) btn.classList.add("active");

    btn.addEventListener("click", () => {
      document
        .querySelectorAll("button.month")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      updateChart(entry.Sales);
    });

    monthBtnContainer.appendChild(btn);
  });
}

window.onload = () => {
  // Remove empty chart initialization - we'll initialize when data is available
};

// Ensure renderGaugeUI properly initializes the chart
function renderGaugeUI(data) {
  // Clear previous buttons
  monthBtnContainer.innerHTML = "";
  gaugeData = data;
  createMonthButtons();
  
  // Initialize chart with first data point
  if (gaugeData.length > 0) {
    initChart(gaugeData[0].Sales);
  }
}
