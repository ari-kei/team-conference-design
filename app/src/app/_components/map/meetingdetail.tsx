import { format } from "date-fns/fp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/app/_lib/utils";
import { convertPostCode } from "@/app/_lib/address";
import { Button } from "../ui/button";

type postCode = `${number}`;

type comment = {
  id: string;
  message: string;
  author: string;
  createDate: Date;
};

type MeetingDetailProps = {
  meetingName: string;
  teamName: string;
  theme: string;
  placeName: string;
  postCode: postCode;
  address: string;
  eventDate: Date;
  focusNewComment: boolean;
  comments: comment[];
  edittingComment?: string;
  deletingComment?: string;
};

export function MeetingDetail({
  meetingName,
  teamName,
  theme,
  placeName,
  postCode,
  address,
  eventDate,
  focusNewComment,
  comments,
  edittingComment,
  deletingComment,
}: MeetingDetailProps) {
  const postCodeView = convertPostCode(postCode);

  return (
    <Card className={cn("w-[560px]", "text-text-primary")}>
      <CardHeader>
        <CardTitle className="text-4xl">{meetingName}</CardTitle>
        <CardDescription>
          <div className="block w-fit mb-1 p-2 bg-icon text-white rounded-lg">
            {teamName}
          </div>
          <div>{format("yyyy/MM/dd", eventDate)}</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h1 className="text-2xl p-2">●テーマ</h1>
          <div className="block w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md">
            <p className="text-2xl">{theme}</p>
          </div>
        </div>
        <div className="mb-4">
          <h1 className="text-2xl p-2">●場所</h1>
          <div className="block w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md">
            <p className="text-2xl">{placeName}</p>
            <div className="flex">
              <p className="pr-2">{postCodeView}</p>
              <p>{address}</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h1 className="text-2xl p-2">●コメント</h1>
          <form className="pb-2">
            <input
              type="text"
              name="new-comment"
              id="new-comment"
              placeholder="コメントを入力してください"
              className="block w-full max-w-sm mb-2 p-4 bg-white border border-gray-200 rounded-lg shadow-md"
            />
            <div className={focusNewComment ? "block" : "hidden"}>
              <Button className="mr-2">保存</Button>
              <Button kind={"tertiary"} className="mr-2">
                キャンセル
              </Button>
            </div>
          </form>
          {comments.map(({ id, message, author, createDate }: comment) => {
            return (
              <div key={id}>
                <div className="flex text-xs">
                  <p className="mr-4">{author}</p>
                  <p className="mr-4">{format("yyyy/MM/dd", createDate)}</p>
                </div>
                <form className="pb-2">
                  <input
                    type="text"
                    name={"comment" + id}
                    id={"comment" + id}
                    className="block w-full max-w-sm mb-2 p-4 bg-white border border-gray-200 rounded-lg shadow-md"
                    defaultValue={message}
                  />
                  <div className={id === edittingComment ? "block" : "hidden"}>
                    <Button className="mr-2">保存</Button>
                    <Button kind={"tertiary"} className="mr-2">
                      キャンセル
                    </Button>
                  </div>
                  <div className={id === deletingComment ? "block" : "hidden"}>
                    <Button kind={"danger"} className="mr-2">
                      削除
                    </Button>
                    <Button kind={"tertiary"} className="mr-2">
                      キャンセル
                    </Button>
                  </div>
                </form>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
