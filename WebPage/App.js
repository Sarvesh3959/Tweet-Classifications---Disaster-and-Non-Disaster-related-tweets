import React, { useEffect, useState } from 'react';
import './App.css';

const imagePaths = [
  'Images/1.jpg', 'Images/2.webp', 'Images/3.jpg', 'Images/4.webp',
  'Images/5.webp', 'Images/6.webp', 'Images/7.jpeg', 'Images/8.jpg',
  'Images/9.jpg', 'Images/10.avif', 'Images/11.jpg', 'Images/12.jpg',
  'Images/13.jpg', 'Images/14.jpg', 'Images/15.jpg', 'Images/16.webp',
  'Images/17.webp', 'Images/18.jpg', 'Images/19.jpg', 'Images/20.avif',
  'Images/21.jpg', 'Images/22.jpg', 'Images/23.jpg', 'Images/24.png',
  'Images/25.png', 'Images/26.webp', 'Images/27.webp', 'Images/28.webp',
  'Images/29.jpg', 'Images/30.png', 'Images/31.png', 'Images/32.png', 'Images/33.png'
];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

function App() {
  const [randomImages, setRandomImages] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('initial'); 
  const [tweetText, setTweetText] = useState('');
  const [location, setLocation] = useState(''); 
  const [predictionResult, setPredictionResult] = useState(null); 
  const [showFinalDiv, setShowFinalDiv] = useState(false); 

  useEffect(() => {
    const shuffledImages = shuffleArray(imagePaths).slice(0, 16);
    setRandomImages(shuffledImages);
  }, []);

  const handleLetsGoClick = () => {
    setCurrentScreen('tweet'); 
  };

  const handleSubmitTweet = () => {
    const apiUrl = "https://896f-34-23-105-157.ngrok-free.app/predict";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: tweetText })
    })
      .then(response => response.json())
      .then(data => {
        setPredictionResult(data); 
        setCurrentScreen('result'); 
      })
      .catch(error => {
        console.error("Error:", error);
        setPredictionResult(null);
        setCurrentScreen('result');
      });
  };

  const handleOkClick = () => {
    setCurrentScreen('initial'); 
    setShowFinalDiv(false); 
    setPredictionResult(null); 
  };

  const handleNextClick = () => {
    if (predictionResult && predictionResult.isDisaster) {
      setShowFinalDiv(true); 
    } else {
      setCurrentScreen('initial'); 
    }
  };

  if (showFinalDiv && predictionResult && predictionResult.isDisaster) {
    return (
      <div className="App">
        <div className="background-container">
          {randomImages.concat(randomImages).map((img, index) => (
            <div
              key={index}
              className="background-image"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
        </div>

        <div className="overlay"></div>

        <div className="box final-div">
          <h2>We're Here for You</h2>
          <div className="final-text">
            <p>
              It seems that the tweet you've shared might be related to a disaster. During these difficult times, it's important to remember the following:
            </p>
            <ul>
              <li><strong>Stay Calm:</strong> Take deep breaths and try to remain as calm as possible. Panicking can make the situation harder to manage.</li>
              <li><strong>Safety First:</strong> Ensure that you're in a safe place or move to one if necessary. Your well-being is the top priority.</li>
              <li><strong>Authorities Notified:</strong> Our system has alerted the responsible authorities in your region. Help is on the way, and emergency services are being mobilized to provide assistance.</li>
              <li><strong>Seek Support:</strong> Reach out to family, friends, or local authorities for help. You're not alone in this.</li>
              <li><strong>Stay Informed:</strong> Keep up with reliable news sources or emergency broadcasts to stay aware of the situation.</li>
              <li><strong>Help is Available:</strong> If you're directly affected by the event, don't hesitate to contact local emergency services or relief organizations for support.</li>
              <li><strong>Take Care of Your Mental Health:</strong> It's natural to feel anxious or overwhelmed. Talking to someone you trust or seeking professional help can provide comfort.</li>
            </ul>
            <p>Remember, no matter how tough things seem, there are people and resources ready to help you through this. Stay safe, and help is on the way.</p>
          </div>
          <button className="btn ok-btn" onClick={handleOkClick}>OK</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="background-container">
        {randomImages.concat(randomImages).map((img, index) => (
          <div
            key={index}
            className="background-image"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
      </div>

      <div className="overlay"></div>

      {currentScreen === 'initial' && (
        <div className="box">
          <div className="logo">
            <img src='Images/main-logo.png' alt="Logo" className="main-logo" />
          </div>
          <h2>Welcome to the Disaster Tweets Detection</h2>
          <p>
            This project uses Natural Language Processing (NLP) techniques to classify tweets related to real disaster events. By analyzing tweet text, we aim to distinguish between tweets that describe actual disasters and those that don't, helping in quick disaster response.
          </p>
          <button className="btn lets-go-btn" onClick={handleLetsGoClick}>
            <p className="button-para">Let's Go</p>
            <img src="Images/arrow.png" alt="Button Logo" className="button-logo" />
          </button>
        </div>
      )}

      {currentScreen === 'tweet' && (
        <div className="box">
          <h2>Enter the tweet</h2>
          <textarea
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            placeholder="Type tweet here..."
          ></textarea>
          <h2>Enter your location</h2>
          <textarea
            value={location}
            onChange={(e) => setLocation(e.target.value)} 
            placeholder="Enter location here..."
          ></textarea>
          <button className="btn submit-btn" onClick={handleSubmitTweet}>Submit</button>
        </div>
      )}

      {currentScreen === 'result' && (
        <div className="box">
          <h2>Tweet Analysis Result</h2>
          {predictionResult ? (
            <>
              <p>{predictionResult.isDisaster ? 'The tweet is disaster-related.' : 'The tweet is not related to a disaster.'}</p>
              <p>Confidence: {(predictionResult.confidence * 100).toFixed(2)}%</p>
              {predictionResult.isDisaster && (
                <>
                  <p>{location} authorities have been alerted and help is on the way.</p>
                  <p>Email: rescueforce@gmail.com</p>
                  <p>Contact: 112</p>
                </>
              )}
            </>
          ) : (
            <p>Unable to process tweet.</p>
          )}
          <button className="btn ok-btn" onClick={handleNextClick}>Next</button>
        </div>
      )}
    </div>
  );
}

export default App;
