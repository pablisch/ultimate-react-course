import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Map.module.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import useCitiesContext from '../hooks/useCitiesContext';
import useGeolocation from '../hooks/useGeolocation';
import Button from './Button';
import useUrlPosition from '../hooks/useUrlPosition';

const Map = () => {
  const { cities } = useCitiesContext();
  const [mapPosition, setMapPosition] = useState([51.535, -0.04]);
  const {isLoading: isLoadingPosition, position: geoLocationPosition, getPosition: getGeolocationPosition} = useGeolocation();
  
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => { 
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);
  
  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && <Button type='position' onClick={getGeolocationPosition}>
        {isLoadingPosition ? 'Loading...' : 'Use your location'}
      </Button>}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
          <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
          </Popup>
        </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
      <DetectClick />
      </MapContainer>
    </div>
  );
};

const ChangeCenter = ({position}) => {
  const map = useMap();
  // map.setView(position)
  map.setView(position, map.getZoom(), { animate: true, duration: 0.5 });
  return null
}

const DetectClick = () => {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  });
  
  // return null;
}



export default Map;
