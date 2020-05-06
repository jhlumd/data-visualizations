// const dataset = [1, 2, 3, 4, 5];

// d3.select("body")
//   .selectAll("p")
//   .data(dataset)
//   .enter()
//   .append("p")
//   .text((d) => d);

const dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
const dataset2 = dataset.map((el) => el / 10);

const svgWidth = 500;
const svgHeight = 300;
const barPadding = 5;
const barWidth = svgWidth / dataset.length;


const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset2)])
  .range([0, svgHeight]);

const svg = d3
  .select("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

const barChart = svg
  .selectAll("rect")
  .data(dataset2)
  .enter()
  .append("rect")
  .attr("y", (d) => svgHeight - yScale(d))
  .attr("height", (d) => yScale(d))
  .attr("width", barWidth - barPadding)
  .attr("transform", (d, i) => `translate(${barWidth * i}, 0 )`);

const text = svg
  .selectAll("text")
  .data(dataset2)
  .enter()
  .append("text")
  .text((d) => d)
  .attr("y", (d, i) => svgHeight - d - 2)
  .attr("x", (d, i) => barWidth * i)
  .attr("fill", "#A64C38");
