var default_content="";

$(document).ready(function(){

	checkURL();
	$('.navigation li a').click(function (e){
		checkURL(this.hash);
		$(".navigation").find(".selected").removeClass("selected");
		$(this).addClass("selected");
	});

	setInterval("checkURL()",250);

});

var lasturl="";

function checkURL(hash) {
	if(!hash) hash = window.location.hash;
	if (hash==="") hash = "#mediciones";

	if(hash !== lasturl) {
		lasturl=hash;
		// FIX - if we've used the history buttons to return to the homepage,
		loadPage(hash);
	}
}

// given a hash, retruns a filename and data object
function route(hash, callback) {
	var file, url;

	// routing
	if (hash === "#historico") {
		file = "./pages/historico.html";
		url = "";
	} else {
		file = "./pages/mediciones.html";
		url = "http://air-monitor.appspot.com/resources/air-sample";
	}

	$.getJSON(
		url,
		function( response ){
			// get json data and callback
			callback(file, response);
		}
	);

}

// content manager
function loadPage(hash)
{
	$(".loading").show();
	this.route(
		hash,
		//callback when got json data and page
		function (file, data) {
			$('<div>').load(
				file,
				function(response) {
					$(".loading").hide();
					return $(".pageContent").html($(this).html(_.template(response, data)));
			});
	});
}

