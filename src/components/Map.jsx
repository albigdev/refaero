import styles from "./Map.module.css";
import { useUrlCoordinates } from "../hooks/useUrlCoordinates";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useJobs } from "../hooks/useJobs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Map() {
  const { jobs } = useJobs();

  const [mapPosition, setMapPosition] = useState([47.497, 19.043]);

  const [mapLat, mapLng] = useUrlCoordinates();

  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([mapLat, mapLng]);
      }
    },
    [mapLat, mapLng]
  );

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={14}
        minZoom={14}
        maxZoom={18}
        scrollWheelZoom={true}
        maxBounds={[
          [47.3, 18.8],
          [47.7, 19.4],
        ]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png"
        />
        {jobs.map((job) => (
          <Marker
            position={[job.coordinates.lat, job.coordinates.lng]}
            key={job.id}
          >
            <Popup>
              <Link
                to={`/app/jobs/${job.id}?lat=${job.coordinates.lat}&lng=${job.coordinates.lng}`}
                className={styles.popupLink}
              >
                <span>{job.title}</span>
              </Link>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} mapLat={mapLat} mapLng={mapLng} />
        <MapClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position, mapLat, mapLng }) {
  let zoom = 14;
  if (mapLat && mapLng) zoom = 15;
  const map = useMap();
  map.setView(position, zoom);

  useEffect(() => {
    map.closePopup();
  }, [position, map]);

  return null;
}

function MapClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
