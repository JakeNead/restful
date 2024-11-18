const express = require("express");
// const cors = require("cors");
const app = express();
const { v4: uuidv4 } = require("uuid");

let users = {
  1: {
    id: "1",
    username: "Marty Dog",
  },
  2: {
    id: "2",
    username: "Dave Davids",
  },
};

let messages = {
  1: {
    id: "1",
    text: "Hello World",
    userId: "1",
  },
  2: {
    id: "2",
    text: "What up world",
    userId: "2",
  },
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("API works");
});

app.get("/users/:userId", (req, res) => {
  return res.send(users[req.params.userId]);
});

app.post("/messages", (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
  };

  messages[id] = message;

  return res.send(message);
});

app.get("/messages", (req, res) => res.send(messages));

app.get("/messages/:id", (req, res) => {
  const id = req.params.id;
  console.log(`id: ${id}`);
  res.send(messages[id].text);
});

app.delete("/messages/:messageId", (req, res) => {
  const { [req.params.messageId]: message, ...otherMessages } = messages;
  messages = otherMessages;
  return res.send(message);
});

// app.get("/users", (req, res) => {
//   return res.send("GET HTTP method on user resource");
// });

// app.post("/users", (req, res) => {
//   return res.send("POST HTTP method on user resource");
// });

// app.put("/users/:userId", (req, res) => {
//   return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
// });

// app.delete("/users/:userId", (req, res) => {
//   return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
// });

app.listen(3000, () => console.log("server running on port 3000"));
