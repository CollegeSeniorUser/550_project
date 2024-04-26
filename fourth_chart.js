 document.addEventListener("DOMContentLoaded", function() {
    d3.json('fourth_data.json').then(function(rawData) {
        const chartContainer = d3.select("#charlotte"); // Selecting the chart container
        const containerRect = chartContainer.node().getBoundingClientRect();
        const width = containerRect.width - 100;
        const height = containerRect.height - 80; // Adjust height to fit within container

        const svg = chartContainer.append("svg") // Appending SVG to the chart container
        .attr("width", width + 60)
        .attr("height", height + 60)
        .append("g")
        .attr("transform", `translate(50,30)`);

        const margin = {top: 15, right: 20, bottom: 60, left: 50};
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        let data = rawData.filter(d => d['State Population'].trim() !== "")
        .map(d => ({...d, 'State Population': +d['State Population']}));

        const binSize = 5000000;
        let countsPerMillion = {};
        data.forEach(d => {
            const roundedPop = Math.floor(d['State Population'] / 1000000) * 1000000;
            countsPerMillion[roundedPop] = (countsPerMillion[roundedPop] || 0) + 1;
        });

        let piecewiseData = [];
        for (let pop = 0; pop <= d3.max(data, d => d['State Population']); pop += binSize) {
            piecewiseData.push({
                population: pop,
                count: countsPerMillion[pop] || 0
            });
        }

        const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d['State Population'])])
        .range([0, width]);

        const y = d3.scaleLinear()
        .domain([0, d3.max(Object.values(countsPerMillion))])
        .range([height, 0]);

        const line = d3.line()
        .x(d => x(d.population))
        .y(d => y(d.count));

        piecewiseData.forEach((d, i) => {
            if (i < piecewiseData.length - 1) {
                const nextD = piecewiseData[i + 1];
                g.append("path")
                .datum([d, nextD])
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", line);
            }
        });

        g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format(".0s")));

        g.append("g")
        .call(d3.axisLeft(y));

        g.append("text")
        .attr("text-anchor", "end")
        .attr("x", width / 2 + margin.left)
         .attr("y", height + margin.top + 10) // Move title slightly upward
         .text("State Population");

         g.append("text")
         .attr("text-anchor", "end")
         .attr("transform", "rotate(-90)")
         .attr("y", -margin.left + 20)
         .attr("x", -margin.top - height / 2 + 20)
         .text("Count of Sightings");

         g.append("text")
         .attr("text-anchor", "middle")
         .attr("x", width / 2 + margin.left)
         .attr("y", margin.top / 3) // Move title slightly upward
         .style("font-size", "15px")
         .text("Relationship between state populations and the number of bigfoot sightings (Linear Piecewise)");
     });
});