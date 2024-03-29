require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const bodyParser = require('body-parser');
const matchController = require('./controllers/MatchController');
// database connection
connection();

// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

//controllers
app.post('/matches', matchController.createMatch);
app.get('/matches', matchController.getAllMatches);
app.get('/matches/:id', matchController.getMatchById);
app.put('/matches/:id', matchController.updateMatchById);
app.delete('/matches/:id', matchController.deleteMatchById);

const port = process.env.PORT;
app.listen(port, console.log(`Listening on port ${port}...`));