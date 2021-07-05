import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  MapContainer, TileLayer, Marker, Popup, Polyline,
} from 'react-leaflet';
import { latLngBounds } from 'leaflet';
import getFormattedDate from '../utilities';
import './Map.scss';

const center = [55.7537583, 37.6198118];

const Map = () => {
  const [map, setMap] = useState(null);
  const movementsList = useSelector((state) => state.movements.list);

  const movementsCoordinates = useMemo(() => {
    if (movementsList && movementsList.length) {
      return movementsList.map(({ coordinates }) => {
        const { latitude, longitude } = coordinates;
        return [latitude, longitude];
      });
    }
    return null;
  }, [movementsList]);

  const bounds = useMemo(() => {
    if (movementsList && movementsList.length) {
      return movementsList.reduce((acc, { coordinates }) => {
        const { latitude, longitude } = coordinates;
        return acc.extend([latitude, longitude]);
      },
      latLngBounds());
    }
    return null;
  }, [movementsCoordinates]);

  useEffect(() => {
    if (map && bounds?._northEast) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [map, bounds]);

  return (
    <MapContainer center={center} zoom={16} whenCreated={setMap}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {movementsList?.length > 0 && movementsList.map((item) => (
        <Marker
          position={[item.coordinates.latitude, item.coordinates.longitude]}
          key={item.timestamp}
        >
          <Popup>
            <span>{getFormattedDate(item.timestamp)}</span>
          </Popup>
        </Marker>
      ))}
      {movementsCoordinates?.length > 0 && <Polyline positions={movementsCoordinates} />}
    </MapContainer>
  );
};

export default Map;
