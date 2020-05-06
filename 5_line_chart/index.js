const startDate = "2017-12-31";
const endDate = "2020-05-01";
const api = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;

document.addEventListener("DOMContentLoaded", () => {
  fetch(api)
    .then((response) => response.json())
    .then((data) => drawChart(parseData(data)))
    .catch((error) => console.log(error));
});

function parseData(data) {
  const arr = [];
  for (const date in data.bpi) {
    arr.push({
      date: new Date(date),
      value: +data.bpi[date],
    });
  }
  console.log(arr);
  return arr;
}

const svgWidth = 600;
const svgHeight = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

const svg = d3.select('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);
  
const g = svg.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

const xScale = d3.scaleTime()
  .rangeRound([0, width]);

const yScale = d3.scaleLinear()
  .rangeRound([height, 0]);

const line = d3.line()
  .x((d) => xScale(d.date))
  .y((d) => yScale(d.value));

function drawChart(data) {
  xScale.domain(d3.extent(data, (d) => d.date));
  yScale.domain(d3.extent(data, (d) => d.value));

  g.append("g")
    .attr("transform", "translate(0, " + height + ")")
    .call(d3.axisBottom(xScale))
    .select(".domain")
    .remove();

  g.append("g")
    .call(d3.axisLeft(yScale))
    .append("text")
    .attr('fill', "#000")
    .attr('transform', "rotate(-90)")
    .attr('y', 6)
    .attr('dy', "0.71em")
    .attr('text-anchor', "end")
    .text("Price ($)");

  g.append("path")
    .datum(data)
    .attr('fill', "none")
    .attr('stroke', "steelblue")
    .attr('stroke-linejoin', "round")
    .attr('stroke-linecap', "round")
    .attr('stroke-width', 1.5)
    .attr('d', line);
}