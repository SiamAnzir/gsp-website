import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerImg from "../../assets/marker.png";
import { ADDRESS, DIRECTIONS_URL, MAP_POSITION } from "../../store/site.js";

/**
 * Isolated into its own module so Contact.jsx can lazy-load it. Leaflet plus its
 * stylesheet is a large dependency that used to sit in the main bundle and load
 * for everyone, including visitors who never scrolled this far.
 */
const markerIcon = new L.Icon({
  iconUrl: markerImg,
  iconRetinaUrl: markerImg,
  iconSize: [40, 40],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
});

const MapPanel = () => (
  <MapContainer center={MAP_POSITION} zoom={14} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={MAP_POSITION} icon={markerIcon}>
      <Popup>
        {ADDRESS}
        <br />
        <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="popup-link">
          Get Directions
        </a>
      </Popup>
    </Marker>
  </MapContainer>
);

export default MapPanel;
