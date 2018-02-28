/**
 * Created by amahesh on 2/27/18.
 */
import React from "react";
import * as booksAPI from "./BooksAPI";
import {Link} from "react-router-dom";

class SearchPage extends React.Component {
    state = {
        query: '',
        searchResults: [],
        invalidQuery: false,
    }

    setQueryParam = (query) => {
        this.setState({query: query}, () => {
            query.length > 0 && this.search(this.state.query);
        });

    }

    updateShelf = (query, book, shelf) => {
        booksAPI.update(book, shelf).then(() => {
            booksAPI.search(query).then((searchResults) => {
                this.setState({searchResults})
            });
        })
    }

    search = (query) => {
        const app = this;
        booksAPI.search(query.trim()).then((searchResults) => {
            if (searchResults.length > 0) {
                this.updateBooks(searchResults);
            }
            else {
                app.setState({invalidQuery: true})
            }
        });
    }


    updateBooks = (books) => {
        const verifiedBooks = books.map(book => {
            book.shelf = "None";
            this.props.booksWithShelf.forEach(bookOnShelf => {
                if (book.id === bookOnShelf.id) {
                    book.shelf = bookOnShelf.shelf;
                }
            });
            return book;
        });
        this.setState({
            searchResults: verifiedBooks,
            invalidQuery: false
        });
    }

    renderBooks = () => {
        return (
            this.state.searchResults.map((book) => {
                return (
                    <li>
                        <div className="book">
                            <div className="book-top">
                                {book.imageLinks && <div className="book-cover" style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                                }}></div>}
                                <div className="book-shelf-changer">
                                    <select value={book.shelf}
                                            onChange={e => this.updateShelf(this.state.query, book, e.target.value)}>
                                        <option value="none">None</option>
                                        <option value="none" disabled>Move to...</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="read">Read</option>

                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            {book.authors && book.authors.map((name) => (
                                <div className="book-authors">{name}</div>
                            ))}
                        </div>
                    </li>
                );
            })
        )
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query}
                               onChange={e => this.setQueryParam(e.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <br/>
                    <ol className="books-grid">
                        {this.state.invalidQuery && <div>Invalid Query!!!</div>}
                        {!this.state.invalidQuery && this.state.searchResults.length > 0 && this.renderBooks() }
                    </ol>
                </div>
            </div>

        );
    }

}
export default SearchPage;