var lasturl="",
  days;

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
    days = $("#periodo").val();
    var millsDay=86400000,
      tstamp = new Date($("#date-ini").val().split('-')).getTime() + millsDay;

    file = "./pages/historico.html";
    url = "http://air-monitor.appspot.com/resources/air-samples?startTimeMillis="+
        (tstamp - millsDay*days) + "&endTimeMillis=" + tstamp;
  } else {
    file = "./pages/mediciones.html";
    url = "http://air-monitor.appspot.com/resources/air-sample";
  }

  response={
    advice: "Algunos indicadores se encuentran momentaneamente no disponibles en la web municipal.",
    aqiCategory: {pm10:'GREEN', so2:'GREEN', o3:'GREEN', no2:'GREEN', co:'GREEN'},
    co: "GREEN",
    no2: "GREEN",
    o3: "GREEN",
    pm10: "GREEN",
    so2: "GREEN",
    co: 0,
    lastUpdate: 1380826206677,
    no2: 6,
    o3: 27,
    pm10: 6.4,
    pressure: 1020.2,
    so2: 0.9,
    wind: "NE 3,0 km/h"
  };
  callback(file, response);
/*
  $.getJSON(
    url,
    function( response ){
      // get json data and callback
      callback(file, response);
    }
  );*/

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

