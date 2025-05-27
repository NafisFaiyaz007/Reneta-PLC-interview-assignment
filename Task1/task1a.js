function getColor(value) {
  // Map 10 (min) to #fff1e0, 40 (max) to #7a2600, interpolate in between
  const min = 10, max = 40;
  const stops = [
    { v: 10, color: [255, 241, 224] }, // #fff1e0
    { v: 15, color: [250, 220, 190] }, // #fadcbe
    { v: 17, color: [255, 102, 0] }, // #ffcc99
    { v: 18, color: [255, 200, 155] }, // #fac89b
    { v: 23, color: [255, 153, 51] }, // #ff9933
    { v: 26, color: [250, 130, 45] }, // #FA822D
    { v: 30, color: [255, 102, 0] }, // #ff6600
    { v: 40, color: [122, 38, 0] }, // #7a2600
  ];
  if (value <= min) return "#fff1e0";
  if (value >= max) return "#7a2600";
  for (let i = 1; i < stops.length; i++) {
    if (value <= stops[i].v) {
      const prev = stops[i-1], next = stops[i];
      const t = (value - prev.v) / (next.v - prev.v);
      const c = prev.color.map((c, j) => Math.round(c + t * (next.color[j] - c)));
      return `rgb(${c[0]},${c[1]},${c[2]})`;
    }
  }
  return "#fff1e0";
}

function createChart(jsonData) {
  const productKey = "Product";
  const salesKey = "TotalSales";
  const valueKey = "TotalValue";
  // Sort bars in descending order of TotalSales
  jsonData.sort((a, b) => b[salesKey] - a[salesKey]);
  const labels = jsonData.map((item) => item[productKey]);
  const sales = jsonData.map((item) => item[salesKey]);
  const values = jsonData.map((item) => item[valueKey]);
  const colors = values.map(getColor);
  if (window.myChart) window.myChart.destroy();
  const ctx = document.getElementById("barChart").getContext("2d");
  window.myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Total Sales",
          data: sales,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const i = context.dataIndex;
              const d = jsonData[i];
              return [
                `Product: ${d[productKey]}`,
                `Total Sales: ${d[salesKey]}`,
                `Total Value: ${d[valueKey]}`
              ];
            }
          }
        },
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Total Sales" }
        },
        x: {
          title: { display: true, text: "Product" }
        }
      }
    }
  });
  // Add vertical color gradient legend
  renderGradientLegend();
}

function renderGradientLegend() {
  let legend = document.getElementById("colorLegend");
  if (!legend) {
    legend = document.createElement("canvas");
    legend.id = "colorLegend";
    legend.width = 30;
    // Match legend height to chart canvas height
    const chartCanvas = document.getElementById("barChart");
    legend.height = chartCanvas.height;
    legend.style.position = "absolute";
    legend.style.right = "40px";
    legend.style.top = chartCanvas.offsetTop + "px";
    legend.style.zIndex = 10;
    document.body.appendChild(legend);
    // Add labels and align them with the legend
    const labelMax = document.createElement("div");
    labelMax.innerText = "40";
    labelMax.style.position = "absolute";
    labelMax.style.right = "75px";
    labelMax.style.top = chartCanvas.offsetTop + "px";
    labelMax.style.fontSize = "14px";
    document.body.appendChild(labelMax);
    const labelMin = document.createElement("div");
    labelMin.innerText = "10";
    labelMin.style.position = "absolute";
    labelMin.style.right = "75px";
    labelMin.style.top = (chartCanvas.offsetTop + chartCanvas.height - 18) + "px";
    labelMin.style.fontSize = "14px";
    document.body.appendChild(labelMin);
    const labelTitle = document.createElement("div");
    labelTitle.innerText = "TotalValue";
    labelTitle.style.position = "absolute";
    labelTitle.style.right = "40px";
    labelTitle.style.top = (chartCanvas.offsetTop - 20) + "px";
    labelTitle.style.fontSize = "14px";
    document.body.appendChild(labelTitle);
  }
  const ctx = legend.getContext("2d");
  const grad = ctx.createLinearGradient(0, 0, 0, legend.height);
  grad.addColorStop(0, "#7a2600");
  grad.addColorStop(0.5, "#ffcc99");
  grad.addColorStop(1, "#fff1e0");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, legend.width, legend.height);
}

// Chart will be rendered after Excel upload only
// Excel upload integration
const excelInput = document.getElementById("excelFile");
if (excelInput) {
  excelInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;
    window.parseExcelFileToJson(file, function(jsonData) {
      const mapped = (jsonData.sheetA || []).map(row => ({
        Product: row.Product || row["Product"] || row[Object.keys(row)[0]],
        TotalValue: Number(row.TotalValue || row["TotalValue"] || row[Object.keys(row)[2]]),
        TotalSales: Number(row.TotalSales || row["TotalSales"] || row[Object.keys(row)[1]])
      })).filter(row => row.Product && !isNaN(row.TotalValue) && !isNaN(row.TotalSales));
      createChart(mapped);
    });
  });
}
