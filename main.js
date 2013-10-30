
$(document).ready(function(){
  // init date
  var initDate = new Date();

  // check if hash has date selected
  if (window.location.hash.split("?")[1]) {
    var day = window.location.hash.split("day=")[1].split("&")[0],
      month = window.location.hash.split("month=")[1].split("&")[0] ,
      year = window.location.hash.split("year=")[1].split("&")[0];

    initDate = new Date(year,month-1,day);
  }
  // set date-picker
  $("#date-ini").val( formatDate(initDate) );

  checkURL();
  $('.navigation li a').click( function (e) {
    this.hash= checkURL(this.hash);
    $(".navigation").find(".selected").removeClass("selected");
    $(this).parent().addClass("selected");
  });

  $("#date-ini").change( function (e) {
    this.hash= checkURL("#historico");
    $(".navigation").find(".selected").removeClass("selected");
    $(".navigation li a").last().addClass("selected");
  });

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
  if (hash==="") {
    window.location.hash = "#mediciones";
  } else if (hash.split("?")[0]==="#historico") {
    var myDate=$("#date-ini").val().split("-"),
        queryString= "?"+"day="+ myDate[2] +"&month="+ myDate[1] +"&year="+ myDate[0];
    hash = "#historico" + queryString;
  }
  loadPage(hash);

  return hash;
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
  var file, url, queryString;

  // routing
  if (hash.split("?")[0] === "#historico") {
    var myDate=$("#date-ini").val().split("-");
    queryString= encodeURIComponent("day="+ myDate[2] +"&month="+ myDate[1] +"&year="+ myDate[0]);

    file ="./pages/historico.html";
    url ="historico";
  } else if (hash==="#mediciones") {
    file ="./pages/mediciones.html";
    url ="mediciones";
    queryString="";
  } else if (hash==="#clima") {
    file ="./pages/clima.html";
    url ="clima";
    queryString ="";
  } else if (hash==="#polen") {
    file ="./pages/polen.html";
    url ="polen";
    queryString ="";
  }

  $.ajax({
      url: "http://airebahia.zz.mu/serviceCall.php?url="+ url +"&query="+ queryString,
      type: 'GET',
      //dataType: "json",
      success: function( response ){
        // get json data and callback
        callback(file, response);
      },
      error: function(xhr, textStatus, errorThrown){
        console.log(textStatus + ":" + errorThrown);
      }
  });

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

