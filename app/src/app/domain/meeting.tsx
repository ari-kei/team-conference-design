export type Meeting = {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
  date: Date;
  theme: string;
  place: string;
  postCode: PostCode;
  address: string;
  comments: Comment[];
};

type PostCode = `${number}`;

type Comment = {
  id: string;
  message: string;
  author: string;
  createDate: Date;
};
