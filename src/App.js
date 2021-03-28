import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import book_title_img from './images/Book Title.png';
import author_img from './images/author.png';
import isbn_img from './images/isbn.png';

import SearchbyTitle from './search_fields/SearchbyTitle';
import SearchbyAuthor from './search_fields/SearchbyAuthor';
import SearchbyISBN from './search_fields/SearchbyISBN';

function App() {
  return (
    <Router>

      <div class="App">
        <div className="App_Aside">
          <div className="Text_Display">
            <h1>Thinking about Buying a Book?</h1>
          </div>
          <div className="Text_Display">

            <h2>We've got you.</h2>
            <h3>Let's see the book reviews!</h3>
          </div>
        </div>

        <div className="App_Search">
          <h2>Search by...</h2>
          <div className="SearchOptions">
            <li>
              <Link to="/search_by_title"><img className="ClickableImage" src={book_title_img} alt="clickable image" /> </Link>
              <Link to="/search_by_author"><img className="ClickableImage" src={author_img} alt="clickable image" /> </Link>
              <Link to="/search_by_isbn"><img className="ClickableImage" src={isbn_img} alt="clickable image" /> </Link>
            </li>
          </div>
          <Route path="/search_by_title" component={SearchbyTitle}>
          </Route>
          <Route path="/search_by_author" component={SearchbyAuthor}>
          </Route>
          <Route path="/search_by_isbn" component={SearchbyISBN}>
          </Route>
        </div>
      </div>

    </Router>  
  );
}

export default App;
