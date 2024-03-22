// BUILD YOUR SERVER HERE

const express = require("express");
const User = require("./users/model");
const server = express();

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
      
      if (!user){
        res.status(404).json({
            message: "The user with the specified ID does not exist", 
        })
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
