document.addEventListener("DOMContentLoaded", function() {
    d3.json('fourth_data.json').then(function(rawData) {
        const chartContainer = d3.select("#chartContainer4"); // Selecting the chart container
        const containerRect = chartContainer.node().getBoundingClientRect();
        const width = containerRect.width - 100;
        const height = containerRect.height - 100; // Adjust height to fit within container

        // Set dimensions for the SVG and margins for the fourth chart
        var svgWidth4 = width;
        var svgHeight4 = height; // Set the height directly here
        var margin4 = { top: 60, right: 20, bottom: 90, left: 100 };
        var width4 = svgWidth4 - margin4.left - margin4.right;
        var height4 = svgHeight4 - margin4.top - margin4.bottom;

        // Append SVG element to 'chartContainer4' and configure it fully here
        var svg4 = chartContainer.append('svg')
            .attr('width', svgWidth4)
            .attr('height', svgHeight4)
            .append('g')
            .attr('transform', `translate(${margin4.left}, ${margin4.top})`);

        // Create scales and axes for the fourth chart
        var x4 = d3.scaleBand()
            .range([0, width4])
            .domain(countsArray4.map(function(d) { return d.group; }))
            .padding(0.1);

        var y4 = d3.scaleLinear()
            .range([height4, 0])
            .domain([0, d3.max(countsArray4, function(d) { return d.count; })]);

        // Append axes and labels
        svg4.append('g')
            .attr('class', 'axis-x')
            .attr('transform', `translate(0, ${height4})`)
            .call(d3.axisBottom(x4));

        svg4.append('text')
            .attr('x', width4 / 2)
            .attr('y', height4 + margin4.bottom / 2)
            .style('text-anchor', 'middle')
            .text('Group');

        svg4.append('g')
            .attr('class', 'axis-y')
            .call(d3.axisLeft(y4));

        svg4.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin4.left + 20)
            .attr('x', 0 - (height4 / 2))
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('Count');

        // Append bars
        svg4.selectAll('.bar')
            .data(countsArray4)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x4(d.group))
            .attr('y', d => y4(d.count))
            .attr('width', x4.bandwidth())
            .attr('height', d => height4 - y4(d.count))
            .attr('fill', 'lightblue');

        // Append title
        svg4.append('text')
            .attr('x', width4 / 2 - 20)
            .attr('y', 0 - (margin4.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '16px')
            .text('Distribution of People Count by Group');
     });
});
