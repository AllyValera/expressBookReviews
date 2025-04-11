// This contains the skeletal implementations for the routes which a general user can access.

const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register a new user
public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }

    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

/*
const axios = require('axios');

const getBooksPromise = () => {
  axios.get('http://localhost:5000/')
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error.message);
    });
};

getBooksPromise();
*/

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.status(200).send(JSON.stringify(book, null, 4));
  } else {
    return res.status(404).json({ message: "Book not found for the given ISBN" });
  }
});

/*
const axios = require('axios');

const getBookByISBN = (isbn) => {
  axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error.message);
    });
};

getBookByISBN(1);
*/
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let matches = [];

  for (let key in books) {
    if (books[key].author === author) {
      // spread (copy) everything from books[key] into new obj
      matches.push({ isbn: key, ...books[key] });
    }
  }

  if (matches.length > 0) {
    return res.status(200).send(JSON.stringify(matches, null, 4));
  } else {
    return res.status(404).json({ message: "No books found by that author" });
  }
});

/*
onst axios = require('axios');

const getBooksByAuthor = async (author) => {
  try {
    // Encode author name to be URL-safe (e.g., "Chinua Achebe" => "Chinua%20Achebe")
    const encodedAuthor = encodeURIComponent(author);
    const response = await axios.get(`http://localhost:5000/author/${encodedAuthor}`);
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
};

getBooksByAuthor("Chinua Achebe");
*/

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let matches = [];

  for (let key in books) {    
    if (books[key].title === title) {
      // spread (copy) everything from books[key] into new obj
      matches.push({ isbn: key, ...books[key] });
    }
  }

  if (matches.length > 0) {
    return res.status(200).send(JSON.stringify(matches, null, 4));
  } else {
    return res.status(404).json({ message: "No books found with that title" });
  }
});

/*
const axios = require('axios');

const getBooksByTitle = async (title) => {
  try {
    // Encode title to be URL-safe
    const encodedTitle = encodeURIComponent(title);
    const response = await axios.get(`http://localhost:5000/title/${encodedTitle}`);
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
};

getBooksByTitle("Things Fall Apart");
*/

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    const reviews = books[isbn].reviews;
    return res.status(200).send(JSON.stringify(reviews, null, 4));
  } else {
    return res.status(404).json({ message: "Book not found for the given ISBN" });
  }
});

module.exports.general = public_users;
