🚀 Steam Game Intelligence API

A RESTful web service built using Node.js and Express that provides analytical insights about games available on the Steam platform.

This API consumes real-time data from the SteamSpy public API, processes the data on the server side, and returns structured JSON responses through multiple endpoints.

The project demonstrates core Web Services concepts including:

External API consumption

RESTful route design

Query parameters

Route parameters

Server-side filtering & sorting

JSON response handling

Cloud deployment using Vercel

🌐 Live API

Base URL:

https://steam-games-api.vercel.app
📌 API Endpoints
1️⃣ Health Check

GET /

Confirms that the API is running.

Example:

https://steam-games-api.vercel.app/
2️⃣ Get Top Trending Games

GET /api/top-games

Returns a list of currently trending Steam games with:

App ID

Name

Price

Owners

Positive Reviews

Negative Reviews

Average Playtime

Example:

https://steam-games-api.vercel.app/api/top-games
3️⃣ Get Top Rated Games

GET /api/top-rated

Returns top 10 games sorted by highest positive reviews.

Example:

https://steam-games-api.vercel.app/api/top-rated
4️⃣ Filter Games by Minimum Positive Reviews

GET /api/filter?minPositive=NUMBER

Query Parameter:

minPositive → Minimum number of positive reviews

Example:

https://steam-games-api.vercel.app/api/filter?minPositive=20000
5️⃣ Get Single Game by App ID

GET /api/game/:appid

Route Parameter:

appid → Steam App ID of the game

Example:

https://steam-games-api.vercel.app/api/game/730
6️⃣ Search Game by Name

GET /api/search?name=GAME_NAME

Query Parameter:

name → Partial or full game name

Example:

https://steam-games-api.vercel.app/api/search?name=among

If a game is not found or is not available on Steam, the API returns an empty array.

🛠️ Tech Stack

Node.js

Express.js

Axios

REST API

JSON

Vercel (Deployment)

🧠 Architecture

Client → Steam Game Intelligence API → SteamSpy API → Process Data → JSON Response

📡 HTTP Method Used

All endpoints use the GET method.

📦 Response Format

All responses are returned in structured JSON format.

📘 Purpose

This project was developed as a Web Services assignment to demonstrate:

API development

External data integration

RESTful architecture

Cloud deployment
