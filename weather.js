const getAPI = async(lat,lon,part="hourly") => {
    console.log(lon);
    const response = await fetch('https://cors-anywhere.herokuapp.com/'+"https://api.openweathermap.org/weather/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude="+part+"&appid=dbe87d480de539a5aa17ec9f6754d7bc");
    const data = await response.json();
    return data;
}
navigator.geolocation.getCurrentPosition(x);
function x(pos) {
    let lat=pos.coords.latitude;
    let lon=pos.coords.longitude;
    getAPI(lat,lon)
        .then(show)
        .catch(err => console.log(err.message))
}


function show(data){ 
    console.log(data);
    document.getElementById('main').innerHTML=data.main.temp; 
}