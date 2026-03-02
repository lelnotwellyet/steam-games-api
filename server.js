const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Root Route
app.get("/", (req, res) => {
  res.json({
    message: "Steam Game Intelligence API is running 🚀",
  });
});

// 🔥 Fetch Top 100 Games (Last 2 Weeks)
app.get("/api/top-games", async (req, res) => {
  try {
    const response = await axios.get(
      "https://steamspy.com/api.php?request=top100in2weeks"
    );

    const games = Object.values(response.data);

    const simplified = games.map(game => ({
      appid: game.appid,
      name: game.name,
      price: game.price / 100,
      owners: game.owners,
      positiveReviews: game.positive,
      negativeReviews: game.negative,
      averagePlaytime: game.average_forever
    }));

    res.json(simplified);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data from SteamSpy" });
  }
});

// 🔎 Filter by Minimum Positive Reviews
app.get("/api/filter", async (req, res) => {
  const minPositive = parseInt(req.query.minPositive) || 10000;

  try {
    const response = await axios.get(
      "https://steamspy.com/api.php?request=top100in2weeks"
    );

    const games = Object.values(response.data);

    const filtered = games
      .filter(game => game.positive >= minPositive)
      .map(game => ({
        name: game.name,
        positiveReviews: game.positive
      }));

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: "Error filtering games" });
  }
});

// 🏆 Top 10 by Positive Reviews
app.get("/api/top-rated", async (req, res) => {
  try {
    const response = await axios.get(
      "https://steamspy.com/api.php?request=top100in2weeks"
    );

    const games = Object.values(response.data);

    const sorted = games
      .sort((a, b) => b.positive - a.positive)
      .slice(0, 10)
      .map(game => ({
        name: game.name,
        positiveReviews: game.positive
      }));

    res.json(sorted);
  } catch (error) {
    res.status(500).json({ message: "Error fetching top rated games" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// 🎮 Get Single Game by App ID
app.get("/api/game/:appid", async (req, res) => {
  const appid = req.params.appid;

  try {
    const response = await axios.get(
      `https://steamspy.com/api.php?request=appdetails&appid=${appid}`
    );

    const game = response.data;

    if (!game || !game.name) {
      return res.status(404).json({ message: "Game not found" });
    }

    const formatted = {
      appid: game.appid,
      name: game.name,
      developer: game.developer,
      publisher: game.publisher,
      price: game.price / 100,
      owners: game.owners,
      positiveReviews: game.positive,
      negativeReviews: game.negative,
      averagePlaytime: game.average_forever,
      genre: game.genre
    };

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Error fetching game details" });
  }
});
// 🔎 Search Game by Name
app.get("/api/search", async (req, res) => {
  const gameName = req.query.name;

  if (!gameName) {
    return res.status(400).json({ message: "Please provide a game name" });
  }

  try {
    let results = [];

    // Loop first 5 pages (you can increase if needed)
    for (let page = 0; page < 5; page++) {
      const response = await axios.get(
        `https://steamspy.com/api.php?request=all&page=${page}`
      );

      const games = response.data;

      for (const appid in games) {
        const game = games[appid];

        if (
          game.name &&
          game.name.toLowerCase().includes(gameName.toLowerCase())
        ) {
          results.push({
            appid: game.appid,
            name: game.name,
            price: game.price / 100,
            positiveReviews: game.positive,
            owners: game.owners
          });
        }

        if (results.length >= 10) break;
      }

      if (results.length >= 10) break;
    }

    res.json(results);

  } catch (error) {
    res.status(500).json({ message: "Error searching game" });
  }
});