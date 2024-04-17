
// Embedding JSON data directly into the script
const jsonData = [
    {"Decade": 1870, "Class A": 1.0, "Class B": 0.0, "Class C": 0.0},
    {"Decade": 1890, "Class A": 0.0, "Class B": 1.0, "Class C": 0.0},
    {"Decade": 1900, "Class A": 0.0, "Class B": 0.0, "Class C": 1.0},
    {"Decade": 1910, "Class A": 0.0, "Class B": 1.0, "Class C": 0.0},
    {"Decade": 1920, "Class A": 0.2, "Class B": 0.6, "Class C": 0.2},
    {"Decade": 1930, "Class A": 0.2, "Class B": 0.8, "Class C": 0.0},
    {"Decade": 1940, "Class A": 0.6666666667, "Class B": 0.3333333333, "Class C": 0.0},
    {"Decade": 1950, "Class A": 0.71875, "Class B": 0.28125, "Class C": 0.0},
    {"Decade": 1960, "Class A": 0.671875, "Class B": 0.3125, "Class C": 0.015625},
    {"Decade": 1970, "Class A": 0.6086142322, "Class B": 0.3820224719, "Class C": 0.0093632959},
    {"Decade": 1980, "Class A": 0.5784982935, "Class B": 0.4027303754, "Class C": 0.0187713311},
    {"Decade": 1990, "Class A": 0.595084088, "Class B": 0.3945666235, "Class C": 0.0103492885},
    {"Decade": 2000, "Class A": 0.4382165605, "Class B": 0.5611464968, "Class C": 0.0006369427},
    {"Decade": 2010, "Class A": 0.3618042226, "Class B": 0.6381957774, "Class C": 0.0},
    {"Decade": 2020, "Class A": 0.3225806452, "Class B": 0.6774193548, "Class C": 0.0}
    ];

// Using the embedded data directly
const data = jsonData;

// Dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 70, left: 80},
width = 800 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

// Append the svg object to the div called 'heatmap'
const svg = d3.select("#heatmap").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

// Labels of row and columns
const myGroups = ["Class A", "Class B", "Class C"];
const myVars = data.map(d => d.Decade.toString()); // Decades

// Build X scales and axis
const x = d3.scaleBand()
.range([0, width])
.domain(myGroups)
.padding(0.05);
svg.append("g")
.attr("transform", `translate(0, ${height})`)
.call(d3.axisBottom(x).tickSize(0))
.select(".domain").remove();

// Build Y scales and axis
const y = d3.scaleBand()
.range([height, 0])
.domain(myVars)
.padding(0.05);
svg.append("g")
.call(d3.axisLeft(y));

// Build color scale - from red to blue
const myColor = d3.scaleLinear()
.range(["red", "blue"])
.domain([0,1]);

// Define a function to create squares and text for each class
const createSquaresAndText = (className) => {
    svg.selectAll(`.${className}-cell`)
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(className))
    .attr("y", d => y(d.Decade.toString()))
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", d => myColor(d[className]))
    .attr("class", `${className}-cell`);

    svg.selectAll(`.${className}-text`)
    .data(data)
    .enter()
    .append("text")
    .text(d => d[className].toFixed(2))
    .attr("x", d => x(className) + x.bandwidth() / 2)
    .attr("y", d => y(d.Decade.toString()) + y.bandwidth() / 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "central")
    .attr("class", `${className}-text value-text`);
};

// Create squares and text for each class
createSquaresAndText("Class A");
createSquaresAndText("Class B");
createSquaresAndText("Class C");