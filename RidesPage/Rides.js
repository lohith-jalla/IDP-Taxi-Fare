// const cors = require('cors');
// app.use(cors());

// async function getata(){

//     const source=document.getElementById('source').value;
//     const destination=document.getElementById('destination').value;

//     var sourceLat=0.0;
//     var destinationLat=0.0;
//     var sourceLong=0.0;
//     var destinationLong=0.0;
//     getLatLong(source).then(coords => {
//         if (coords) {
//             sourceLat=coords.latitude;
//             sourceLong=coords.longitude;
//             // console.log('Latitude:', coords.latitude);
//             // console.log('Longitude:', coords.longitude);
//         } 
//     });

//     getLatLong(destination).then(coords => {
//         if (coords) {
//             destinationLat=coords.latitude;
//             destinationLong=coords.longitude;
//             // console.log('Latitude:', coords.latitude);
//             // console.log('Longitude:', coords.longitude);
//         } 
//     });
 
//     const data = {
//         source:{
//             S_lat:sourceLat,
//             S_long:sourceLong
//         },
//         destination:{
//             D_lat:destinationLat,
//             D_long:destinationLong
//         }
//     }

//     const payload  ={
//         data : data
//     }

//     try {
//         const response = await fetch('http://localhost:3005/Rides', {
//             method: 'post', 
//             headers: {
//                 'Content-Type': 'application/json'  
//             },
//             body: JSON.stringify(payload)  
//         });

//         var result = await response.json();
//         if (response.ok) {
//             console.log(result)
//             alert('found');
//         } else {
//             alert('not found');
//         }
//     } catch (error) {
//         alert('Error occured');
//     }
// }


// async function getLatLong(place) {
//     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;

//     try {
//         const response = await fetch(url);
        
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
        
//         const data = await response.json();
        
//         if (data && data.length > 0) {
//             const latitude = data[0].lat;
//             const longitude = data[0].lon;
//             return { latitude, longitude };
//         } else {
//             throw new Error("Place not found.");
//         }
//     } catch (error) {
//         console.error('Error:', error.message);
//         return null;
//     }
// }


async function getata() {
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;

    try {
        // Wait for both source and destination coordinates using Promise.all
        const [sourceCoords, destinationCoords] = await Promise.all([
            getLatLong(source),
            getLatLong(destination)
        ]);

        // Prepare data object with the retrieved coordinates
        const data = {
            source: {
                S_lat: sourceCoords ? sourceCoords.latitude : 0.0,
                S_long: sourceCoords ? sourceCoords.longitude : 0.0
            },
            destination: {
                D_lat: destinationCoords ? destinationCoords.latitude : 0.0,
                D_long: destinationCoords ? destinationCoords.longitude : 0.0
            }
        };

        const payload = {
            data: data
        };

        // Perform the POST request to the backend
        const response = await fetch('http://localhost:3005/Rides', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            console.log(result);
            alert('Ride found!');
        } else {
            alert('Ride not found.');
        }
    } catch (error) {
        console.error('Error occurred:', error.message);
        alert('Error occurred');
    }
}

// Function to get latitude and longitude of a place using Nominatim API
async function getLatLong(place) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.length > 0) {
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            return { latitude, longitude };
        } else {
            throw new Error("Place not found.");
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}


