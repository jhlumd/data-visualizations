const dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

const svgWidth = 500;
const svgHeight = 300;

const svg = d3.select("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

const xScale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([0, svgWidth]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([svgHeight, 0]);

const xAxis = d3.axisBottom()
  .scale(xScale);

const yAxis = d3.axisLeft()
  .scale(yScale);

svg.append("g")
  .attr("transform", `translate(50, ${svgHeight - 20})`)
  .call(xAxis);

svg.append("g")
  .attr("transform", "translate(50, 10)")
  .call(yAxis);