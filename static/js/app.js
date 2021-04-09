//Function to build demographic data table
function buildChartsTable(SID) {
  //console.log(typeof metadatum);
  //Select Demographic data box
  var demoInfo = d3.select("#sample-metadata");
  //Read samples.json
  d3.json("samples.json").then((data) => {
    //console.log(`SID: ${SID}`);
    //console.log(data); //Checked -- returns full data object
    var samples = data.samples; //create value to capture whole samples object from data
    //return appropriate sample object from within samples
    function filterSample_Values(samples) {
      return samples.id === SID; //Remember that samples.id must be a string
    }
    var sample = samples.filter(filterSample_Values);
    console.log(sample[0]);

    //Filter functions to get all sample_values, otu_ids, otu_labels for UID (940)
    var sample_values = sample.map((samp) => samp.sample_values)[0];
    var otu_ids = sample.map((samp) => samp.otu_ids)[0];
    var otu_labels = sample.map((samp) => samp.otu_labels)[0];

    //Slice functions to get Top 10 for sample_values, otu_ids, otu_labels for UID (940)
    var tenSampleValues = sample_values
      .sort(function compareFunction(firstNum, secondNum) {
        return secondNum - firstNum;
      })
      .slice(0, 10)
      .reverse();
    //Find index values of ten Sample Values, use to select otu_ids and labels
    data_indexes = [];
    for (let i = 0; i < tenSampleValues.length; i++) {
      for (let j = 0; j < sample_values.length; j++) {
        if (
          sample_values[j] === tenSampleValues[i] &&
          !data_indexes.includes(j)
        ) {
          data_indexes.push(j); //j is the index value of the appropriate sample_values to use to select otu_ids and otu_labels
        }
      }
    }
    //Was there an easier way to do that?

    //Now, make arrays of otu_ids and otu_labels based on the data_indexes (so all three arrays line up)
    ten_otu_ids = [];
    ten_otu_labels = [];
    data_indexes.forEach(function (data_index) {
      ten_otu_ids.push(`OTU ${otu_ids[data_index]}`);
      ten_otu_labels.push(otu_labels[data_index]);
    });

    //Check that everything lines up
    console.log("Ten Sample Values: ");
    console.log(tenSampleValues);
    console.log("Ten Otu Ids: ");
    console.log(ten_otu_ids);
    console.log("Ten Otu Labels: ");
    console.log(ten_otu_labels);

    //Build Horizontal Bar Chart
    var barData = [
      {
        type: "bar",
        y: ten_otu_ids,
        x: tenSampleValues,
        text: ten_otu_labels,
        orientation: "h",
      },
    ];
    //Build Bubble Chart
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        sizemode: "area",
      },
    };
    var bubbleData = [trace1];
    var layout = {
      title: "CLEVER TITLE",
      showlegend: false,
      height: 600,
      area: 600,
    };
    //Plot both charts
    Plotly.newPlot("bar", barData);
    Plotly.newPlot("bubble", bubbleData, layout);

    //Populate Demographic Box
    //First, grab appropriate metadata
    var metadata = data.metadata; //create value to capture whole samples object from data
    //return appropriate sample object from within samples
    SID = parseInt(SID);//Convert string SID to INT to work with metadata (where ID is an INT)
    function filterMetaData_Values(metadata) {
      return metadata.id === SID;
    };
    var metadatum = metadata.filter(filterMetaData_Values)[0];
    console.log("Metadatum: ");
    console.log(typeof metadatum);
    var clear = demoInfo.html("");
    var makeTable = demoInfo.append("table");
    var makeTableBody = makeTable.append("tbody").classed("t-body");
  //remove leftover rows
  var oldRows = d3.select("tbody").selectAll("tr");
  oldRows.remove();
  //Print table
  var printTable = d3.select("tbody");
  //Print table by key and value within each row
  Object.entries(metadatum).forEach(([key, value]) => {
    var row = printTable.append("tr");
    var cell1 = row.append("td");
    cell1.text(key);
    var cell2 = row.append("td");
    console.log(value);
    cell2.text(value);
  });
});


};

// FUNCTION: Initialize Dashboard
function initDashboard() {
    //Select dropdown
    var dropdown = d3.select("#selDataset");
    //Select Demographic data box
    var demoInfo = d3.select("#sample-metadata");
    //Read samples.json
    d3.json("samples.json").then((data) => {
      //grab array of names for dropdown
      var names = data.names;
      names.forEach((UID) => {
        //Create dropdown options by appending each name to text and property attributes of new option
        dropdown.append("option").text(UID).property("value", UID);
        //console.log(typeof(UID))
      });
      //Set UID to first value to build initial plots and table
      var SID = "940";
      //call function to build initial charts and table
      buildChartsTable(SID);
    });
};

    //Event handler to listen for option selection
//d3.selectAll("#selDataset").on("change", buildChartsTable);

//Init function to populate dropdown with UID #s
initDashboard();
