import "server-only";
import { type Meeting } from "@/app/domain/meeting";

export async function fetchList(): Promise<Meeting[]> {
  // TODO DBやAPI経由でデータを取得する
  const meetings: Meeting[] = [
    {
      id: "1",
      name: "会の名前",
      teamId: "teamId1",
      teamName: "チームの名前",
      date: new Date(),
      theme: "テーマの名前",
      place: "SOMPO美術館",
      postCode: "1111111",
      address: "東京都千代田区皇居外苑1",
      comments: [
        {
          id: "comment1",
          author: "さとう たろう",
          message: "コメントです。",
          createDate: new Date(),
        },
        {
          id: "comment2",
          author: "さとう たろう",
          message: "コメントなんです。",
          createDate: new Date(),
        },
        {
          id: "comment3",
          author: "さとう たろう",
          message: "コメントでしょうか。",
          createDate: new Date(),
        },
      ],
    },
  ];

  return meetings;
}
