export const API_URL : string = "https://booklibrary-backend-20f7a19cecb2.herokuapp.com/api/" 
//export const API_URL : string = "https://localhost:7152/api/";
export const BOOK_URL: string = API_URL + "Books";
export const BOOK_TOP_BOOK_URL : string = BOOK_URL+"/TopBooks?numberOfBooks="
export const BOOK_BY_BOOKID_URL: string = BOOK_URL+"/";
export const BOOK_BY_TITLE_OR_AUTHOR_URL : string = BOOK_URL+"/TitleOrAuthor?titleOrAuthor=";
export const BOOKS_BY_GENRESId_URL: string = `${BOOK_URL}/genre?genresId=`
export const OPINION_URL: string = API_URL+"Opinions/";
export const OPINION_BY_BOOKID_URL : string = OPINION_URL+"BookId=";
export const GENRES_LIST_URL: string = API_URL + "Genres";
export const AI_STORY_URL: string = `${API_URL}Story/AI`;



