"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import SearchBar from "@/app/_components/ui/searchbar";
import { cn } from "@/app/_lib/utils";
import { type Meeting } from "@/app/domain/meeting";
import { format } from "date-fns/fp";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MeetingDetail from "@/app/_components/meeting/meetingdetail";

export default function MeetingHeadlinesPresentation(prop: {
  meetings: Meeting[];
}) {
  const meetings = prop.meetings;
  const searchParam = useSearchParams();

  const [focusedMeetingId, setForcusedMeetingId] = useState<string | null>(
    searchParam.get("detail")
  );
  const [focusNewComment, setForcusNewComment] = useState(false);
  const [edittingComment, setEditingComment] = useState("");
  const [deletingComment, setDeletingComment] = useState("");
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleDetail = (meeting: Meeting | null) => {
    const params = new URLSearchParams(searchParam);
    if (meeting) {
      params.set("detail", meeting.id);
    } else {
      params.delete("detail");
    }
    replace(`${pathname}?${params.toString()}`);

    setForcusedMeetingId(meeting ? meeting.id : null);
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

  return (
    <div className="absolute top-0 left-0 z-10 flex">
      <div>
        <SearchBar className="w-[330px]" />
        <span className="bg-white h-screen">
          {meetings.map((meeting) => {
            return (
              <span className="flex" key={meeting.id}>
                <Card
                  className={cn("w-[330px]", "h-fit", "text-text-primary")}
                  onClick={() => handleDetail(meeting)}
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
              </span>
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
  );
}
