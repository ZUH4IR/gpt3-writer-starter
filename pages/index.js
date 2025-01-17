import Head from 'next/head';
import Image from 'next/image';
import ZLlogo from '../assets/ZL-Logo-White.png';
import { useState } from 'react';

const fetchLocationData = () => { // Gets City & Weather
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const gMapsAPI = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const gMapsUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${gMapsAPI}`;
      const gMapsResponse = await fetch(gMapsUrl);
      const gMapsData = await gMapsResponse.json();
      const city = gMapsData.results[5].formatted_address;

      const openWeatherMapAPI = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY;
      const openWeatherMapUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapAPI}`;
      const openWeatherMapResponse = await fetch(openWeatherMapUrl);
      const openWeatherMapData = await openWeatherMapResponse.json();
      const temp = openWeatherMapData.current.temp;
      const weather = openWeatherMapData.current.weather[0].description;

      resolve({ city, temp, weather });
    }, (error) => {
      reject(error);
    });
  });
};

const Home = () => {
  const [userInputDescribe, setUserInputDescribe] = useState('');
  const [userInputActivity, setUserInputActivity] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
  
    console.log("Calling OpenAI...")
  
    try {
      const locationData = await fetchLocationData();
      const { city, temp, weather } = locationData
      console.log(`City: ${city}, Kelvin: ${temp}, Weather: ${weather}`)
  
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInputDescribe, userInputActivity, city, temp, weather }),
      });
  
      const data = await response.json();
      const { output } = data;
      console.log("OpenAI replied...", output.text)
  
      setApiOutput(`${output.text}`);
    } catch (error) {
      console.error(error);
      setApiOutput('Error: Location data could not be retrieved. Please make sure location sharing is enabled for this site.');
    } finally {
      setIsGenerating(false);
    }
  };

  const onUserChangedDescribe = (event) => {
    setUserInputDescribe(event.target.value);
  };
  const onUserChangedAct = (event) => {
    setUserInputActivity(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Outfit Picker | Fits</title>
        <link rel="icon" href="/favicon.ico" />
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
            placeholder="describe yourself ex. 18 year old male, out going"
            className="prompt-box"
            value={userInputDescribe}
            onChange={onUserChangedDescribe}
          />
          <textarea
            placeholder="what are you doing today? ex. fishing, shopping, tennis"
            className="prompt-box"
            value={userInputActivity}
            onChange={onUserChangedAct}
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