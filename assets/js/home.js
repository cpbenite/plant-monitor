setActivePage('nav_home');
document.getElementById("stats-generator").click();


// if (document.querySelector('.jscolor').value == "000000") {
//   document.getElementById("off-button").classList.add("disabled");
//   document.getElementById("set-default-button").classList.add("disabled");
// }
// else {
//   document.getElementById("off-button").classList.remove("disabled");
//   document.getElementById("set-default-button").classList.remove("disabled");
// }
//
// function submit(setDefault=false, useDefault=false, turnOff=false) {
//   // If any checkboxes are checked, display it on buttons
//   if (setDefault == true) {
//     document.getElementById("set-as-default").checked = true;
//   }
//   if (useDefault == true) {
//     document.getElementById("change-to-default").checked = true;
//   }
//   if (turnOff == true) {
//     document.getElementById("turn-off").checked = true;
//   }
//
//   // Submit color form
//   document.getElementById("color-form").submit();
// }


function renderChart(ctx, data) {
  var myDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        legend: {
          display: false,
        }
      }
  });
}

function analyze(temperatureData, humidityData, onData, moistureData) {
  console.log("Inside Analyze function");
  var temperatureRenderData = {
    datasets: [{
      data: temperatureData,
      backgroundColor: ['#a5673f', '#976c3e', '#07a2ee']
    }],

    labels: ['Hot', 'Comfortable', 'Cold']
  };

  console.log(temperatureData);

  var humidityRenderData = {
    datasets: [{
      data: humidityData,
      backgroundColor: ['#13763f', '#54a06b', '#b3d264']
    }],

    labels: ['Humid', 'Comfortable', 'Dry']
  };

  var onRenderData = {
    datasets: [{
      data: onData,
      backgroundColor: ['#13763f', '#54a06b']
    }],

    labels: ['On','Off']
  };

  console.log(moistureData);

  var moistureRenderData = {
    datasets: [{
      data: moistureData,
      backgroundColor: ['#5a9dd8', '#d8be5a']
    }],

    labels: ['Moist','Dry']
  };

  renderChart(document.getElementById("temperature-chart"), temperatureRenderData);
  renderChart(document.getElementById("humidity-chart"), humidityRenderData);
  renderChart(document.getElementById("on-chart"), onRenderData);
  renderChart(document.getElementById("moisture-chart"), moistureRenderData);
}
