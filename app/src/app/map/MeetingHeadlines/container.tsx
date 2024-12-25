import { GeoCode } from "@/app/domain/map";
import MeetingHeadlinesPresentation from "./presentation";
import { fetchList } from "@/app/_lib/fetcher/meeting";
import { fetchAddress } from "@/app/_lib/fetcher/map";

export async function MeetingHeadlinesContainer() {
  const meetings = await fetchList();

  const geocodes: GeoCode[] = [];
  for (const meeting of meetings) {
    // 住所1つごとにAPIを呼ばないといけない。Dataloader使えないか検討(API側が対応しているかから)
    const longLati = await fetchAddress(meeting.address);
    const geocode = Object.assign(longLati, { meetingId: meeting.id });
    geocodes.push(geocode);
  }

  return (
    <MeetingHeadlinesPresentation meetings={meetings} geocodes={geocodes} />
  );
}
