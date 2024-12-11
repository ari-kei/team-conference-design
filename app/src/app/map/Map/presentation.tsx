"use client";

import Map from "@/app/_components/map/map";
import "leaflet/dist/leaflet.css";

type MapPresentationProps = {
  geocodes: { lat: number; lng: number }[];
};

export default function MapPresentation({ geocodes }: MapPresentationProps) {
  return (
    <div className="relative z-0">
      <Map geocodes={geocodes} />
    </div>
  );
}
