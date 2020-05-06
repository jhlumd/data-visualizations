// const dataset = [1, 2, 3, 4, 5];

// d3.select("body")
//   .selectAll("p")
//   .data(dataset)
//   .enter()
//   .append("p")
//   .text((d) => d);

const dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

const svgWidth = 500;
const svgHeight = 300;
const barPadding = 5;
const barWidth = svgWidth / dataset.length;

const svg = d3.select("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

const barChart = svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("y", (d) => svgHeight - d)
  .attr("height", (d) => d)
  .attr("width", barWidth - barPadding)
  .attr("transform", (d, i) => `translate(${barWidth * i}, 0 )`);
