export type BookType = {
    id: number;
    title: string;
    author: string;
    imageUrl?: string;
    averageRate: number;
    opinions?: ReviewType[] | null;
    genreId?: string
};

export type GenreType = {
    id: string,
    name: string,
    books?: BookType[]
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

export type PaginationType = {
    page: string,
    pageSize: string
}