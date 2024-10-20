const express = require('express')
const app = express();
const port = 3005;

const cors = require('cors')
app.use(cors())

app.use(express.json())

// Food Section******************************************

const urlFood = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes';
const optionsFood = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '7d4ea70568mshf533f2d36c95d05p1b208bjsn8eeb57519e40',
    'x-rapidapi-host': 'tasty.p.rapidapi.com'
  }
};

async function getFooddata() {
  try {
    const response = await fetch(urlFood, optionsFood);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

app.post("/Food", async (req, res) => {
  const payload = req.body
  console.log(payload)
	const data = await getFooddata();
	
  res.status(200).json({data})
});

// ******************************************************

// Rides Section ******************************************


const urlRides = 'https://taxi-fare-calculator.p.rapidapi.com/search-geo?dep_lat=52.50&dep_lng=13.43&arr_lat=52.47&arr_lng=13.63';

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '7d4ea70568mshf533f2d36c95d05p1b208bjsn8eeb57519e40',
		'x-rapidapi-host': 'taxi-fare-calculator.p.rapidapi.com'
	}
};


async function getRidedata(payload) {

  var sourceLat=payload.source.S_lat;
  var destinationLat=payload.source.S_long;
  var sourceLong=payload.destination.D_lat;
  var destinationLong=payload.destination.D_lat;
  try {
    const response = await fetch(`https://taxi-fare-calculator.p.rapidapi.com/search-geo?dep_lat=${sourceLat}&dep_lng=${sourceLong}&arr_lat=${destinationLat}&arr_lng=${destinationLong}`, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

app.post("/Rides", async (req, res) => {
  const payload = req.body
  console.log(payload)
	const data = await getRidedata(payload);
	
	// const displays=data.journey.fares[0].price_in_cents*0.00472; 
  res.status(200).json({data})
});

// port Listening
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
