// Use fetch API to load JSON data from the server
fetch('third_data.json')
.then(response => response.json())
.then(data => {
    // Select the chart container using its ID
  const chartContainer = d3.select("#crime");
  const containerBounds = chartContainer.node().getBoundingClientRect();
  const containerWidth = containerBounds.width;

    // Define margins
  var margin = {top: 60, right: 30, bottom: 90, left: 60},
  width = containerWidth - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom; // Height can be adjusted as needed

    // Append SVG to the chart container
        var svg = chartContainer.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Tooltip for hover information
        var tooltip = d3.select("#crime").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Scales for the chart
        var x = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d['Average Crime Rate per Capita']; })])
        .range([0, width]);

        var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d['Average State Occurrences']; })])
        .range([height, 0]);

        var z = d3.scaleSqrt()
        .domain([0, d3.max(data, function(d) { return d['State Population']; })])
        .range([2, 30]);

        var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Drawing circles for each data point
        svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d['Average Crime Rate per Capita']); })
        .attr("cy", function(d) { return y(d['Average State Occurrences']); })
        .attr("r", function(d) { return z(d['State Population']); })
        .style("fill", function(d, i) { return color(i); })
        .style("opacity", "0.7")
        .attr("stroke", "black")
        .on("mouseover", function(event, d) {
          tooltip.transition()
          .duration(200)
          .style("opacity", 1);
          tooltip.html("State: " + d.State + "<br/>Avg Crime Rate: " + d['Average Crime Rate per Capita'] +
            "<br/>State Occurrences: " + d['Average State Occurrences'] + "<br/>Population: " + d['State Population'])
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px");
        })
        .on("mouseout", function(d) {
          tooltip.transition()
          .duration(500)
          .style("opacity", 0);
        });

    // Add axis labels
        svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Average Crime Rate per Capita");

        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Average Sightings per state");

        svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Bigfoot sightings vs. Crime Rate by State");

    // Add X and Y axes to the svg
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        svg.append("g")
        .call(d3.axisLeft(y));
      })
.catch(error => {
  console.error('Error fetching data: ', error);
  alert('Error fetching data: ' + error.message);
});