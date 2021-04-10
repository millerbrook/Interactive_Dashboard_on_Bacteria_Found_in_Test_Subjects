BULLET LIST OF TAKS

1. Use the D3 library to read in `samples.json`: DONE

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual: DONE

* Use `sample_values` as the values for the bar chart: DONE == tenSampleValues

* Use `otu_ids` as the labels for the bar chart.DONE == ten_otu_ids

* Use `otu_labels` as the hovertext for the chart. DONE == ten_otu_labels

  ![bar Chart](Images/hw01.png)

3. Create a bubble chart that displays each sample.

* Use `otu_ids` for the x values. DONE == otu_ids

* Use `sample_values` for the y values. DONE == SampleValues

* Use `sample_values` for the marker size. DONE == SampleValues

* Use `otu_ids` for the marker colors. DONE == otu_ids

* Use `otu_labels` for the text values. DONE == otu_labels

![Bubble Chart](Images/bubble_chart.png)

4. Display the sample metadata, i.e., an individual's demographic information. DONE

5. Display each key-value pair from the metadata JSON object somewhere on the page. DONE == in Demographic Info

![hw](Images/hw03.png)

6. Update all of the plots any time that a new sample is selected. DONE: sample selection updates

Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown below:

## Advanced Challenge Assignment (Optional)

The following task is advanced and therefore optional.

* Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of the individual. DONE: ON INSTRUCTOR ADVICE, ADDED PLOTLY GAUGE, WHICH LOOKS DIFFERENT

* You will need to modify the example gauge code to account for values ranging from 0 through 9. DONE WITH RANGE TO 9

* Update the chart whenever a new sample is selected. DONE == IT UPDATES

## Deployment

* Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo.

* Ensure your repository has regular commits (i.e. 20+ commits) and a thorough README.md file
