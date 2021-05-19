'use strict';

$(document).ready(() => {
$("#submitButton").click((e) => {
//$("#submitButton").click(() => {
//$("#searchBox").keyup((e) => {
	e.preventDefault();
  const search = $("#searchBox").val().split(' ').join('_');

  $.ajax({
  type: 'GET',
  url : "http://api.wunderground.com/api/888ec46a5e0bc6eb/geolookup/conditions/q/ca/"+ search +".json",
  dataType : "jsonp",
  success : (parsed_json) => {
  const location = parsed_json['location']['city'];
  const weather = parsed_json['current_observation']['weather'];
  const temp_c = parsed_json['current_observation']['temp_c'];
  const feelsLike = parsed_json['current_observation']['feelslike_c'];
  const windSpeed = parsed_json['current_observation']['wind_mph'];
  const uv = parsed_json['current_observation']['UV'];
  const humidity = parsed_json['current_observation']['relative_humidity'];
  const windDirection = parsed_json['current_observation']['wind_dir'];
  const pressure = parsed_json['current_observation']['pressure_mb'];
  const visibility = parsed_json['current_observation']['visibility_km'];
  const weatherImage = parsed_json['current_observation']['weather'].toLowerCase().split(' ').join('');
 
 //if(parsed_json['location']['city'] ==="undefined") {
 //	$("weatherApp").text("Help!!!");
 //}

$("#showWeather").html('<input id="showHourlyWeather" type="submit" value="Hourly Weather"/>');

$('#showHourlyWeather').click(() => {

	$('#hourlyForecast').toggle();

  $.getJSON('http://api.wunderground.com/api/888ec46a5e0bc6eb/hourly/q/'+ search +".json", (resp) => {
    $.each(resp.hourly_forecast, function(){
        logTime(this); 
        logImage(this);
        time(this.temp);      
    });

});

const logTime = (obj) => {
    $('#hourlyForecast').append('<div id = "date">' + obj.FCTTIME.weekday_name + ' ' +  obj.FCTTIME.civil + '</div>');
}

const logImage = (obj) => {
	$('#hourlyForecast').append('<div id = "image"><img src="'+obj.icon_url+'"/></div>');
}

function time(obj){
    $('#hourlyForecast').append('<div id = "temp">' + obj.english + '</div>');
}
});

  $("#weather h1").text(location);
  $("#weather p").text(weather);
  $("#weatherImage").html('<img src="https://icons.wxug.com/i/c/k/' + weatherImage + '.gif">');
  $("#temperature h2").text(temp_c + " C");
  $("#feelsLike h3").text("Feels Like");
  $("#feelsLike p").text(feelsLike + " C");
  $("#windSpeed h3").text("Wind");
  $("#windSpeed p").text(windDirection + " " + windSpeed + " mph");
  $("#uv h3").text("UV Index");
  $("#uv p").text(uv);
  $("#humidity h3").text("Humidity");
  $("#humidity p").text(humidity);
  $("#pressure h3").text("Pressure");
  $("#pressure p").text(pressure + " hPa");
  $("#visibility h3").text("Visibility");
  $("#visibility p").text(visibility + " km");
  
   },

	//error:() => {
	//$("#weather").empty();
	//alert('Fail to make cross domain request');
  //}
});
//});

$("#showTenDayWeather").html('<input id="showTenDay" type="submit" value="10 Day Forecast"/>');
$('#showTenDay').click(() => {

 $('#tenDayForecast').toggle();

$.ajax({
  url: 'http://api.wunderground.com/api/888ec46a5e0bc6eb/forecast10day/q/ca/'+ search +'.json',
  dataType : "jsonp",
  success : (parsed_json) => {
         for(const some in parsed_json.forecast.txt_forecast.forecastday){
          $("#tenDayForecast").append("<b>"+parsed_json.forecast.txt_forecast.forecastday[some].title+" </b><br>"+ parsed_json.forecast.txt_forecast.forecastday[some].fcttext_metric+"<br><br>");                              
 
      }
    }
  });
});

  $.ajax({
    url: 'http://api.wunderground.com/api/888ec46a5e0bc6eb/astronomy/q//ca/'+ search +'.json',
    dataType: "jsonp",
    success: (parsed_json) => {

        const currentTime = parsed_json['moon_phase']['current_time']['hour'] + ":" + parsed_json['moon_phase']['current_time']['minute'];
        const sunrise = parsed_json['moon_phase']['sunrise']['hour'] + ":" + parsed_json['moon_phase']['sunrise']['minute'];
        const sunset = parsed_json['moon_phase']['sunset']['hour'] + ":" + parsed_json['moon_phase']['sunset']['minute'];

        $('#time h3').text("Current Time");
        $("#time p").text(currentTime);

        $("#sunrise h3").text("Sunrise");
        $("#sunrise p").text(sunrise);

        $("#sunset h3").text("Sunset");
        $("#sunset p").text(sunset);      


      if (currentTime <= sunset ){

          $("#weatherApp").css('background', '#1e90ff');

         //$("#weatherApp").css({"border-color": "#fff", 
            // "border-width":"1px", 
            // "border-style":"solid"});
      
      } else if (currentTime >= sunset){
          $("#weatherApp").css('background', '#14172e');

      }
    }
    });
});
});

