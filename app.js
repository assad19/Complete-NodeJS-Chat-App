var ejs = require('ejs');
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render("index")
})

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let users = {};
const io = require("socket.io")(server);
io.on("connection", socket => {
  socket.on("new-user-joined", name => {
    console.log(name)
    users[socket.id] = name;
    console.log(users);
    socket.broadcast.emit("user-joined", name);
  })

  socket.on("send", message => {
    socket.broadcast.emit("receive", { message: message, name: users[socket.id] })
  })

  socket.on("disconnect", message => {
    socket.broadcast.emit("left",users[socket.id]);
    delete users[socket.id];
  });

})