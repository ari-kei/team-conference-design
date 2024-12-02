"use client";

import Map from "@/app/_components/map/map";
import "leaflet/dist/leaflet.css";

export default function MapPresentation() {
  return (
    <div className="relative z-0">
      <Map />
    </div>
  );
}
