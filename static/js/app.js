//Grab data and store in global variable
// let dataSet = d3.json("samples.json");
// let metaData = dataSet.metadata
// let samples = dataSet.samples
// console.log(dataSet);
// console.log(metaData);
// console.log(samples);


// // FUNCTION: Build required charts
// function buildCharts(sample) {
//     let barValues = sample.sample_values;
//     let barLabels = sample.otu_ids;
//     let barHoverText = sample.otu_labels;
//     let bubbleX = sample.otu_ids;
//     let bubbleY = sample.sample_values;
//     let bubbleMV = sample.sample_values;
//     let bubbleMC = sample.otu_ids;
//     let bubbleTXT = sample.otu_labels;
//     var barChart = d3.select("#bar");
//     var bubbleChart = d3.select("#bubble");
//     var guageChart = d3.select("#guage");

//     d3.json("samples.json").then(data => {
//         //console.log(data)
//     })
// };

// // FUNCTION: Publish population demo
// // function populateDemoInfo(dataID){
// //     console.log("Data ID in populateDemoInfo");
// //     console.log(dataID);
// //     function filterMetaData(dataID) {
// //         return metaData.id === 940;
// //     }     // Grab json data related to that variable
// //      d3.json("samples.json").then(function(data){
// //         let metaData = data.metadata;
// //         let demoSample = metaData.filter(filterMetaData);
// //         console.log("Metadata Info: ");
// //         console.log(demoSample);
// //      });
// //}

// // FUNCTION: Grab proper data once event is selected
// function optionChanged() {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataID = dropdownMenu.property("value");
//     if (!dataID) {
//         dataID = 940;
//     }
//     d3.json("samples.json").then(data => {
//        dataSet = data;
//        console.log(dataID);
//        function filterData(dataSet) {
//            return parseInt(dataSet.id) === dataID
//        };
//        var filteredData = dataSet.filter(filterData);
//        console.log(filteredData);
//         //buildCharts(names[0]);
//        // populateDemoInfo(names[0]);
//     });
//     // Grab json data related to that variable
//     // var sample = d3.json("samples.json");
    
    // d3.json("samples.json").then(function(data) {
    //     var metaData = data.metadata;
    //         metaData.filter(wholeDemo => wholeDemo.id === 940);
    // })
//     //console.log("Here's sample: ")
//     //console.log(sample);
//     //buildCharts(sample);
//     //populateDemoInfo(dataID);
// }

// FUNCTION: Initialize Dashboard
function initDashboard() {
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(data => {
        var names = data.names;
        names.forEach(UID => { //Create dropdown options by appending each name to text and property attributes of new option
            dropdown.append("option").text(UID).property("value", UID)
        });
        //Set UID to first value to build initial plots and table
        var SID = "940";
        console.log(`SID: ${SID}`);
        console.log(data);//Checked -- returns full data object
        var samples = data.samples //create value to capture whole samples object from data
        //return appropriate sample object from within samples
        function filterSample_Values (samples) {
             return samples.id === SID; //Remember that samples.id must be a string
        };
        var sample = samples.filter(filterSample_Values);
        console.log(sample[0]);

        //Filter functions to get all sample_values, otu_ids, otu_labels for UID (940)
        var sample_values = sample.map(samp => samp.sample_values)[0];
        var otu_ids = sample.map(samp => samp.otu_ids)[0];
        var otu_labels = sample.map(samp => samp.otu_labels)[0];
        
        //Slice functions to get Top 10 for sample_values, otu_ids, otu_labels for UID (940)
        var tenSampleValues = sample_values.sort(function compareFunction(firstNum, secondNum) {return secondNum - firstNum;}).slice(0,10).reverse();
        //Find index values of ten Sample Values, use to select otu_ids and labels
        data_indexes = [];
        for (let i = 0; i < tenSampleValues.length; i++) {
            for (let j = 0; j < sample_values.length; j++) {
                if ((sample_values[j] === tenSampleValues[i]) && (!data_indexes.includes(j))) {
                    data_indexes.push(j); //j is the index value of the appropriate sample_values to use to select otu_ids and otu_labels
                };
            };
        };
        console.log("Data indexes: ");
        console.log(data_indexes);
        console.log("Ten Sample Values: ");
        console.log(tenSampleValues);
        //buildCharts(names[0]);
       // populateDemoInfo(names[0]);
    });
};

//Event handler to listen for option selection
//d3.selectAll("#selDataset").on("change", optionChanged);

//Init function to populate dropdown with UID #s
initDashboard();