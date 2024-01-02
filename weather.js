let result = document.getElementById('res');
const getAPI = async(lat,lon) => {
    let APIkey = 'dbe87d480de539a5aa17ec9f6754d7bc';
    latlon = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
    const response = await fetch(latlon);
    const data = await response.json();
    return data;
}
function loc(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(x);
        function x(pos) {
            let lat=pos.coords.latitude;
            let lon=pos.coords.longitude;
            getAPI(lat,lon)
                .then(show)
                .catch(err => result.innerHTML='Location was not found')
        }
    }
    else {result.innerHTML="Location is not available";}
    
}

function city(){
    byCity(document.getElementById('c').value)
        .then(show)
        .catch(err => result.innerHTML='Location was not found')
}
const byCity = async(cityName) => {
    let APIkey = 'dbe87d480de539a5aa17ec9f6754d7bc';
    let xy= `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}&units=metric`;
    const response = await fetch(xy);
    const data = await response.json();
    return data;
}
function show(data){
    result.innerHTML=`Temperature: ${data.main.temp}&degC<br>Feels Like: ${data.main.feels_like}&degC<br>You are currently at ${data.name}.`;
    console.log(data);
    initMap(data.coord.lat,data.coord.lon);
    
}
function initMap(latitude, longitude) {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: { lat: latitude, lng: longitude }
    });
  
    new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
      title: "Your Location"
    });
  }
