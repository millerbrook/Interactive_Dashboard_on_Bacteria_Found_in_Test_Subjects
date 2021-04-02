// FUNCTION: Build required charts
function buildCharts(UID) {

    var barChart = d3.select("#bar");
    var bubbleChart = d3.select("#bubble");
    var guageChart = d3.select("#guage");

    d3.json("samples.json").then(data => {
        console.log(data)
    })
};

// FUNCTION: Publish population demo
function populateDemoInfo(UID){
    console.log(UID)
}

// FUNCTION: Grab oroper data once event is selected
function optionChanged() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataID = dropdownMenu.property("value");
    // Grab json data related to that variable
    dataset = d3.json("samples.json").samples;
    sample = dataset.forEach(function(){
        dataset.id = dataID;
    });
    console.log(sample);
    buildCharts(UID);
    populateDemoInfo(UID);
}

// FUNCTION: Initialize Dashboard
function initDashboard() {
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(data => {
        var names = data.names;
        names.forEach(UID => {
            dropdown.append("option").text(UID).property("value", UID)
        });
        buildCharts(names[0]);
        populateDemoInfo(names[0]);
    });
};

//Event handler to listen for option selection
d3.selectAll("#selDataset").on("change", optionChanged);

//Init function to populate dropdown with UID #s
initDashboard();