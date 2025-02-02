export type BookType = {
    id: number;
    title: string;
    author: string;
    imageUrl?: string;
    averageRate: number;
    opinions?: ReviewType[] | null;
};

export type GenreType = {
    id: number,
    name: string,
    books: BookType[]
};

export type PaginatedBookType = {
    paginatedItems: BookType[],
    totalItems: number,
    page: number,
    totalPages: number,
    requestedAt: string
}

export type ReviewType = {
    id: number;
    rate: number;
    view: string;
    userName: string;
    postDate: string;
    bookId: number;
};