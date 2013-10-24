var lasturl="";

$(document).ready(function(){

  checkURL();
  $('.navigation li a').click(function (e){
    checkURL(this.hash);
    $(".navigation").find(".selected").removeClass("selected");
    $(this).addClass("selected");

  });
 // setInterval("checkURL()", 250);

  var today = new Date();
  $("#date-ini").val(formatDate(today));

});

// formats date as yyyy-mm-dd for date input
function formatDate(date){
    var dd = date.getDate(),
      mm = date.getMonth()+1, //January is 0!
      yyyy = date.getFullYear();
      
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;

    return  yyyy+'-'+mm+'-'+dd;
}

function checkURL(hash) {
  if(!hash) hash = window.location.hash;
  if (hash==="") window.location.hash = "#mediciones";

  //if(hash !== lasturl || hash==="#historico") {
    lasturl=hash;
    // FIX - if we've used the history buttons to return to the homepage,
    loadPage(hash);
  //}
}

// content manager
function loadPage(hash)
{
  $(".loading").show();
  this.route(
    hash,
    //callback when got json data and page
    this.onServiceLoaded
  );
}

// given a hash, retruns a filename and data object
function route(hash, callback) {
  var file, url;

  // routing
  if (hash === "#historico") {
    var myDate=$("#date-ini").val().split("-");

    file = "./pages/historico.html";
    url = "http://air-monitor.appspot.com/resources/air-samples?" +
          "day="+ myDate[2] +"&month="+ myDate[1] +"&year="+ myDate[0];
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

function onServiceLoaded(file, data) {
  $('<div>').load(
    file,
    function(response) {
      $(".loading").hide();
      $(".pageContent").html(
        $(this).html(_.template(response, data, {variable: 'data'}))
      );
  });
}

