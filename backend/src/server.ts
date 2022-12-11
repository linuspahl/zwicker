import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import database from "./models";

const app = express();
var corsOptions = { origin: process.env.FRONTEND_URL };
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

import authRoute from './routes/auth';
import userRoutes from './routes/user';
import matchRoutes from './routes/match';

const DEFAULT_PORT = 8080;

// register routes
authRoute(app);
userRoutes(app);
matchRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const Role = database.role;

if (process.env.CLEAR_DB === '1') {
  const initial = () => {
    Role.create({
      id: 1,
      name: "user"
    });
  
    Role.create({
      id: 2,
      name: "admin"
    });
  }
  database.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
  });
}
