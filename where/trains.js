
function initialize() {

	default_loc = new google.maps.LatLng(42.4060089, -71.1169065);
	
	var myOptions = {
		zoom: 13, // The larger the zoom number, the bigger the zoom
		center: default_loc,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		
	my_location = getMyLocation()
	
	myInformation(my_location[0],my_location[1])
	
	waldo_carmen_setup()
	
	red_line()
}

function getMyLocation() {
	lat = 0;
	lng = 0;
	if (navigator.geolocation) {
		// the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude;
			lng = position.coords.longitude;
			console.log("Lat: " + lat);
			console.log("Lon: " + lng);
			
			current_loc = new google.maps.LatLng(lat,lng);
			current_marker = new google.maps.Marker({
				position: current_loc,
				title: "You are here!"
			});
			current_marker.setMap(map);
			
			return (current_loc,current_marker);
		
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function myInformation(me_loc,me_marker)
{

	my_info = "";
	my_info = "Position:" + "<br/>" + "Latitude: " + me_loc.lat() + "<br/>" + "Longitude: " + me_loc.lng();
	
	newInfoWindow(me_marker,my_info);
}


function distance(lat1,lat2,lon1,lon2){
	//DISTANCE BETWEEN TWO POINTS
	var R = 3959; // miles
	var dLat = toRad(lat2-lat1);
	var dLon = toRad(lon2-lon1);
	
	var lat1 = toRad(lat1);
	var lat2 = toRad(lat2);
	var lon1 = toRad(lon1);

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	return (R * c);
}

function midpoint(lat1,lat2,lon1,lon2){
	//MIDPOINT BETWEEN TWO POINTS
	lat1 = toRad(lat1);
	lat2 = toRad(lat2);
	lon1 = toRad(lon1);
	lon2 = toRad(lon2);
	
	var dLon = (lon2 - lon1);
	var Bx = Math.cos(lat2) * Math.cos(dLon);
	var By = Math.cos(lat2) * Math.sin(dLon);
	var lat3 = Math.atan2(Math.sin(lat1)+Math.sin(lat2),
                      Math.sqrt( (Math.cos(lat1)+Bx)*(Math.cos(lat1)+Bx) + By*By ) ); 
	var lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);
	
	lat3 = toDeg(lat3);
	lon3 = toDeg(lon3);
	
	return([lat3,lon3]);
}

function toRad(deg) {
	return (deg * Math.PI / 180);
}

function toDeg(rad){
	return (rad*180/Math.PI);
}

function waldo_carmen_setup(){
	try{
		request = new XMLHttpRequest();
	}
	catch(error){
		error_txt = "Status Code: " + request.status + "\n";
		error_txt+= "Description: " + error.message + "\n";
		console.log(error_txt);
	}
	
	request.onreadystatechange = waldo_carmen;
	request.open("GET","http://messagehub.herokuapp.com/a3.json",true);
	request.send();	
}

function waldo_carmen(){	
	if(this.readyState == this.DONE) 
	{
		if(this.status == 200 && this.responseText != null) 
		{
			var str = this.responseText;
			
			var parsed = JSON.parse(str);
						
			var length = parsed.length;
			var i=0;
			for(i=0; i<length; i++)
			{
				wc_name = parsed[i]['name'];
				wc_lat = parsed[i]['loc']['latitude'];
				wc_lon = parsed[i]['loc']['longitude'];
				wc_note = parsed[i]['loc']['note'];
				
				dist = distance(me_loc.lat(),wc_lat,me_loc.lng(),wc_lon);
				
				wc_note += "<br/>Distance from you = " + dist + " miles.";
				
				var placement = new google.maps.LatLng(wc_lat, wc_lon);
				
				if(wc_name == "Waldo")
				{
					image = "waldo_pic.png";
				}
				else{
					image = "carmen_pic.png";
				}
				
				wc_marker = new google.maps.Marker({
					position: placement,
					title: wc_name,
					icon: image
				});
				
				
				newInfoWindow(wc_marker,wc_note);
				
				wc_marker.setMap(map);
			}
		}
		else{
			console.log("CANNOT LOAD! ARRGHHGHGH!");
		}
	}
}

function newInfoWindow(marker, note) {

	var new_infoWindow = new google.maps.InfoWindow();

	google.maps.event.addListener(marker, 'click', function () {
		new_infoWindow.setContent(note);
		new_infoWindow.open(map, marker);
	});
}


function red_line()
{
	station = new Array();
	station[0] = {'name':'Alewife Station','lat':'42.395428','lon':'-71.142483','key':'RALE'};
	station[1] = {'name':'Davis Station','lat':'42.39674','lon':'-71.121815','key':'RDAV'};
	station[2] = {'name':'Porter Square Station','lat':'42.3884','lon':'-71.119149','key':'RPOR'};
	station[3] = {'name':'Harvard Square Station','lat':'42.373362','lon':'-71.118956','key':'RHAR'};
	station[4] = {'name':'Central Square Station','lat':'42.373362','lon':'-71.103802','key':'RCEN'};
	station[5] = {'name':'Kendall/MIT Station','lat':'42.36249079','lon':'-71.08617653','key':'RKEN'};
	station[6] = {'name':'Charles/MGH Station','lat':'42.361166','lon':'-71.070628','key':'RMGH'};
	station[7] = {'name':'Park St. Station','lat':'42.35639457','lon':'-71.0624242','key':'RPRK'};
	station[8] = {'name':'Downtown Crossing Station','lat':'42.355518','lon':'-71.0600225','key':'RDTC'};
	station[9] = {'name':'South Station','lat':'42.352271','lon':'-71.055242','key':'RSOU'};
	station[10] = {'name':'Broadway Station','lat':'42.342622','lon':'-71.056967','key':'RBRO'};
	station[11] = {'name':'Andrew Station','lat':'42.330154','lon':'-71.057655','key':'RAND'};
	station[12] = {'name':'JFK/UMass Station','lat':'42.320685','lon':'-71.052391','key':'RJFK'};
	station[13] = {'name':'Savin Hill Station','lat':'42.31129','lon':'-71.053331','key':'RSAV'};
	station[14] = {'name':'Fields Corner Station','lat':'42.300093','lon':'-71.061667','key':'RFIE'};
	station[15] = {'name':'Shawmut Station','lat':'42.29312583','lon':'-71.06573796','key':'RSHA'};
	station[16] = {'name':'Ashmont Station','lat':'42.284652','lon':'-71.064489','key':'RASH'};
	station[17] = {'name':'North Quincy Station','lat':'42.275275','lon':'-71.029583','key':'RNQU'};
	station[18] = {'name':'Wollaston Station','lat':'42.2665139','lon':'-71.0203369','key':'RWOL'};
	station[19] = {'name':'Quincy Center Station','lat':'42.251809','lon':'-71.005409','key':'RQUC'};
	station[20] = {'name':'Quincy Adams Station','lat':'42.233391','lon':'-71.007153','key':'RQUA'};
	station[21] = {'name':'Braintree Station','lat':'42.2078543','lon':'-71.0011385','key':'RBRA'};

	
	train_req = new XMLHttpRequest();
	train_req.open("GET","http://mbtamap-cedar.herokuapp.com/mapper/redline.json",false);
	train_req.send();
	
	var str = train_req.responseText;
	
	train_info = JSON.parse(str);
	
	station_locs = new Array();
	
	for(i=0;i<station.length;i++)
	{
		var placement = new google.maps.LatLng(station[i]['lat'],station[i]['lon']);
		
		station_locs[i] = placement;
		
		station_marker = new google.maps.Marker({
			position: placement,
			title: station[i]['name'],
			icon: 'red_line_logo.png'
		});
			
		var arrival_times_note = red_line_info(station[i]);
		
		newInfoWindow(station_marker,arrival_times_note);
		
		station_marker.setMap(map);
		
	}
	
	var line = new google.maps.Polyline({
		path: station_locs,
		strokeColor: 'red'
	});
	
	line.setMap(map);
	
}

function red_line_info(current_station)
{				

	nb_note = "";
	sb_note = "";
	
	var info_length = train_info.length;
	var t=0;
	for(t=0; t<info_length; t++)
	{
		if(train_info[t]['PlatformKey'] == (current_station['key'] + 'N'))
		{
			if(train_info[t]['InformationType'] != "Arrived")
			{
				nb_note += "Arrives in " + train_info[t]['TimeRemaining'] + " minutes." + "<br/>";
			}
		}
		else if(train_info[t]['PlatformKey'] == (current_station['key'] + 'S'))
		{
			if(train_info[t]['InformationType'] != "Arrived")
			{
				sb_note += "Arrives in " + train_info[t]['TimeRemaining'] + " minutes." + "<br/>";
			}
		}
	}
	
	complete_note = current_station['name'] + " Information:" + "<br/><br/>" + "Northbound Train:" + "<br/>" + nb_note + "<br/>" + "Southbound Train:" + "<br/>" + sb_note;
	
	return complete_note;


}
	

	
	
	
	
	