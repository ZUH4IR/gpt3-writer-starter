// const lat = 33.17364087179997
// const lon = -96.73899922688479

// // function getLocation() {
// //     const apiKey = process.env.GOOGLE_MAPS_API_KEY;
// //       const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;
// //       fetch(url)
// //         .then(response => response.json())
// //         .then(data => {
// //           console.log(data.results[0].formatted_address);
// //         });
// // };

// async function getLocation() {
//   const apiKey = process.env.GOOGLE_MAPS_API_KEY;
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;
//     const response = await fetch(url)
//     console.log('response: ', response)
//     const data = await response.json();
//     console.log('data: ' ,data.results[0].formatted_address);
// };
  
// getLocation();
  
// async function getCurrentWeather(latitude, longitude) {
//     const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=`;
//     try {
//       const response = await fetch(url);
//       if (response.status !== 200) {
//         throw new Error("Error while fetching data");
//       }
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

// //   getCurrentWeather(lat, lon)

// let temp = "0"

// // const getTemperatureByIP = async () => {
// //     const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
// //     const endpoint = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
// //     const response = await fetch(endpoint);
// //     const data = await response.json();
// //     temp = data.main.temp;
// //     return temp;
// //   };

// temp = temp

// const weather = "sunny";
// const location = "San Francisco";

// function buildPrompt(req) {
//     const basePromptPrefix = 
//     `
//         I am ${(req)}

//         Create some possible outfits to wear today; it is ${temp} degrees and ${weather} today in ${location}.

//         Explain to me each of your choices as follows (make sure there is a space between all lines):

//         Outfit 1:
//         Explanation 1:

//         Outfit 2:
//         Explanation 2:
//     `
//     console.log(basePromptPrefix)
// }

// buildPrompt("18 y.o.")

// const getCurrentLocation = () => {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
//         console.log(`Latitude: ${latitude}`);
//         console.log(`Longitude: ${longitude}`);
//       }
//     );
//   });
// };

// async function getLocation() {
//   const apiKey = process.env.GOOGLE_MAPS_API_KEY;
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
//     const response = await fetch(url)
//     console.log('response: ', response)
//     const data = await response.json();
//     const city = (data.results[5].formatted_address);
// };

// getCurrentLocation().then((locationData) => {
//   console.log(locationData);
//   console.log(city)
// });