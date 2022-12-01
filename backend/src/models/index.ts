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

const user = userModel(sequelize, Sequelize);
const role = roleModel(sequelize, Sequelize);


role.belongsToMany(user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

user.belongsToMany(role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

const db = {
  Sequelize,
  sequelize,
  ROLES: ["user", "admin"],
  user,
  role
};

export default db;
