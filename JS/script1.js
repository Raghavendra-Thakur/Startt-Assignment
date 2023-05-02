
$(function () {
  $("#inputValue, #maxValue").change(function () {
    var fst = $("#inputValue").val();
    var sec = $("#maxValue").val();
    console.log(fst)
    console.log(sec)
    if (Number(sec) < Number(fst)) {
      alert("Input value should be less than Max value");
      mychart.data.datasets[0].data[0] = 0;
      myChart2.data.datasets[0].data[0] = 0;
      myChart3.data.datasets[0].data[0] = 0;
      mychart.data.datasets[0].data[1] = 100;
      myChart2.data.datasets[1].data[0] = 100;
      myChart3.data.datasets[1].data[0] = 100;
      mychart.update();
      myChart2.update();
      myChart3.update();
      return true;
    }else{
      mychart.data.datasets[0].data[0] = fst;
      myChart2.data.datasets[0].data[0] = fst;
      myChart3.data.datasets[0].data[0] = fst;
      var remain = sec - fst;
      mychart.data.datasets[0].data[1] = remain;
      myChart2.data.datasets[1].data[0] = remain;
      myChart3.data.datasets[1].data[0] = remain;
      mychart.update();
      myChart2.update();
      myChart3.update();

      $(".percentage").html("<h4 class='percentage mt-4 textstyle_per'>"+ (fst*100 / sec).toFixed(0)+"%" +"</h4>")
    }
  });
});

const ctx = document.getElementById("myPiechart");
let mychart = new Chart(ctx, {
  type: "pie",
  data: {
    datasets: [
      {
        data: [0, 100],
        backgroundColor: ["#008cff", "#c2e3ff"],
        borderWidth: 1,
      },
    ],
  },
  plugins: [ChartDataLabels],
  options: {
    plugins: {
      tooltip:{
        enabled: false,
      },
      hover:{
        mode:null,
      },
      datalabels:{
        font:{
          size: 25,
          weight:'bold'
        },
        color: "#c2e3ff",
        formatter:(value,context)=>{
          console.log(context.chart.data.datasets[0].data)
          const datapoints = context.chart.data.datasets[0].data
          function totalSum(total , datapoint){
            console.log(datapoint)
            return total + Number(datapoint)
            
          }
          const totalValue = datapoints.reduce(totalSum,0);
          const percentage = (value/totalValue * 100).toFixed(0)+"%";
          return percentage 
        }
      }
    },
  },
});

Chart.register(ChartjsPluginStacked100.default);

const data = {
  labels: ["input"],
  datasets: [
    {
      data: [0],
      backgroundColor: ["#008cff"],
      borderWidth: 1,
    },
    {
      data: [100],
      backgroundColor: ["#c2e3ff"],
      borderWidth: 1,
    },
  ],
};

// config
const config = {
  type: "bar",
  data,

  options: {
    maintainAspectRatio: false,
    plugins: {
      tooltip:{
        enabled: false,
      },
      legend: {
        display: false,
      },
      stacked100: {
        enable: true,
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
  },
};

// render init block
const myChart2 = new Chart(document.getElementById("myVerchart"), config);

//gradchart

const data3 = {
  labels: ["input"],
  datasets: [
    {
      //   label: 'My First Dataset',
      data: [0],
      backgroundColor: function (context) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) {
          return null;
        }
        return getGradient(ctx, chartArea);
      },

      borderWidth: 1,
    },
    {
      // label: 'My First Dataset',
      data: [100],
      backgroundColor: function (context) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) {
          return null;
        }
        return getGradient2(ctx, chartArea);
      },
      borderWidth: 1,
    },
  ],
};

//gradienblock

function getGradient(ctx, chartArea) {
  const gradientBg = ctx.createLinearGradient(
    0,
    chartArea.top,
    0,
    chartArea.bottom
  );
  gradientBg.addColorStop(0.3, "#c2e3ff");
  gradientBg.addColorStop(1, "#008cff");
  return gradientBg;
}
function getGradient2(ctx, chartArea) {
  const gradientBg = ctx.createLinearGradient(
    0,
    chartArea.top,
    0,
    chartArea.bottom
  );
  gradientBg.addColorStop(0, "#c2e3ff");
  gradientBg.addColorStop(1, "#c2e3ff");
  return gradientBg;
}

// config-gradchart
const config3 = {
  type: "bar",
  data: data3,
  options: {
    maintainAspectRatio: false,
    plugins: {
      tooltip:{
        enabled: false,
      },
      legend: {
        display: false,
      },
      stacked100: {
        enable: true,
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
  },
};

// render init block
const myChart3 = new Chart(document.getElementById("mygradchart"), config3);
