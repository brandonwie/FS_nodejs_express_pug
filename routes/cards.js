const express = require("express");
const router = express.Router();
// equivalent to const data = require("../data/flashcardData.json").data
const { data } = require("../data/flashcardData.json");
// equivalent to "const cards = data.cards"
const { cards } = data;

router.get("/", (req, res) => {
  const numberOfCards = cards.length;
  const flashcardId = Math.floor(Math.random() * numberOfCards);
  res.redirect(`/cards/${flashcardId}?side=question`);
});

// '/cards' letters can be cut out because the url will start with cards already
// ":id" tells express to treat this part of the URL as a variable OR a route parameter named 'id'
// the value from the route parameter from the URL will be stored in the req object params property
router.get("/:id", (req, res) => {
  // side = req.query.side
  const { side } = req.query;
  // id = req.params.id
  const { id } = req.params;

  if (!side) {
    res.redirect(`/cards/${id}?side=question`);
  }
  const name = req.cookies.username;
  const text = cards[id][side];
  // hint = cards[id].hint
  const { hint } = cards[id];

  const templateData = { text, id, name };

  if (side === "question") {
    templateData.hint = hint;
    templateData.sideToShow = "answer";
    templateData.sideToShowDisplay = "Answer";
  } else if (side === "answer") {
    templateData.sideToShow = "question";
    templateData.sideToShowDisplay = "Question";
  }

  res.render("card", templateData);
});

module.exports = router;
//TODO show hints only when question is activated
