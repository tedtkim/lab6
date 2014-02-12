'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);

	$('#mapBtn').click(getPhotos);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);

	// Make ajax call
	var url = "/project/" + idNumber;
	console.log("URL: " + url);
	$.get(url, projectDetailsCallback)
}

// Callback from project details ajax call
function projectDetailsCallback(result) {
	console.log(result);

	// detailsImage class
	// image, small header with the date, summary

	var detailsHTML = '<img src="' + result['image'] + '"class="detailsImage">' +
		//'<p><small>' + result['date'] + '</small></p>' +
		'<h4>' + result['date'] + '</h4>' +
		result['summary'];


	$("#project"+result['id']+" .details").html(detailsHTML);

	console.log(detailsHTML);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");

	var url = "/palette";
	$.get(url, colorsCallback)
}

// Callback from colors ajax call
function colorsCallback(result) {
	console.log(result);

	var colors = result.colors.hex;
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}

/*
 * Make an AJAX call to get photos from where I'm from
 */
function getPhotos(e) {
	console.log("User clicked on map photos button");

	var url = "http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=1&minx=124&miny=35&maxx=128&maxy=39&size=medium";
	$.get(url, externalCallback, 'jsonp')

}

// Callback for external stretch goal ajax call
function externalCallback(result) {
	console.log(result);
	var detailsHTML = '<h4>Latest Photo From Seoul</h4>' + 
		'<img src="' + result.photos[0].photo_file_url + '"class="detailsImage">' +
		//'<p><small>' + result['date'] + '</small></p>' +
		'<h6>' + result.photos[0].upload_date + '</h4>';


	$("#fromPhotos").html(detailsHTML);
}

