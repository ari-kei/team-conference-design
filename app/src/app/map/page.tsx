import React from "react";
import MeetingHeadlinesContainer from "./MeetingHeadlines";
import MapContainer from "./Map/container";

export default function MapPage() {
  return (
    <div>
      <MapContainer />
      <MeetingHeadlinesContainer />
    </div>
  );
}
