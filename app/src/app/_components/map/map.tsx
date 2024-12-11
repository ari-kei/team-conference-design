import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LeafletMouseEvent } from "leaflet";
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

// MeetingDetailを表示することなどを考慮して、中心位置を調整する
const adjaster = { lat: 0, lng: 0.005 };
const zoom = 16;

const Markers = ({ geocodes }: MarkerComponentProps) => {
  const map = useMap();
  const center = (e: LeafletMouseEvent) => {
    map.setView(
      [e.latlng.lat - adjaster.lat, e.latlng.lng - adjaster.lng],
      zoom
    );
  };

  return (
    <>
      {geocodes.map((geocode, index) => (
        <Marker
          key={index}
          position={geocode}
          eventHandlers={{
            click: center,
          }}
        />
      ))}
    </>
  );
};

export default function Map(props: MapComponentProps) {
  const geocodes = props.geocodes;
  const center: { lat: number; lng: number } =
    geocodes.length > 0
      ? {
          lat: geocodes[0].lat,
          lng: geocodes[0].lng,
        }
      : {
          // 一旦皇居にしている
          lat: 35.685175,
          lng: 139.7528,
        };

  return (
    <MapContainer
      center={[center.lat - adjaster.lat, center.lng - adjaster.lng]}
      zoom={zoom}
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
