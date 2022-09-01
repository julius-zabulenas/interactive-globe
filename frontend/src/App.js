import Globe from 'react-globe.gl';
import { useEffect, useRef, useState } from 'react';

function App() {
  const globeEl = useRef();
  const [data, setData] = useState({});
  const coordinates = [
    {
      lat: data.latitude,
      lng: data.longitude
    }
  ];

  const onLocationClick = () => {
    globeEl.current.pointOfView({
      lat: data.latitude,
      lng: data.longitude,
      altitude: 1.5
    }, 1000);
  };

  useEffect(() => {
    // Enable globe auto rotation
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.35;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=0319992f7f8c4912a46f36217ef46ef2");
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        pointsData={coordinates}
        onPointClick={() => onLocationClick()}
        pointLabel={() => data.city}
        pointRadius={0.5}
      />
    </>
  );
}

export default App;
