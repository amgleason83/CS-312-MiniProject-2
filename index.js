const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const port = 3000;

const categories = ["Any", "Programming", "Misc", "Pun", "Spooky", "Christmas"];

// Configure EJS, static files, and form data.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Display the initial page.
app.get("/", (req, res) => {
  res.render("index", {
    categories,
    selectedCategory: "Any",
    joke: null,
    error: null
  });
});

// Fetch a joke using the category selected in the form.
app.post("/joke", async (req, res) => {
  const selectedCategory = req.body.category;

  if (!categories.includes(selectedCategory)) {
    return res.status(400).render("index", {
      categories,
      selectedCategory: "Any",
      joke: null,
      error: "Please choose a valid category and try again."
    });
  }

  try {
    const response = await axios.get(
      `https://v2.jokeapi.dev/joke/${selectedCategory}`,
      {
        params: { "safe-mode": "" },
        timeout: 10000
      }
    );

    if (response.data.error) {
      throw new Error("The API could not provide a joke.");
    }

    res.render("index", {
      categories,
      selectedCategory,
      joke: response.data,
      error: null
    });
  } catch (error) {
    console.error("Joke request failed:", error.message);

    res.status(502).render("index", {
      categories,
      selectedCategory,
      joke: null,
      error: "Couldn't fetch a joke. Please choose a category and try again."
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});