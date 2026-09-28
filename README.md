# CS-312-MiniProject-2# Laugh Request

A web application that lets users select a category and retrieve
a random joke from JokeAPI.

## Technologies
- Node.js
- Express.js
- Axios
- EJS
- CSS

## Features
- Joke category selection
- Single-line and two-part joke display
- Error messages when API requests fail
- Responsive layout

## Run Locally
Install dependencies:
```bash
npm install
```

Start the server:
```bash
node index.js
```

Open http://localhost:3000 in your browser.
An internet connection is required to retrieve jokes.

## API
https://sv443.net/jokeapi/v2/

The server uses Axios to request a joke from the selected category.
The response is passed to EJS for rendering.