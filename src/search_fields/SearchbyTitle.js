import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const request = require('request')

class SearchbyTitle extends Component {
    constructor(){
        super();
        this.state = {
            book_title: '',
            title: '',
            author: '',
            review: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }

     async execute() {
        const BookReviewUrl = "https://api.nytimes.com/svc/books/v3/reviews.json?api-key=URCKjOTCTbRQOOWF6WxF3abl90TkWz7j&title=" + this.state.book_title

       
        const req  = await request(BookReviewUrl, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            
            console.log(body.results)

            if(body.results.length === 0){
                console.log("Title not available")
                this.setState({submitted: false})
                return
            }
     
            this.setState({
                submitted: true,
                title: body.results[0].book_title, 
                author: body.results[0].book_author, 
                review: body.results[0].url
            })
            
            console.log("Book author: " + body.results[0].book_author)
        });     
    }

    handleChange(e){
        // Select target element 
        let target = e.target;
        let value = target.type == 'checkbox' ? target : target.value;
        let name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(e){
      e.preventDefault();
      console.log('The form was submitted with the following data');
      console.log(this.state);
      this.execute()
    }
    render(){
        return(
            <div className="Search">
                <form onSubmit={this.handleSubmit} className="FormFields">
                    <div className="SearchField">
                        <label className="SearchField_Label" htmlFor="book_title">Title</label>
                        <input type="text" id="book_title" className="SearchField_Input" placeholder="Enter the book title" 
                        name="book_title" value={this.state.book_title} onChange={this.handleChange}/>
                        <button className="SearchField_Button" mr-20>Search</button>
                        <Link to="/" className="Search_Link_Back_To_Menu">Back to the menu</Link>
                    </div>
                </form>
                
                {!!this.state.submitted ? 
                    <div className="Display_Results">
                       <h2>Book Details</h2>
                       <p>Title: {this.state.title}</p>
                       <p>Author: {this.state.author}</p>
                       <p>Review: <a href = {this.state.review}>Review Link</a></p>
                    </div>
                : 
                <h3 className="Quote">"WEAR THE OLD COAT AND BUY THE NEW BOOK." -AUSTIN PHELPS</h3>}
            </div>
        );
    }
}
export default SearchbyTitle;