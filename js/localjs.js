/* 
 js to retieve bus route from query
 */
console.log("starting...");

//$("document").ready(function() {
//    setTimeout(function() {
//        $("#popup").trigger('click');
//    },10);
//});

(function() {
  var rtpiAPI = "https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=7602&format=json";
  //var data = [];
  console.log(rtpiAPI);
  $.getJSON( rtpiAPI, {
    tags: "7602",
    tagmode: "any",
    format: "json"
  })
    .done(function( data ) {
        console.log(data);
      $.each( data.items, function( i, item ) {
        $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
        if ( i === 3 ) {
          return false;
        }
      });
    });
})();

