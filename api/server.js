// BUILD YOUR SERVER HERE

const express = require("express");
const User = require("./users/model");
const server = express();
server.use(express.json());

// create
server.post("/api/users", (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(400).json({
      message: "Please provide name and bio for the user",
    });
  } else {
    User.insert(user)
    .then(createdUser => {
        res.status(201).json(createdUser)
    })
  }
});

// update 

server.put('/hobbits/:id', (req, res) => { // PUT EXISTING HOBBIT
    // the id to update is in `req.params.id` and the desired name in `req.body.name`
    hobbits = hobbits.map(hob => hob.id == req.params.id
      ? { ...hob, name: req.body.name } : hob);
    res.status(200).json(hobbits);
  });

//find all

server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: "eerr",
        stack: err.stack,
      });
    });
});
//by id
server.get("/api/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        message: "eerr",
        stack: err.stack,
      });
    });
});




server.use("*", (req, res) => {
  res.status(404).json({
    message: "not found",
  });
});

module.exports = server;
