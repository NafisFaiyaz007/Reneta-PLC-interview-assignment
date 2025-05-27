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
  const ctx = document.getElementById("gaugeChart").getContext("2d");

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
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2,
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

function renderGaugeUI(data) {
  // Clear previous buttons
  monthBtnContainer.innerHTML = "";
  gaugeData = data;
  createMonthButtons();
  initChart(gaugeData[0].Sales);
}

if (excelInputB) {
  excelInputB.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;
    window.parseExcelFileToJson(file, function(jsonData) {
      const mapped = (jsonData.sheetB || []).map(row => ({
        Month: row.Month || row["Month"] || row[Object.keys(row)[0]],
        Sales: Number(row.Sales || row["Sales"] || row[Object.keys(row)[1]])
      })).filter(row => row.Month && !isNaN(row.Sales));
      renderGaugeUI(mapped);
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
  // No-op for gauge chart until Excel is uploaded
};
