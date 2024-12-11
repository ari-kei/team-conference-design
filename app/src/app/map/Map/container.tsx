import { fetchList } from "@/app/_lib/fetcher/meeting";
import MapPresentation from "./presentation";
import { fetchAddress } from "@/app/_lib/fetcher/map";
import { GeoCode } from "@/app/domain/map";

export default async function MapContainer() {
  const meetings = await fetchList();

  const geocodes: GeoCode[] = [];
  for (const meeting of meetings) {
    // 住所1つごとにAPIを呼ばないといけない。Dataloader使えないか検討(API側が対応しているかから)
    const geocode = await fetchAddress(meeting.address);
    geocodes.push(geocode);
  }

  return (
    <>
      <MapPresentation geocodes={geocodes} />
    </>
  );
}
