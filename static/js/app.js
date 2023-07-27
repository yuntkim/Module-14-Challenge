// Function to initialize the page
function init() {
  console.log("The Init() function ran"); // Log that the initialization function is running

  // URL to the JSON data source
  const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

  // Fetch the JSON data
  d3.json(url).then(data => {
    let dropdownNames = data.names; // Extract the names (ids) for the dropdown
    let dropdown = d3.select('#selDataset'); // Select the html element where the dropdown will be located

    // Loop through the array to obtain the ids and append them to the dropdown menu
    for (i = 0; i < dropdownNames.length; i++) {
      dropdown.append("option").text(dropdownNames[i]).property('value', dropdownNames[i]);
    }
  });

  // Call functions to generate plots with default id = 940
  createScatter('940');
  createBar('940');
  createSummary('940');
}

// Function to handle the change event when a new id is selected in the dropdown
function optionChanged(newID) {
  // Update graphics by calling each function with the new id
  createScatter(newID);
  createBar(newID);
  createSummary(newID);
}

// Function to create the bubble chart with the selected id in the dropdown
function createScatter(id) {
  const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

  // Fetch the JSON data
  d3.json(url).then(data => {
    let idData = data.samples.filter(i => i.id == id); // Filter data for the selected id
    let otuIds = idData[0].otu_ids;
    let otuLabels = idData[0].otu_labels;
    let sampleValues = idData[0].sample_values;

    // Prepare the scatter plot data
    let scatterData = [
      {
        y: sampleValues,
        x: otuIds,
        text: otuLabels,
        type: 'scatter',
        mode: 'markers',
        marker: {
          size: sampleValues,  
          sizemode: 'diameter', 
          sizeref: 1.5, 
          sizemin: 1, 
          color: otuIds,
          colorscale: 'YlGnBu' 
        }
      }
    ];

    let layout = {
      title: "All OTUs - My Bellybutton Bacteria",
      xaxis: {
        title: "OTU ID"
      },
      yaxis: {
        title: "Sample Values"
      }
    };

    // Create the bubble chart
    Plotly.newPlot("bubblediv", scatterData, layout);
  });
}

// Function to create the bar chart with the selected id in the dropdown
function createBar(id) {
  const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

  // Fetch the JSON data
  d3.json(url).then(data => {
    let idData = data.samples.filter(i => i.id == id); 

    // Extract data for the bar chart
    let otuIds = idData[0].otu_ids.slice(0, 10).reverse();
    let otuLabels = idData[0].otu_labels.slice(0, 10).reverse();
    let sampleValues = idData[0].sample_values.slice(0, 10).reverse();
    let otuIds_text = otuIds.map(i => `OTU ${i}`);
    let chartData = [
      {
        y: otuIds_text,
        x: sampleValues,
        text: otuLabels,
        type: 'bar',
        orientation: 'h'
      }
    ];

    let layout = {
      title: "My top 10 OTUs - bellybutton bacteria"
    };

    // Create the bar chart
    Plotly.newPlot("bardiv", chartData, layout);
  });
}

// Function to create the summary of the selected id in the dropdown
function createSummary(id) {
  const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

  // Fetch the JSON data
  d3.json(url).then(data => {
    let idData = data.metadata.filter(i => i.id == id);

    // Select the element where the summary will be displayed
    let demographics = d3.select('#sample-metadata');

    // Clear any existing content before appending new information
    demographics.html("");

    // Append the summary information to the 'sample-metadata' element
    demographics.append("p").text(`ID: ${idData[0].id}`);
    demographics.append("p").text(`Ethnicity: ${idData[0].ethnicity}`);
    demographics.append("p").text(`Gender: ${idData[0].gender}`);
    demographics.append("p").text(`Age: ${idData[0].age}`);
    demographics.append("p").text(`Location: ${idData[0].location}`);
    demographics.append("p").text(`Bbtype: ${idData[0].bbtype}`);
    demographics.append("p").text(`Wfreq: ${idData[0].wfreq}`);
  });
}

// Call the init function to run the instructions on page load or refresh
init();
