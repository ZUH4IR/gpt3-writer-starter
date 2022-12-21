import Head from 'next/head';
import Image from 'next/image';
import ZLlogo from '../assets/ZL-Logo-White.png';
import { useState } from 'react';

const getLocation = async () => {
  const locationData = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}`);
        console.log(`Longitude: ${longitude}`);
        resolve({ latitude, longitude });  // Pass the location data to the resolve function
      },
      (error) => {
        console.error(error);  // Log the error to the console
        reject(error);  // Pass the error to the reject function
      }
    );
  });

  // const apiKey = "" // process.env.GOOGLE_MAPS_API_KEY;
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationData.latitude},${locationData.longitude}&key=${apiKey}`;
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   // return (url);
  //   return data.results[5].formatted_address

  const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${locationData.latitude}&lon=${locationData.longitude}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    // return (url);
    return url

  // async function getCurrentWeather(latitude, longitude) {
  //   const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
  //   const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  //   try {
  //     const response = await fetch(url);
  //     if (response.status !== 200) {
  //       throw new Error("Error while fetching data");
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
};

getLocation().then((location) => {
  console.log(location);  // Log the location data to the console
});

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Outfit Picker | Fits</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
          <h1>Outfit Picker</h1>
          </div>
          <div className="header-subtitle">
            <h2>Pick an outfit depending on the weather</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="start typing here"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
        </div>
      <div className="badge-container grow">
        <a
          // href="https://zuhair.io"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={ZLlogo} alt="zl logo" />
            <p></p>
          </div>
        </a>
      </div>
    </div>
    </div>
  );
};

export default Home;