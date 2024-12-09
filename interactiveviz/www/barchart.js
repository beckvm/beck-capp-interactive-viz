let div = d3
    .select("#dcBar")
    .append("svg")
    .attr("width", 200)
    .attr("height", 200)
    .attr("viewBox", "0 0 200 200");

const margin = 25
const height = 200 - margin
const width = 200 - margin
const barWidth = 25
const barPadding = 3

const visitorsScale = d3
    .scaleLinear()
    .domain([0,18000000])
    .range([height * 0.5, 0])
    .clamp(true);
