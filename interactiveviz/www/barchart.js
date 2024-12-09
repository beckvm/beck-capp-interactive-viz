function drawBarChart(svg, data) {
    const margin = 25
    const height = 200 - margin
    const width = 300 - margin

    var svg = d3
        .select(svg)
        .append("svg")
            .attr("width", 600)
            .attr("height", 350)
            .attr("viewBox", "0 0 200 200")
        .append("g")
            .attr("transform",
                "translate(" +  5 + "," + 5 + ")");

    var subgroups = ["aapi_pop", "white_pop", "other"]
    var groups = ["1980", "1990", "2000", "2010", "2020"]

    var x = d3.scaleBand()
        .range([0, width])
        .domain(groups)
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));
    
    var y = d3.scaleLinear()
        .domain([0, 4000])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));

    var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(["#B11818", "#FFD727", "#4A698A"])
    
    var stackGen = d3.stack()
        .keys(subgroups)
    var stackedSeries = stackGen(data)

    svg.append("g")
        .selectAll("g")
        .data(stackedSeries)
        .join("g")
        .attr("fill", function(d) { return color(d.key); })
        .selectAll("rect")
        .data(function(d) { return d; })
        .join("rect")
            .attr("x", function(d) { return x(d.data.year); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("height", function(d) { return y(d[0]) - y(d[1]); })
            .attr("width",x.bandwidth())
    
    var labels = ["Asian", "White", "Other"]
    var size = 10

    svg.selectAll("legendboxes")
        .data(labels)
        .join("rect")
        .attr("x", 10)
        .attr("y", function(d,i){ return 10 + i*(size+5)})
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d){ return color(d)})
    
    svg.selectAll("legendlabels")
        .data(labels)
        .join("text")
        .attr("x", 10 + size*1.5)
        .attr("y", function(d,i){ return 10 + i*(size+5) + (size/2)}) 
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .style("font-size", "13px")
}

