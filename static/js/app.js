//Function to build demographic data table
function buildChartsTable(SID) {
  //console.log(typeof metadatum);

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
    //Was there an easier way to do that? Nested forEach?

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
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          sizemode: "area",
          colorscale: "Earth",
          color: otu_ids,
        },
      },
    ];

    var layout = {
      showlegend: false,
      height: 600,
      area: 600,
      xaxis: {
        title: {
          text: `OTU Labels for Subject ${SID}`,
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        },
      },
    };

    
    //Plot both charts
    Plotly.newPlot("bar", barData);
    Plotly.newPlot("bubble", bubbleData, layout);

    //Select Demographic data box
    var demoInfo = d3.select("#sample-metadata");
    //Populate Demographic Box
    //First, grab appropriate metadata
    var metadata = data.metadata; //create value to capture whole samples object from data
    //return appropriate sample object from within samples
    SID = parseInt(SID); //Convert string SID to INT to work with metadata (where ID is an INT)
    function filterMetaData_Values(metadata) {
      return metadata.id === SID;
    }
    var metadatum = metadata.filter(filterMetaData_Values)[0];
    var wfreq = metadatum.wfreq;
    console.log(wfreq)
    demoInfo.html("");
    Object.entries(metadatum).forEach(([key, value]) => {
      demoInfo.append("p").text(`${key.toUpperCase()}: ${value}`);
    });

    //Gauge chart
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: { text: "Belly Button Washing Frequency (per week)" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "darkblue" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 5], color: "cyan" },
            { range: [5, 9], color: "royalblue" }
          ]
        }
      }
    ];
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', gaugeData, layout);
  });
}

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
}

//Event handler to listen for option selection
//d3.selectAll("#selDataset").on("change", buildChartsTable);

//Init function to populate dropdown with UID #s
initDashboard();
