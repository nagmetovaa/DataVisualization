const DATA = [
  { id: 1, value: 10, name: "Kaz" },
  { id: 2, value: 5, name: "Rus" },
  { id: 3, value: 3, name: "Kyr" },
  { id: 4, value: 1, name: "Ukr" },
];

const listItems = d3
  .select("ul")
  .selectAll("li")
  .data(DATA, (data) => data.name)
  .enter()
  .append("li");

function onMouseOver(d, i) {
    d3.select(this)
        .attr('class', 'highlight');

    d3.select('.info')
        .text(i.id + " Страна это  " + i.name + "значение -  " + i.value);

    d3.select(this)
        .transition()
        .duration(500)

}

function onMouseOut(d, i) {
    d3.select(this)
        .attr('class', 'bar');

    d3.select('.info')
        .text(defaultText);

    d3.select(this)
        .transition()
        .duration(550)
}

listItems.append("span").text((data) => data.name);

const xScale = d3
  .scaleBand()
  .domain(DATA.map((dp) => dp.name))
  .rangeRound([0, 250])
  .padding(0.1);

const yScale = d3.scaleLinear().domain([0, 12]).rangeRound([0, 200]);

const container = d3
  .select("svg")
  .append("g")
  .call(d3.axisBottom(xScale))
  .attr("color", "#DD1111");

const bars = container
  .selectAll(".bar")
  .data(DATA)
  .enter()
  .append("rect")
  .classed("bar", true)
  .on("mouseover", onMouseOver)
  .on("mouseout", onMouseOut)
  .attr("width", xScale.bandwidth())
  .attr("height", (data) => yScale(data.value))
  .attr("x", (data) => xScale(data.name))
  .attr("y", (data) => 200 - yScale(data.value));
// .text(data=>data.value);


listItems
  .append("input")
  .attr("type", "checkbox")
  .attr("checked", true)
  .attr("id", (data) => data.id)
  .on("change", (evnt) => {
    //Get id of checkbox
    cid = parseInt(evnt.target.id);

    //Get all existed bars
    const items = d3.selectAll(".bar").data();

    if (!evnt.target.checked) {
      //if unchecked
      d3.selectAll(".bar")
        .data(
          items.filter((el) => el.id !== cid), //return all bars except unchecked bar
          (data) => data.name
        )
        .exit()
        .remove(); //remove from d3
    } else {
      //if checked
      const item = DATA.find((el) => el.id === cid); //find checked bar
      items.push(item); //add to existed bars
      d3.select("svg") //append to d3
        .select("g")
        .selectAll(".bar")
        .data(items, (data) => data.name)
        .enter()
        .append("rect")
        .classed("bar", true)
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut)
        .attr("width", xScale.bandwidth())
        .attr("height", (data) => yScale(data.value))
        .attr("x", (data) => xScale(data.name))
        .attr("y", (data) => 200 - yScale(data.value))
    }
  });

  function onMouseOver(d, i) { d3.select(this)
    .attr('class', 'highlight');
    d3.select('.info')
    .text(i.year + " г. количество родившихся в стране " + i.births + "человек, кол-во умерших - " + i.deceased + "человек");
    d3.select(this) .transition()
    .duration(500)
    .attr('width', xScale.bandwidth() + 5)
    .attr("y", (d) => yScale(d.growth) - 10)
    .attr("height", (d) => height - yScale(d.growth) + 10); }


const M = d3
  .scaleBand()
  .domain(["Jan", "Feb", "Mar", "Apr", "May"])
  .range([1, 2]);

console.log(M("Jan"));
console.log(M("Feb"));
console.log(M("Mar"));
console.log(M("Apr"));
console.log(M("May"));
console.log(M("May111"));
