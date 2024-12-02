import MeetingHeadlinesPresentation from "./presentation";
import { fetchList } from "@/app/_lib/fetcher/meeting";

export async function MeetingHeadlinesContainer() {
  const meetings = await fetchList();

  return <MeetingHeadlinesPresentation meetings={meetings} />;
}
