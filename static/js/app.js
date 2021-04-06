// FUNCTION: Build required charts
function buildCharts(sample) {
    let barValues = sample.sample_values;
    let barLabels = sample.otu_ids;
    let barHoverText = sample.otu_labels;
    let bubbleX = sample.otu_ids;
    let bubbleY = sample.sample_values;
    let bubbleMV = sample.sample_values;
    let bubbleMC = sample.otu_ids;
    let bubbleTXT = sample.otu_labels;
    var barChart = d3.select("#bar");
    var bubbleChart = d3.select("#bubble");
    var guageChart = d3.select("#guage");

    d3.json("samples.json").then(data => {
        console.log(data)
    })
};

// FUNCTION: Publish population demo
function populateDemoInfo(sample){
    //console.log(sample)
}

// FUNCTION: Grab oroper data once event is selected
function optionChanged() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataID = dropdownMenu.property("value");
    // Grab json data related to that variable
    d3.json("samples.json").then(function(data){
        let sample = data.samples.filter(wholeSample => wholeSample.id === dataID)[0];
        console.log(sample);
    });
    
    console.log(dataID);
    //buildCharts(sample);
    //populateDemoInfo(dataID);
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