# Amazon Random Product Generator

A node app that consumes the Amazon Product Advertising API to retrieve random products based on set of filters.

Backend is built with AdonisJS and frontend with React and Material UI.

## Installation

- Create a `.env` file in both the server and client apps (follow `.env.example`).
- Fill in your Amazon API credentials.
- Specify the server's full URL as the client's `REACT_APP_API` and the client's full URL as the server's `CLIENT_ORIGIN`. (Don't worry about the server's DB_* fields).
- Launch the server using `cd server && adonis serve --dev`.
- Launch the client using `cd client && npm start`.

## Known Client Bugs

- There's an odd sideways bounce in the card whenever the country selector is opened

## Known Server Bugs

- Not handling Amazon API errors properly (currently we just keep poking until we've reached a max attempts value)
