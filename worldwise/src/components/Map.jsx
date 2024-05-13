import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Map.module.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => {
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([51.535, -0.04]);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  


  return (
    <div className={styles.mapContainer} >
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}  >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
