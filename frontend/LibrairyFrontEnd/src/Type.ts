export type BookType = {
  book: {
    id: number;
    title: string;
    author: string;
    userId: number;
    borrowed: boolean;
    borrowedTime: Date;
    bivenBack: boolean;
    bivenBackTime: Date;
  };
 
};

export type OpinionType = {
  id: number;
  like: number;
  bookId: number;
  view: string;
  userName: string;
};

export type OpinionUpdateType = {
  id: number;
};
