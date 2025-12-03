// Sidebar toggle
let sidebarOpen = false;
const sidebar = document.getElementById("sidebar");
const sidebarItems = [];
afterDomReady(() => {
document.querySelectorAll('.sidebar-list-item').forEach((el) => {
el.addEventListener('click', () => {
document.querySelectorAll('.sidebar-list-item').forEach((i)=>i.classList.remove('active')
                                                       );
el.classList.add('active');
  });
});
const first = document.querySelector('.sidebar-list-item');
  if(first) first.classList.add('active');

const darkBtn = document.getElementById('dark-toggle');
  if(darkBtn) darkBtn.addEventListener('click', toggleDarkMode);
});

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
function toggleDarkMode() {
  document.body.classList.toggle('dark');
      try { localStorage.setItem('dashboard-dark', document.body.classList.contains('dark')) }catch(e){}
    }
afterDomReady(()=>{
  try{ if(localStorage.getItem('dashboard-dark') === 'true') document.body.classList.add('dark'); }catch(e){}

  });
function createChartToolbar() {
  const tb = document.createElement('div');
  tb.className ='chart-toolbar';
  tb.innerHTML = `
  <button class = "chart-btn" id="btn-toggle-area" title="toggle Area View">⚡</button>
  `;
  const areaCard = document.querySelector('#area-chart').parentElement;
  areaCard.style.position = 'relative';
tb.style.position = 'absolute';
tb.style.top = '10px';
tb.style.right = '10px';
tb.style.display = 'flex';
tb.style.gap = '6px';
tb.style.background = 'rgba(0,0,0,0.05)';
tb.style.padding = '6px 8px';
tb.style.borderRadius = '8px';
areaCard.appendChild(tb);
document.getElementById('btn-toggle-area').addEventListener('click', toggleAreaMode);
}
let barChart, areaChart;
afterDomReady(()=>{
// Bar Chart
const barChartOptions = {
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
barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
barChart.render();
//Area Chart
const areaChartOptions = {
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
areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
areaChart.render();
}); 
let areaMode = 0;
function toggleAreaMode(){
  if(!areaChart) return;
  if(areaMode === 0) {
    areaChart.updateOptions({
      series:[ areaChart.w.globals.series[1]] }, true, true);
    areaMode = 1;
  } else{
    areaChart.updateOptions({ 
      series: [{
        name: 'Total Revenue', data:[57.50, 67.30, 77.20, 93.80, 111.80, 128.40, 141.80] }, 
                                       { name:'Electric', data:[28.18,32.98,37.83,45.96,54.78,62.92,69.48] }, 
                                       { name:'Autonomous', data:[16.33,19.11,21.92,26.64,31.75,36.47,40.27] }] }, true, true);
    areaMode= 0;
  }
}

  
