import {Sequelize} from "sequelize";

import createDbConfig from "../config/db";
import userModel from "./user";
import roleModel from "./role";


const {
  name: dbName,
  user: dbUser,
  password: dbPassword,
  host: dbHost,
  dialect: dbDialect,
  pool: dbPool,
} = createDbConfig()

const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  {
    host: dbHost,
    dialect: dbDialect,
    pool: dbPool
  }
);

const db = {
  Sequelize,
  sequelize,
  user: userModel(sequelize, Sequelize),
  role: roleModel(sequelize, Sequelize),
  ROLES: ["user", "admin"],
};

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});


export default db;
