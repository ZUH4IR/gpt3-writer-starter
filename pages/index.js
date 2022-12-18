import Head from 'next/head';
import Image from 'next/image';
import ZLlogo from '../assets/ZL-Logo-White.png';
import { useState } from 'react';

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}`);
        console.log(`Longitude: ${longitude}`);
      }
    );
  });
};

getCurrentLocation().then((locationData) => {
  console.log(locationData);
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