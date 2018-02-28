/**
 * Created by amahesh on 2/6/18.
 */
import React from "react";

const BookShelf = (props) => {
    let bookList = props.booksList.filter((book) => book.shelf === props.bookShelf);
    let updateShelf = props.updateShelf;
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {bookList.map((book) => (
                    <li>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                                }}></div>
                                <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={e => updateShelf(book, e.target.value)}>
                                        <option value="none" disabled>Move to...</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            {book.authors.map((name) => (
                                <div className="book-authors">{name}</div>
                            ))}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}


export default BookShelf;