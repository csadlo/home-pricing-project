// Show that we've loaded the JavaScript file
console.log("Loaded main.js");

// The current presentation mode saved as a global variable
var current_mode = 'home';

// The current set of hurricane json data retrieved from the server
var current_data = [];

// Select the input elements
var latitudeInputElement = d3.select("#latitudeform");
var longitudeInputElement = d3.select("#longitudeform");
var yearInputElement = d3.select("#yearform");
var sqftlivingInputElement = d3.select("#sqftlivingform");
var floorsInputElement = d3.select("#floorsform");
var sqftaboveInputElement = d3.select("#sqftaboveform");
var sqftbasementInputElement = d3.select("#sqftbasementform");
var sqftlotInputElement = d3.select("#sqftlotform");
var bedroomsInputElement = d3.select("#bedroomsform");
var bathroomsInputElement = d3.select("#bathroomsform");
var conditionInputElement = d3.select("#conditionform");
var gradeInputElement = d3.select("#gradeform");

// Select the button
var search_button = d3.select("#search-btn");

search_button.on("click", handleFeatureChange);


// NOTE: UPDATE THIS FOR FILTER BAR CHANGES
function GetFeatureBarInputValues()
{
    console.log("Entering GetFeatureBarInputValues()");

    dict = {};
    dict["latitude"]     = latitudeInputElement.property("value");
    dict["longitude"]    = longitudeInputElement.property("value");
    dict["year"]         = yearInputElement.property("value");
    dict["sqftliving"]   = sqftlivingInputElement.property("value");
    dict["floors"]       = floorsInputElement.property("value");
    dict["sqftabove"]    = sqftaboveInputElement.property("value");
    dict["sqftbasement"] = sqftbasementInputElement.property("value");
    dict["sqftlot"]      = sqftlotInputElement.property("value");
    dict["bedrooms"]     = bedroomsInputElement.property("value");
    dict["bathrooms"]    = bathroomsInputElement.property("value");
    dict["condition"]    = conditionInputElement.property("value");
    dict["grade"]        = gradeInputElement.property("value");

    console.log("Exiting GetFeatureBarInputValues()");

    return dict;
}


// Function to handle changes to the search criteria
// NOTE: UPDATE THIS FOR FILTER BAR CHANGES
function handleFeatureChange(event) {

    console.log("Entering handleFeatureChange(): Flying is for droids.");

    // Prevent the page from refreshing
    //d3.event.preventDefault();

    var filteredData = [];

    // Returns a dictionary of the filter bar values
    inputs = GetFeatureBarInputValues();

    latitudeform_value = inputs["latitude"];  // could be "ALL" or could be a specific value
    longitudeform_value = inputs["longitude"];  // could be "ALL" or could be a specific value
    yearform_value = inputs["year"];  // could be "ALL" or could be a specific value
    sqftlivingform_value = inputs["sqftliving"];  // could be "ALL" or could be a specific value
    floorsform_value = inputs["floors"];  // could be "ALL" or could be a specific value
    sqftaboveform_value = inputs["sqftabove"];  // could be "ALL" or could be a specific value
    sqftbasementform_value = inputs["sqftbasement"];  // could be "ALL" or could be a specific value
    sqftlotform_value = inputs["sqftlot"];  // could be "ALL" or could be a specific value
    bedroomsform_value = inputs["bedrooms"];  // could be "ALL" or could be a specific value
    bathroomsform_value = inputs["bathrooms"];  // could be "ALL" or could be a specific value
    conditionform_value = inputs["condition"];  // could be "ALL" or could be a specific value
    gradeform_value = inputs["grade"];  // could be "ALL" or could be a specific value

    // Assemble the search URL to match the search bar filters selected
    var search_url = "/predict_NN_price?";
    var num_params = 0;

    if (latitudeform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("lat=");
        search_url = search_url.concat(latitudeform_value);
        num_params++;
    }

    if (longitudeform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("long=");
        search_url = search_url.concat(longitudeform_value);
        num_params++;
    }

    if (yearform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("yr_built=");
        search_url = search_url.concat(yearform_value);
        num_params++;
    }

    if (sqftlivingform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("sqft_living=");
        search_url = search_url.concat(sqftlivingform_value);
        num_params++;
    }

    if (floorsform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("floors=");
        search_url = search_url.concat(floorsform_value);
        num_params++;
    }

    if (sqftaboveform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("sqft_above=");
        search_url = search_url.concat(sqftaboveform_value);
        num_params++;
    }

    if (sqftbasementform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("sqft_basement=");
        search_url = search_url.concat(sqftbasementform_value);
        num_params++;
    }

    if (sqftlotform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("sqft_lot=");
        search_url = search_url.concat(sqftlotform_value);
        num_params++;
    }

    if (bedroomsform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("bedrooms=");
        search_url = search_url.concat(bedroomsform_value);
        num_params++;
    }

    if (bathroomsform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("bathrooms=");
        search_url = search_url.concat(bathroomsform_value);
        num_params++;
    }

    if (conditionform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("condition=");
        search_url = search_url.concat(conditionform_value);
        num_params++;
    }

    if (gradeform_value)
    {
        if (num_params > 0)     // Means we're dealing with multiple parameters
            search_url = search_url.concat("&");

        search_url = search_url.concat("grade=");
        search_url = search_url.concat(gradeform_value);
        num_params++;
    }

    console.log("Constructing Search URL = ", search_url);

    // // Access the database and grab the data matching the requirements
    // d3.json(search_url).then(function (json_data) 
    // {
    //     // Cache the filtered json data so that we can skip running 
    //     // handleFilterChange() during a handleModeChange() event
    //     current_data = json_data;

    //     console.log("Accessing URL:", search_url);
    //     console.log("Database Returns: ", current_data);

    //     UpdatePresentationWindow(current_data);

    //     // Dynamically Update all of the OTHER drop down menus, while maintaining an "ALL" option
    //     UpdateYearDropDownMenu(current_data);
    //     UpdateNameDropDownMenu(current_data);
    //     UpdateDropDownMenu("city", current_data);
    //     UpdateDropDownMenu("country", current_data);
    //     UpdateDropDownMenu("category", current_data);
    //     UpdateDropDownMenu("wind", current_data);
    //     UpdateDropDownMenu("minwind", current_data);
    //     UpdateDropDownMenu("ocean", current_data);
    // });

    console.log("Exiting handleFeatureChange(): Another Happy Landing!");

    return false;
}
