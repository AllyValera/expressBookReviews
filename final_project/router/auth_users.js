// This contains the skeletal implementations for the routes which an authorized user can access.

const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// if it exists in list of registered users
const isValid = (username)=>{ //returns boolean
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });

    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
    // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });

    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

regd_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign(
            { username: username },
            'access',
            { expiresIn: 60 * 60 }
        );
          
        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
  
    if (!review) {
      return res.status(400).json({ message: "Review content is required" });
    }
  
    // Check if the user is logged in with a valid token
    if (req.session.authorization) {
      const token = req.session.authorization['accessToken'];
  
      jwt.verify(token, "access", (err, user) => {
        if (err) {
          return res.status(403).json({ message: "User not authenticated" });
        }
  
        const username = user.username;
  
        if (!books[isbn]) {
          return res.status(404).json({ message: "Book not found" });
        }
  
        // If reviews object doesn't exist for the book, initialize it
        if (!books[isbn].reviews) {
          books[isbn].reviews = {};
        }
  
        // Add or update the review
        books[isbn].reviews[username] = review;
  
        return res.status(200).json({
          message: "Review successfully added/updated",
          reviews: books[isbn].reviews
        });
      });
    } else {
      return res.status(403).json({ message: "User not logged in" });
    }
});  

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
  
    // Ensure the user is logged in and authenticated
    if (req.session.authorization) {
      const token = req.session.authorization['accessToken'];
  
      jwt.verify(token, "access", (err, user) => {
        if (err) {
          return res.status(403).json({ message: "User not authenticated" });
        }
  
        const username = user.username;
  
        if (!books[isbn]) {
          return res.status(404).json({ message: "Book not found" });
        }
  
        const book = books[isbn];
  
        if (!book.reviews[username]) {
          return res.status(404).json({ message: "No review found for this user to delete" });
        }
  
        delete book.reviews[username];
        return res.status(200).json({ message: "Review deleted successfully" });
      });
    } else {
      return res.status(403).json({ message: "User not logged in" });
    }
});  

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;