// Embedded JSON data for the fourth chart
var data4 = [
  {"group": "2-5", "Multiple Witnesses": "False"},
  {"group": "2-5", "Multiple Witnesses": "True"},
  {"group": "6-10", "Multiple Witnesses": "True"},
  {"group": "11-20", "Multiple Witnesses": "True"},
  {"group": "21-30", "Multiple Witnesses": "False"},
  {"group": "31-40", "Multiple Witnesses": "True"},
  {"group": "41-50", "Multiple Witnesses": "False"},
  {"group": "51-100", "Multiple Witnesses": "True"},
  {"group": ">100", "Multiple Witnesses": "True"},
  {"group": "2-5", "Multiple Witnesses": "True"},
  {"group": "6-10", "Multiple Witnesses": "False"},
  {"group": "11-20", "Multiple Witnesses": "True"},
  {"group": "21-30", "Multiple Witnesses": "True"},
  {"group": "31-40", "Multiple Witnesses": "False"},
  {"group": "41-50", "Multiple Witnesses": "True"},
  {"group": "51-100", "Multiple Witnesses": "False"},
  {"group": ">100", "Multiple Witnesses": "True"}
];

// Calculate the count of each group for the fourth chart
var counts4 = {};
data4.forEach(function(d) {
  counts4[d.group] = (counts4[d.group] || 0) + 1;
});

// Convert counts object to array of objects for the fourth chart
var countsArray4 = Object.keys(counts4).map(function(key) {
  return { group: key, count: counts4[key] };
});

const chartContainer = d3.select("#chartContainer4");
const containerWidth = chartContainer.node().offsetWidth;
const svgWidth4 = containerWidth;
const svgHeight4 = width / 2;
// Set dimensions for the SVG and margins for the fourth chart
//var svgWidth4 = 500;
//var svgHeight4 = 320; // Set the height directly here
var margin4 = { top: 60, right: 20, bottom: 90, left: 100 };
var width4 = svgWidth4 - margin4.left - margin4.right;
var height4 = svgHeight4 - margin4.top - margin4.bottom;

// Append SVG element to 'chartContainer4' and configure it fully here
var svg4 = d3.select('#chartContainer4').append('svg')
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
