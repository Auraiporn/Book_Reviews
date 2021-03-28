import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const request = require('request')



class SearchbyAuthor extends Component {
    constructor(){
        super();
        this.state = {
            author: '',
            title: '', 
            review: '', 
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    async execute() {
        const BookReviewUrl = "https://api.nytimes.com/svc/books/v3/reviews.json?api-key=URCKjOTCTbRQOOWF6WxF3abl90TkWz7j&author=" + this.state.author

   
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
                        <label className="SearchField_Label" htmlFor="author">Author</label>
                        <input type="text" id="author" className="SearchField_Input" placeholder="Enter author of the book" 
                        name="author" value={this.state.author} onChange={this.handleChange}/>
                        <button onClick="execute()" className="SearchField_Button" mr-20 >Search</button>
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
                <h3 className="Quote">"BOOKS WERE MY PASS TO PERSONAL FREEDOM." -OPRAH WINFREY</h3>}
            </div>
        );
    }
}
export default SearchbyAuthor;