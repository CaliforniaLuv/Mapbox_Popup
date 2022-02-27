import './App.css';
import React, { useMemo ,useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import parkDate from "./data/skateboard-parks.json"
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: '100vw',
    height: '100vh',
    zoom: 13,
  })

  const [selectedPark, setSelectedPark] = useState(null)

  const handleBox = (park) => {
    setSelectedPark(park)
    console.log(park)
  }


  return (
    <div className="map-container">
      <ReactMapGL 
        {...viewport}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/californialuv/cl01780dt00he15qk4lc7uu35"
        onMove={newport => setViewport(newport)}
      >
        {
          parkDate.features.map(park => (
            <Marker 
              key={park.properties.PARK_ID} 
              latitude={park.geometry.coordinates[1]}
              longitude={park.geometry.coordinates[0]}
              anchor="bottom"
            >
              <button className="marker-button" onClick={() => handleBox(park)}>
                <img src="/skate.svg" alt="Skate Park Icon"/>
              </button>
            </Marker>
          ))
        }
        {selectedPark && (

          <Popup 
            latitude={selectedPark.geometry.coordinates[1]} 
            longitude={selectedPark.geometry.coordinates[0]}
            anchor="bottom"
            closeOnClick={false}
            onClose={() => {
              setSelectedPark(null);
              console.log("클로즈")
            }}
            height={300}
            width={300}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
