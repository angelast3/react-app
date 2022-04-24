import './App.css';
import React, {Component} from "react";
import Books from "../Books/BookList/books"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from '../Header/header';
import Categories from '../Categories/categories';
import BookAdd from '../Books/BookAdd/bookAdd'
import BookEdit from '../Books/BookEdit/bookEdit'
import LibraryService from "../../repository/libraryRepository";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors: [],
            selectedBook: {}
        }
    }


    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <Routes>
                        <Route path={"/categories"} element={
                            <Categories categories={this.state.categories}/>}/>
                        <Route path={"/books/add"} element={
                            <BookAdd categories={this.state.categories}
                                     author={this.state.authors}
                                     onAddBook={this.addBook}/>}/>
                        <Route path={"/books/edit/:id"} element={
                            <BookEdit categories={this.state.categories}
                                      author={this.state.authors}
                                      onEditBook={this.editBook}
                                      book={this.state.selectedBook}/>}/>
                        <Route path={"/books"} element={
                            <Books books={this.state.books}
                                   onDelete={this.deleteBook}
                                   onEdit={this.getBook}
                                   onAddCopy={this.onAddCopy}
                                   onTakeCopy={this.onTakeCopy}/>}/>
                    </Routes>
                </main>

            </Router>
        );
    }

    componentDidMount() {
        this.loadBooks();
        this.loadAuthors();
        this.loadCategories()
    }

    loadBooks = () => {
        LibraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            })
    }

    loadCategories = () => {
        LibraryService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            });
    }

    loadAuthors = () => {
        LibraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }

    deleteBook = (id) => {
        LibraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    }

    onAddCopy = (id) => {
        console.log("do addcopy u app.js")
        LibraryService.onAddCopy(id)
            .then(() => {
                this.loadBooks();

            });
    }

    onTakeCopy = (id) => {
        LibraryService.onTakeCopy(id)
            .then(() => {
                this.loadBooks();
            });
    }

    addBook = (name, category, author, availableCopies) => {
        LibraryService.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    getBook = (id) => {
        LibraryService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    editBook = (id, name, category, author, availableCopies) => {
        LibraryService.editBook(id, name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

}

export default App;
