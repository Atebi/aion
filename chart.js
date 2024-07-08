// Get color scheme
function getColorScheme() {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme:dark)").matches
    ? "dark"
    : "light";
}

// Set chart default color based on color scheme
function setChartColor(scheme) {
  if (scheme === "dark") {
    // console.log("Scheme is:", scheme);
    return "#f5f5f5";
  } else {
    // console.log("Scheme is:", scheme);
    return "#333";
  }
}

// Fetch data from Google Sheets via SheetsDB
async function fetchData() {
  const apiUrl = "https://sheetdb.io/api/v1/p0y3tu6l7g2sg";

  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

// Initialize Chart
function initializeChart(data) {
  const dates = [];

  const btc = [];

  const nvda = [];

  //   Process data from endpoint
  for (let i = 0; i < data.length; i++) {
    dates.push(data[i]["Date"]);

    btc.push(parseInt(data[i]["BTC % Change"]));

    nvda.push(parseInt(data[i]["NVDA % Change"]));
  }

  const xValues = dates;

  //   Set chart default color based on current color scheme
  const colorScheme = getColorScheme();
  const chartColor = setChartColor(colorScheme);
  Chart.defaults.color = chartColor;

  const ctx = document.getElementById("aionChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xValues,
      datasets: [
        {
          label: "BTC % Change",
          data: btc,
          borderColor: "#156082",
          backgroundColor: "#156082",
          fill: false,
          tension: 0.1,
          pointRadius: 0,
        },
        {
          label: "NVDA % Change",
          data: nvda,
          borderColor: "#E97132",
          backgroundColor: "#E97132",
          fill: false,
          tension: 0.1,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: true,
          grid: { display: false },
          ticks: {
            font: {
              size: 12,
              weight: "bold",
            },
          },
        },
        y: {
          display: true,
          grid: { display: false },
          ticks: {
            font: {
              size: 12,
              weight: "bold",
            },
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "bottom",
        },
      },
    },
  });
}

// Fetch data and initialize chart(after data from endpoint has been resolved)
fetchData()
  .then(data => {
    initializeChart(data);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
