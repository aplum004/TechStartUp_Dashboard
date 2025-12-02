// Sidebar toggle
let sidebarOpen = false;
const sidebar = document.getElementById("sidebar");

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}

// Bar Chart
var barChartOptions = {
  series: [{
    data: [10, 8, 6, 4, 2]
  }],

  chart: {
    type: 'bar',
    height: 380,
    toolbar: { show: false }
  },

  colors: ["#246dec", "#cc3c43", "#367952", "#f5b74f", "#4f35a1"],

  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      columnWidth: '40%',
    }
  },

  dataLabels: { enabled: false },
  legend: { show: false },

  xaxis: {
    categories: ['Lucid Motors', 'Tesla', 'Waymo', 'Hyundai Ioniq', 'Mercedes EQS']
  },

  yaxis: {
    title: { text: "Count" }
  }
};

var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
barChart.render();

    

  
