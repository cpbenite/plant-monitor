setActivePage('nav_details');
var label = [];

document.getElementById("convert-times").click();
document.getElementById("first-chart").click();

// Update table row timestamps
tableRows = document.querySelectorAll('.date');
tableRows.forEach( function(row, i) {
  row.innerHTML = label[i];
})

// Convert times to LocaleString
function convertTimes(times_data) {
  for(let i = 0; i < times_data.length; i++) {
    var date = new Date(times_data[i]);
    label[i] = date.toLocaleString();
  }
}

function showLineChart(elem, data) {
  console.log(data);
  // Remove original chart
  var oldCtx = document.querySelector("canvas");
  var parent = oldCtx.parentNode;
  parent.removeChild(oldCtx);

  // Create new chart
  var ctx = document.createElement("canvas");
  ctx.height = 275;
  parent.appendChild(ctx);

  // Remove all active items and
  // Give class active to correct element
  var items = elem.parentNode.children;
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("active");
  }
  elem.classList.add("active");

  // Render new chart
  var ctx = document.querySelector("canvas");
  renderChart(ctx, data);
}


function renderChart(ctx, data) {
  var data = {
    datasets: [{
      data: data
    }],
    labels: label
  };

  var ctx = document.querySelector("canvas");

  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
  });
}
