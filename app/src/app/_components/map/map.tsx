import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow,
  popupAnchor: [12, 0],
});

type MapComponentProps = {
  geocodes: { lat: number; lng: number }[];
};

type MarkerComponentProps = {
  geocodes: { lat: number; lng: number }[];
};

const Markers = ({ geocodes }: MarkerComponentProps) => {
  return (
    <>
      {geocodes.map((geocode, index) => (
        <span key={index}>
          <Marker position={geocode}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </span>
      ))}
    </>
  );
};

export default function Map(props: MapComponentProps) {
  const geocodes = props.geocodes;
  // MeetingDetailを表示することなどを考慮して、中心位置を調整する
  const adjaster = { lat: 0, lng: 0.01 };
  const center: { lat: number; lng: number } =
    geocodes.length > 0
      ? {
          lat: geocodes[0].lat - adjaster.lat,
          lng: geocodes[0].lng - adjaster.lng,
        }
      : {
          // 一旦皇居にしている
          lat: 35.685175,
          lng: 139.7528,
        };

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
      />
      <Markers geocodes={geocodes} />
    </MapContainer>
  );
}
