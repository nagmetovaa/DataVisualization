const DATA = [
  {x:1, y:5},
  {x:4, y:7},
  {x:2, y:1},
  {x:1, y:7},
  {x:3, y:9},
  {x:5, y:8},
  {x:9, y:9},
  {x:6, y:7},
  {x:2, y:8},
  {x:7, y:3},
  {x:6, y:8},
  {x:3, y:6},
  {x:1, y:2},
  {x:8, y:5},
  {x:6, y:4},
  {x:4, y:6},
  {x:5, y:5},
  {x:9, y:1},
  {x:3, y:3},
  {x:7, y:5}
]
const width = 700;
const height = 300;

const svg = d3.select("body").append("svg") //the rectangle
    .attr("width", width)
    .attr("height", height);

const xScale = d3.scaleLinear()
  .domain([1,10])
  .range([0 , width])

const yScale = d3.scaleLinear()
  .domain([0, 10])
  .range([0, height])

const circle = svg.selectAll(".ufoCircle")
  .data(DATA)
  .enter()
  .append('circle')
  .attr('class', 'ufoCircle')
  .attr('r', 10)
  .attr("cx", data=>300-xScale(data.x))
  .attr("cy", data=>yScale(data.y));
