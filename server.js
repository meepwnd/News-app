const express = require("express");
const path = require("path")
require('./db/mongoose')
const cors = require('cors')
const newsRouter = require('./routers/news')
const usersRouter = require('./routers/users')

const PORT = process.env.PORT

const app = express();

app.use(express.json())
app.use(cors())
app.use(newsRouter)
app.use(usersRouter)
app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT);

