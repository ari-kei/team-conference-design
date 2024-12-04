import { Meeting } from "@/app/domain/meeting";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/app/_lib/utils";
import { format } from "date-fns/fp";
import { convertPostCode } from "@/app/_lib/address";
import Image from "next/image";

type MeetingDetailProps = {
  meeting: Meeting;
  handleDetail: (arg: Meeting | null) => void;
  setForcusNewComment: (arg: boolean) => void;
  focusNewComment: boolean;
  handleExistedComment: (arg0: string, arg1?: "edit" | "delete") => void;
  edittingComment: string;
  deletingComment: string;
};

export default function MeetingDetail({
  meeting,
  handleDetail,
  setForcusNewComment,
  focusNewComment,
  handleExistedComment,
  edittingComment,
  deletingComment,
}: MeetingDetailProps) {
  const ref = (element: HTMLInputElement | null) => {
    element?.focus();
  };

  return (
    <Card className={cn("w-[500px]", "h-fit", "text-text-primary")}>
      <CardHeader>
        <CardTitle className="text-4xl flex justify-between">
          {meeting.name}
          <Image
            className="dark:invert"
            src="/close.svg"
            alt="close"
            width={32}
            height={32}
            priority
            onClick={() => handleDetail(null)}
          />
        </CardTitle>
        <CardDescription>
          <div className="block w-fit mb-1 p-2 bg-icon text-white rounded-lg">
            {meeting.teamName}
          </div>
          <div>{format("yyyy/MM/dd", meeting.date)}</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h1 className="text-2xl p-2">●テーマ</h1>
          <div className="block w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md">
            <p className="text-2xl">{meeting.theme}</p>
          </div>
        </div>
        <div className="mb-4">
          <h1 className="text-2xl p-2">●場所</h1>
          <div className="block w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md">
            <p className="text-2xl">{meeting.place}</p>
            <div className="flex">
              <p className="pr-2">{convertPostCode(meeting.postCode)}</p>
              <p>{meeting.address}</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h1 className="text-2xl p-2">●コメント</h1>
          <form className="pb-2" onFocus={() => setForcusNewComment(true)}>
            <input
              type="text"
              name="new-comment"
              id="new-comment"
              placeholder="コメントを入力してください"
              className="block w-full max-w-sm mb-2 p-4 bg-white border border-gray-200 rounded-lg shadow-md"
              ref={focusNewComment ? ref : null}
            />
            <div className={focusNewComment ? "block" : "hidden"}>
              <Button className="mr-2">保存</Button>
              <Button
                kind={"tertiary"}
                className="mr-2"
                onClick={(e) => {
                  e.preventDefault();
                  setForcusNewComment(false);
                }}
              >
                キャンセル
              </Button>
            </div>
          </form>
          {meeting.comments.map(({ id, message, author, createDate }) => {
            return (
              <div key={id}>
                <div className="flex text-xs">
                  <p className="mr-4">{author}</p>
                  <p className="mr-4">{format("yyyy/MM/dd", createDate)}</p>
                </div>
                <form className="pb-2">
                  <div className="relative w-full max-w-sm">
                    <input
                      type="text"
                      name={"comment" + id}
                      id={"comment" + id}
                      className="block w-full max-w-sm mb-2 p-4 bg-white border border-gray-200 rounded-lg shadow-md"
                      defaultValue={message}
                      disabled={edittingComment === id ? false : true}
                      ref={edittingComment === id ? ref : null}
                    />
                    <Image
                      className="dark:invert absolute top-3 right-10"
                      src="/edit.svg"
                      alt="close"
                      width={32}
                      height={32}
                      priority
                      onClick={() => handleExistedComment(id, "edit")}
                    />
                    <Image
                      className="dark:invert absolute top-3 right-1"
                      src="/delete.svg"
                      alt="close"
                      width={32}
                      height={32}
                      priority
                      onClick={() => handleExistedComment(id, "delete")}
                    />
                  </div>
                  <div className={id === edittingComment ? "block" : "hidden"}>
                    <Button
                      className="mr-2"
                      onClick={(e) => {
                        // TODO コメント更新処理を外から渡してくる
                        e.preventDefault();
                        console.log("編集したコメントの保存処理");
                        handleExistedComment(id);
                      }}
                    >
                      保存
                    </Button>
                    <Button
                      kind={"tertiary"}
                      className="mr-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleExistedComment(id);
                      }}
                    >
                      キャンセル
                    </Button>
                  </div>
                  <div className={id === deletingComment ? "block" : "hidden"}>
                    <Button
                      kind={"danger"}
                      className="mr-2"
                      onClick={(e) => {
                        // TODO コメントの削除処理を外から渡してくる
                        e.preventDefault();
                        console.log("コメントの削除処理");
                        handleExistedComment(id);
                      }}
                    >
                      削除
                    </Button>
                    <Button
                      kind={"tertiary"}
                      className="mr-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleExistedComment(id);
                      }}
                    >
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
