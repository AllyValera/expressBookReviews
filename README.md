# 📚 Online Book Review App
This project is the final assignment for the Developing Back-End Apps with Node.js and Express course on Coursera, which is part of the IBM Full Stack Software Developer Professional Certificate. In this project, I have built a server-side online book review application, integrated it with a secure REST API using JWT based session level authentication, and tested the built application using Promises callbacks or Async-Await functions.

***
## 🏡 Features

Register and log in with a username and password

Secure authentication using JWT and session management

Browse a list of books with information including ISBN, title, author, and review

Search for books by ISBN, author, or title

Add, update, or delete a review (only for authenticated users)

Reviews are tied to the user who posted them

## 🚀 Technologies Used
Node.js - A JavaScript runtime environment that allows you to run JavaScript code on the server side, enabling fast and scalable network applications. 

Express - A minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. 

Axios - A promise-based HTTP client for making requests to APIs, supporting async calls and working well with async/await for handling asynchronous operations. 

JWT (jsonwebtoken) - A compact, URL-safe token format used for securely transmitting information between parties as a JSON object, commonly used for authentication. 

## 📬 API Endpoints
| Method | Route                          | Description                                         |
|--------|--------------------------------|-----------------------------------------------------|
| `GET`  | `/`                            | Get the list of all books                          |
| `GET`  | `/isbn/:isbn`                  | Get book details by ISBN                           |
| `GET`  | `/author/:author`              | Get books by author                                |
| `GET`  | `/title/:title`                | Get books by title                                 |
| `POST` | `/auth/register`               | Register a new user (for users only)               |
| `POST` | `/auth/login`                  | Login an existing user (for users only)            |
| `PUT`  | `/auth/review/:isbn`           | Add or modify a review for a book (for users only) |
| `DELETE`| `/auth/review/:isbn`          | Delete a review for a book (for users only)        |

## 📂 Project Setup
Clone the repository:
  `git clone https://github.com/AllyValera/expressBookReviews`
  `cd expressBookReviews`

Install dependencies:
  `npm install`

Run the server:
  `node index.js`

Go to `http://localhost:5000`

*** 

## 🧪 Sample cURL Commands
### Get information for book with ISBN 1
``curl http://localhost:5000/isbn/1``

### Register a user
``curl -X POST http://localhost:5000/register   -H "Content-Type: application/json" -d '{"username":"username123", "password":"password123"}'``

### Login (save cookie for session)
``curl -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -c cookies.txt -d '{"username":"username123", "password":"password123"}'``

### Add a review for book with ISBN 1
``curl -X PUT "http://localhost:5000/customer/auth/review/1?review=This%20book%20is%20amazing" -b cookies.txt``

### Delete a review for book with ISBN 1
``curl -X DELETE http://localhost:5000/customer/auth/review/1 -b cookies.txt``

***

## 📌 Submission Details
This project is stored in a public GitHub repository as part of a peer-reviewed assignment for the course.
