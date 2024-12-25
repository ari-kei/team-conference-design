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
  center: { meetingId: string; lat: number; lng: number };
  geocodes: { meetingId: string; lat: number; lng: number }[];
  handleDetail: (meetingId: string) => void;
};

type MarkerComponentProps = {
  geocodes: { meetingId: string; lat: number; lng: number }[];
  handleDetail: (meetingId: string) => void;
};

// MeetingDetailを表示することなどを考慮して、中心位置を調整する
const adjaster = { lat: 0, lng: 0.005 };
const zoom = 16;

const Markers = ({ geocodes, handleDetail }: MarkerComponentProps) => {
  // TODO マーカーがクリックされた際に、MeetingDetailを表示するように修正が必要
  const map = useMap();
  const focus = (e: LeafletMouseEvent, meetingId: string) => {
    handleDetail(meetingId);
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
            click: (e: LeafletMouseEvent) => focus(e, geocode.meetingId),
          }}
        />
      ))}
    </>
  );
};

export default function Map({
  geocodes,
  center,
  handleDetail,
}: MapComponentProps) {
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
      <Markers geocodes={geocodes} handleDetail={handleDetail} />
    </MapContainer>
  );
}
