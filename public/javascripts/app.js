var locationsUrl = {
  'Sachin Test 100': 'http://apify.heroku.com/api/sachin_test_100.json?callback=?',
  'Sachin ODI 100': 'http://apify.heroku.com/api/sachin_odi_100.json?callback=?'
}
var info = {
  'Sachin Test 100': 'location.score + " vs " + location.against + " at " + location.location',
  'Sachin ODI 100': 'location.score + " vs " + location.against + " at " + location.location'
}
var map;
var locations = [];

function plot(name){
  var map = new GMaps({
    div: '#map',
    lat: 0,
    lng: 0,
    zoom: 1
  });

  $.getJSON(locationsUrl[name], function(data){
    locations = JSON.parse(data);
    _.each(locations, function(location, index){
      setTimeout(function(){
        GMaps.geocode({
          address: location.location,
          callback: function(results, status) {
            if (status == 'OK') {
              var latlng = results[0].geometry.location;
              map.addMarker({
                lat: latlng.lat(),
                lng: latlng.lng(),
                infoWindow: {
                  content: eval(info[name])
                }
              });
            } else {
              console.log('Unable to locate: ' + location.location);
            }
          }
        });
      }, index*1000);
    });
  });

}
$(function(){
  plot('Sachin Test 100');
  $('#mapName').change(function(){
    plot($(this).val());
  });
});