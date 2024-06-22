import "./BookBody.css";
type BookTitleAuthor = {
  title: string;
  author: string;
}


export const BookBody = ({title,author} : BookTitleAuthor) => {
  return (
    <div className="bookcard__body">
      <h3 title="Book Title" className="booktitle">
          {title.length > 40
            ? `${title.slice(0, 40)}...`
            : title}
        </h3>
        <h3 className="bookauthor">by: {author}</h3>
      
    </div>
  )
};
