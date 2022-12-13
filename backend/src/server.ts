import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import database from "./models";
import authRoute from './routes/auth';
import userRoutes from './routes/user';
import matchRoutes from './routes/match';

const DEFAULT_PORT = 8080;

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// register routes
authRoute(app);
userRoutes(app);
matchRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

if (process.env.CLEAR_DB === '1') {
  const initial = () => {
    database.role.create({
      id: 1,
      name: "user"
    });
  
    database.role.create({
      id: 2,
      name: "admin"
    });
  }
  database.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
  });
}
