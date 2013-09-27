var default_content="";

$(document).ready(function(){

	checkURL();
	$('ul li a').click(function (e){
		checkURL(this.hash);
	});

	//filling in the default content
	default_content = $('#pageContent').html();

	setInterval("checkURL()",250);

});

var lasturl="";

function checkURL(hash)
{
	if(!hash) hash=window.location.hash;

	if(hash != lasturl)	{
		lasturl=hash;
		// FIX - if we've used the history buttons to return to the homepage,
		// fill the pageContent with the default_content

		if(hash=="") {
			$('#pageContent').html(default_content);
		} else {
			loadPage(hash);
		}
	}
}

// given a hash, retruns a filename and data object
function route(hash) {
	var file, data;
	// routing
	if (hash === "#mediciones") {
		file = "./pages/page_1.html";
		// dummy data
		data = {
			m1: 1.5,
			m2: 0,
			m3: 0.5
		};
	} else if (hash === "#historico") {
		file = "./pages/page_2.html";
		// dummy data
		data = {
			m1: 1.5,
			m2: 0,
			m3: 0.5
		};
	}

	return {'file': file, 'data': data};
}

function loadPage(hash)
{
	var page = this.route(hash);

	// content manager
	var a = $('<div>').load(
		page.file,
		function(response) {
			return $("#pageContent").html($(this).html(_.template(response, page.data)));
		}
	);
}

