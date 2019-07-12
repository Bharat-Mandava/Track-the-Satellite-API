
//The geolocation is used to point out the users current location, please enable the code if needed!!
//Doc check here https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
// if ("geolocation" in navigator) {
//   console.log('Geolocation is available')
//  // getting the location
//   navigator.geolocation.getCurrentPosition(function(position) {
//   console.log(position.coords);
// });
// } else {
//   console.log('geolocation IS NOT available')
// }


//OpenStreetMap and Leaflet- Creating Map, adding tiles, adding and updating the marker

const mymap = L.map('mapid').setView([51.505, -0.09], 4); //more here https://leafletjs.com/examples/quick-start/

//https://leafletjs.com/reference-1.5.0.html#icon
const myIcon = L.icon({
    iconUrl: 'satellite.png',
    iconSize: [50, 32],
    iconAnchor: [22, 16],
   
});

const marker = L.marker([0 , 0], {icon: myIcon}).addTo(mymap);         // Doc for Marker from Leaflet JS https://leafletjs.com/reference-1.5.0.html#marker

const attributionOSM = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'; //check it here https://www.openstreetmap.org/copyright

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' ; //for variety of tiles(different styles of tiles) check here https://wiki.openstreetmap.org/wiki/Tiles

const maptiles= L.tileLayer(tileUrl, {attributionOSM});
maptiles.addTo(mymap);


let allowZoom = true;
   
   
   //ISS PART
    const satellite_url = 'https://api.wheretheiss.at/v1/satellites/25544'
    async function mySatellite(){   
        const response = await fetch (satellite_url);
        const data = await response.json();
        console.log(data);
        
        const latitude = data.latitude;
        const longitude = data.longitude;

           
                 marker.setLatLng([latitude, longitude])
                 
            if (allowZoom) {
                 mymap.setView([latitude, longitude], 4)
                 allowZoom = false;

            }
       
        document.getElementById('lat').textContent = latitude.toFixed(2);
        document.getElementById('lon').textContent = longitude.toFixed(2);
        
        
        // const coordinateUrl = `https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`;
        const coordinateUrl = `https://api.wheretheiss.at/v1/coordinates/37.795517,-122.393693`;
        


        async function satellitecountry () {
            const satelliteresponse = await fetch (coordinateUrl);
            const satellitedata = await satelliteresponse.json();
             console.log(satellitedata.country_code)
            const countryCode = satellitedata.country_code;
            document.getElementById('countrycode').textContent = countryCode;
        }
        satellitecountry()

       
        }
    


   
    const reposition = ( ) => allowZoom = true;
    
     mySatellite()
   
    // To track the position of Satellite from time to time or stop the app from tracking the satellite location, adjust the time(in milliseconds) and enable/disable the setInterval method below
    // setInterval(mySatellite, 1000);
