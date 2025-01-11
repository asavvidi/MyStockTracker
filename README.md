# Stock Market Tracker App 📈

The Stock Market Tracker is an all-in-one stock application that delivers real-time stock market information through a simple and user-friendly interface.

## Overview

The purpose of this app is to provide a stock market tracking experience in a simple and user-friendly interface. It is built using Node.js, Express, and EJS, and fetches stock data and news from APIs. The app is designed for casual users to interact with real-time stock data and stay informed with the latest financial news.

## Features

- **Search Functionality:** Search input where the users can search stock data for the stock of their choice.
- **Line chart:** Displays daily open and close prices for the selected stock.
- **Detailed Stock Data Table:** Table showing the daily stock details, including open, close, high, and low prices, along with percentage changes.
- **Latest Financial News Section:** A news section where users can stay informed with the latest financial news.

## Technologies Used

- **Node.js:** Backend JavaScript runtime environment.
- **Express:** Web application framework for handling routes and middleware.
- **EJS:** Template engine for rendering dynamic HTML.
- **Axios:** HTTP client for making API requests.
- **HTML/CSS/JavaScript:** Frontend technologies for styling and interactivity.

## Requirements

Ensure you have the following set up:

- [Node.js](https://nodejs.org/) (v16 or higher) installed in your machine.
- Two API keys from [Alpha Vantage](https://www.alphavantage.co/):
  - Claim the API keys at [Alpha Vantage](https://www.alphavantage.co/) to receive your free API keys.
  - These keys will be used to fetch stock data and financial news.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/asavvidi/MyStockTracker.git
cd MyStockTracker
```

2. Install dependencies on the root folder:

```bash
npm install
```

3. Move to the backend folder, install dependencies, create an .env file and set the environmental variables following the .env.example file:

```bash
cd backend
npm install
touch .env
```

4. Move to the frontend folder (from the root folder), install dependencies, create an .env file and set the environmental variables following the .env.example file:

```bash
cd frontend
npm install
touch .env
```

## Start

To run the app, you need to start the backend server and the frontend server.

### Start the backend server

To start the backend server, run the following commands in a terminal:

```bash
cd backend
npm run dev
```

### Start the frontend server

To start the frontend server, run the following commands in a new terminal:

```bash
cd frontend
npm run dev
```

### Access the App

Once both servers are running, open your browser and navigate to:

```arduino
http://localhost:PORT
```

Replace `PORT` with the port number where your frontend server is running (e.g., `3000`).

## Search Stock

To retrieve stock data, enter the **stock symbol** in the input form instead of the company name.

For example:

- To get the latest data for **Apple**, type `AAPL`.
- For **Nvidia**, type `NVDA`.
- For **Amazon**, type `AMZN`.

## License

This project is licensed under the MIT License
