// Sidebar toggle
let sidebarOpen = false;
const sidebar = document.getElementById("sidebar");
const sidebarItems = [];



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
function navigate(pageId) {
  document.querySelectorAll('.page').forEach((p) => {
    if(p.id === 'page-' + pageId){
      p.classList.add('active');
      p.querySelectorAll('.charts-card, .card').forEach((el) => {
        el.classList.remove('slide-up');
        void el.offsetWidth; 
        el.classList.add('slide-up');
      });                                                      
    } else {
      p.classList.remove('active');
    }
  });
}



// Bar Chart
var barChartOptions = {
  series: [{
    data: [40, 35, 30, 25, 20, 15, 10, 5, 0]
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
//Area Chart
var areaChartOptions = {
  series: [{
    name:'Total Revenue',
    data: [57.50, 67.30, 77.20, 93.80, 111.80, 128.40, 141.80]
  }, {
    name: 'Electric Smart Car',
    data: [28.18, 32.98, 37.83, 45.96, 54.78, 62.92, 69.48]
  }, {
    name: 'Autonomous Smart Car',
    data: [16.33, 19.11, 21.92, 26.64, 31.75, 36.47, 40.27]
  }],
  chart: {
    height: 320,
    type: 'area',
    animations:{ enabled: true, easing: 'easeinout', speed:800 },
    toolbar: {
      show: false,
    },
  },
  colors: ["#4f35a1", "#246dec", '#367952'],
  dataLabels: {
    enabled: false,
  },
  stroke: { curve:'smooth' }, xaxis:{ categories:['2018', '2019', '2020','2023','2024']},
  yaxis: [
    {
      title: {
        text: 'Total Revenue',
      },
    },
    {
      opposite: true,
      title: {
        text:'Electric Smart Car',
      },
    },
    {
      opposite: true,
      title: {
        text:'Autonomous Smart Car',
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  }
};
var areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
areaChart.render();

//Data
const data = {
    Company: ['Lucid Motors', 'Hyundai Ioniq', 'Mercedes Benz', 'Tesla', 'Waymo'],
    Model: ['Lucid Air / Gravity', 'IONIQ 5 / IONIQ 6', 'EQS / S-Class', 'Model S / Model Y','(Jaguar I-PACE / Chrysler Pacifica)'],
    Autonomy_Level: [4, 2, 3, 2, 4],
    Cameras: [14, 8, 10, 8, 29],
    Radar: [5, 3, 4, 0, 1],
    Lidar: [1, 0, 1, 0, 5],
    Ultrasonic: [12, 6, 8, 0, 6]
};

const autonomyTrace = {
    x: data.Company,
    y: data.Autonomy_Level,
    type: 'bar',
    text: data.Autonomy_Level,
    textposition: 'outside',
    marker: {
        color: ['#4285F4', '#EA4335', '#34A853']
    }
};
Plotly.newPlot('autonomyBar', [autonomyTrace], {
    title: 'Autonomy Level via Company'
});
const autonomyBarData = [{
    x: data.Company,
    y: data.Autonomy_Level,
    type: "bar",
    text: data.Autonomy_Level,
    textposition: "outside",
    marker: { color: ["#e63946", "#457b9d"] }
}];

Plotly.newPlot("autonomyBarTW", autonomyBarData, {
    title: "Autonomy level via company (Tesla x Waymo)",
    yaxis: { title: "Autonomy Level" }
});
const sensorTypes = ['Cameras', 'Radar', 'Lidar', 'Ultrasonic'];
const colors = ['#4285F4', '#34A853', '#A142F4', '#EA4335'];

const sensorTraces = sensorTypes.map((sensor, i) => ({
    x: data.Company,
    y: data[sensor],
    name: sensor,
    type: 'bar',
    marker: { color: colors[i] }
}));

Plotly.newPlot('sensorBar', sensorTraces, {
    barmode: 'stack',
    title: 'Sensors by Company'
});
function makePie(divId, companyIndex, companyName) {
    const values = [
        data.Cameras[companyIndex],
        data.Ultrasonic[companyIndex],
        data.Radar[companyIndex],
        data.Lidar[companyIndex]
    ];

    const labels = ['Cameras', 'Ultrasonic', 'Radar', 'Lidar'];

    Plotly.newPlot(divId, [{
        values: values,
        labels: labels,
        type: 'pie',
        textinfo: 'percent',
        marker: {
            colors: ['#4285F4', '#DB95D3', '#34A853', '#A142F4','#C495DB',  ]
        }
    }], {
        title: `${companyName} – Sensor Percentages`
    });
}
const sensorStackData = [
    {
        x: data.Company,
        y: data.Cameras,
        name: "Cameras",
        type: "bar"
    },
    {
        x: data.Company,
        y: data.Radar,
        name: "Radar",
        type: "bar"
    },
    {
        x: data.Company,
        y: data.LIDAR,
        name: "LIDAR",
        type: "bar"
    },
    {
        x: data.Company,
        y: data.Ultrasonic,
        name: "Ultrasonic",
        type: "bar"
    }
];

Plotly.newPlot("sensorStack", sensorStackData, {
    title: "Sensors via company (Tesla x Waymo)",
    barmode: "stack"
});



makePie('pieLucid', 0, 'Lucid Motors');
makePie('pieHyundai', 1, 'Hyundai Ioniq');
makePie('pieMercedes', 2, 'Mercedes Benz');
makePie('pieTesla', 3, 'Tesla');
makePie('pieWaymo', 4, 'Waymo');
      
    
