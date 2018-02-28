import React from "react";
import * as booksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./BookShelf";
import SearchPage from "./SearchPage";
import {Route, Link} from "react-router-dom";
class BooksApp extends React.Component {
    state = {
        request: true,
        books: [],
    }

    componentWillReceiveProps(){
        this.componentDidMount();
    }

    componentDidMount() {
        booksAPI.getAll().then(books => {
            this.setState({books});
        });
    }

    updateShelf = (book, shelf) => {
        booksAPI.update(book, shelf).then(() => {
            booksAPI.getAll().then(books => {
                this.setState({books});
            });
        })
    }

    search = (query) => {
        const app = this;
        booksAPI.search(query).then((searchResults) => {
            app.setState({searchResults})
        });
    }


    render() {
        return (<div className="app">
                <Route
                    path='/search'
                    render={() => (
                        <SearchPage booksWithShelf={this.state.books}/>
                    )}
                />

                <Route
                    exact
                    path='/'
                    render={() => (<div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>
                            <div className="list-books-content">
                                <div>
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Currently Reading</h2>
                                        <div className="bookshelf-books">
                                            {this.state.books.length > 0 &&
                                            <BookShelf booksList={this.state.books} bookShelf={"currentlyReading"}
                                                       updateShelf={this.updateShelf}/>}
                                        </div>
                                    </div>
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Want to Read</h2>
                                        <div className="bookshelf-books">
                                            {this.state.books.length > 0 &&
                                            <BookShelf booksList={this.state.books} bookShelf={"wantToRead"}
                                                       updateShelf={this.updateShelf}/>}
                                        </div>
                                    </div>
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Read</h2>
                                        <div className="bookshelf-books">
                                            {this.state.books.length > 0 &&
                                            <BookShelf booksList={this.state.books} bookShelf={"read"}
                                                       updateShelf={this.updateShelf}/>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="open-search">
                                <Link to="/search"> ADD NEW </Link>
                            </div>
                        </div>
                    )}
                />
            </div>
        )
    }


}

export default BooksApp;
