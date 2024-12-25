"use client";

import Map from "@/app/_components/map/map";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import SearchBar from "@/app/_components/ui/searchbar";
import { type Meeting } from "@/app/domain/meeting";
import { format } from "date-fns/fp";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MeetingDetail from "@/app/_components/meeting/meetingdetail";

export default function MeetingHeadlinesPresentation(prop: {
  meetings: Meeting[];
  geocodes: { meetingId: string; lat: number; lng: number }[];
}) {
  const [searchHeadline, setSearchHeadline] = useState("");
  // TODO searchHeadlineで表示する会議を絞る
  const meetings = prop.meetings;
  const geocodes = prop.geocodes;

  const searchParam = useSearchParams();
  const [focusedMeetingId, setForcusedMeetingId] = useState<string | null>(
    searchParam.get("detail")
  );
  const [focusNewComment, setForcusNewComment] = useState(false);
  const [edittingComment, setEditingComment] = useState("");
  const [deletingComment, setDeletingComment] = useState("");
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleDetail = (meetingId: string | null) => {
    const params = new URLSearchParams(searchParam);
    if (meetingId) {
      params.set("detail", meetingId);
    } else {
      params.delete("detail");
    }
    replace(`${pathname}?${params.toString()}`);

    setForcusedMeetingId(meetingId ? meetingId : null);
  };

  const handleExistedComment = (id: string, operate?: "edit" | "delete") => {
    switch (operate) {
      case "edit":
        setEditingComment(id);
        setDeletingComment("");
        break;
      case "delete":
        setEditingComment("");
        setDeletingComment(id);
        break;
      default:
        setEditingComment("");
        setDeletingComment("");
    }
  };

  const focusedGeocode = geocodes.filter(
    (geocode) => geocode.meetingId === focusedMeetingId
  );

  let center = {
    meetingId: "0",
    // 一旦皇居にしている
    lat: 35.685175,
    lng: 139.7528,
  };

  if (geocodes.length > 0) {
    center = geocodes[0];
  }

  if (focusedGeocode.length === 1) {
    center = focusedGeocode[0];
  }

  return (
    <>
      <div className="relative z-0">
        <Map center={center} geocodes={geocodes} handleDetail={handleDetail} />
      </div>
      <div className="absolute top-0 left-0 z-10 flex">
        <div>
          <SearchBar
            searchValue={searchHeadline}
            setSearchValue={setSearchHeadline}
          />
          <span className="bg-white h-screen">
            {meetings.map((meeting) => {
              return (
                <div className="flex" key={meeting.id}>
                  <button className="w-full text-left text-lg">
                    <Card
                      className="text-text-primary"
                      onClick={() => handleDetail(meeting.id)}
                    >
                      <CardHeader>
                        <CardTitle>{meeting.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{meeting.teamName}</p>
                        <p>{format("yyyy/MM/dd", meeting.date)}</p>
                        <p>{"@" + meeting.place}</p>
                      </CardContent>
                    </Card>
                  </button>
                </div>
              );
            })}
          </span>
        </div>
        {meetings.map((meeting) =>
          meeting.id !== focusedMeetingId ? null : (
            <MeetingDetail
              key={meeting.id}
              meeting={meeting}
              handleDetail={handleDetail}
              setForcusNewComment={setForcusNewComment}
              focusNewComment={focusNewComment}
              handleExistedComment={handleExistedComment}
              edittingComment={edittingComment}
              deletingComment={deletingComment}
            />
          )
        )}
      </div>
    </>
  );
}
