   // JavaScript code for creating and updating the chart
document.addEventListener("DOMContentLoaded", function() {
    let currentDatasetIndex = 0; // Default to the first dataset

    const data = [
        [{"winter": 758, "description": "Winter"}, {"fall": 1512, "description": "Fall"}, {"summer": 1892, "description": "Summer"}, {"spring": 837, "description": "Spring"}],
        [{"class a": 2500, "description": "Class A"}, {"class b": 3009, "description": "Class B"}, {"class c": 30, "description": "Class C"}]
        ].map(d => d.map(Object.entries).flat());

    // Select the chart container using its ID
    const chartContainer = d3.select("#chartContainer1");
    const containerWidth = chartContainer.node().offsetWidth; // Get the width of the container dynamically

    // Calculate the height of the chart based on the container width
    const width = containerWidth;
    const height = width / 2;

    const svg = chartContainer
    .append("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("width", "100%") // Set the width to 100% to make it responsive
        .attr("height", "100%"); // Set the height to 100% to make it responsive

            // Append title to the SVG container
    svg.append("text")
        .attr("x", 0)
        .attr("y", -height / 2 - 20) // Adjust position based on chart size
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Sighting by Season/Class");

        const color = d3.scaleOrdinal(d3.schemeCategory10);
        const pie = d3.pie().value(d => d[1]);
        const arc = d3.arc().innerRadius(0).outerRadius(Math.min(width, height) / 2 - 10);

        function updateChart(datasetIndex) {
            const paths = svg.selectAll("path")
            .data(pie(data[datasetIndex]), d => d.data[0]);

            paths.enter().append("path")
            .attr("fill", (d, i) => color(i))
            .attr("d", arc)
            .on("mouseover", function(d) {
                d3.select(this).attr("fill", "orange"); // Change color on hover
                d3.select("#chartDescription").text(d.data[0][0] + ": " + d.data[1] + " - " + d.data[0].description); // Display description
            })
            .on("mouseout", function(d, i) {
                d3.select(this).attr("fill", color(i)); // Restore original color on mouseout
                d3.select("#chartDescription").text(""); // Clear description
            })
            .merge(paths)
            .transition()
            .duration(750)
            .attrTween("d", arcTween);

            paths.exit().remove();

            function arcTween(a) {
                const i = d3.interpolate(this._current, a);
                this._current = i(0);
                return (t) => arc(i(t));
            }
        }

    // Initial chart display
        updateChart(currentDatasetIndex);

      // Corrected event listener attachment using ID selectors
        document.getElementById("dataset1").addEventListener("click", () => {
          currentDatasetIndex = 0;
          updateChart(currentDatasetIndex);
      });

        document.getElementById("dataset2").addEventListener("click", () => {
          currentDatasetIndex = 1;
          updateChart(currentDatasetIndex);
      });


    });