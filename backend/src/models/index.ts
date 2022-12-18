import {Sequelize} from "sequelize";

import createDbConfig from "../config/db";
import userModel from "./user";
import roleModel from "./role";
import matchModel from "./match";
import matchUserModel from "./matchUser";
import matchStateModel from "./matchState";
import matchStateUserModel from './matchStateUser'

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
  match: matchModel(sequelize, Sequelize),
  matchUser: matchUserModel(sequelize, Sequelize),
  matchState: matchStateModel(sequelize, Sequelize),
  matchStateUser: matchStateUserModel(sequelize, Sequelize),
  ROLES: ["user", "admin"],
};

db.role.belongsToMany(db.user, {
  through: "userRoles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "userRoles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.match.hasMany(db.matchUser, {
  as: "matchUsers"
})
db.matchUser.belongsTo(db.match);
db.match.hasMany(db.matchState, {
  as: "matchStates"
})
db.matchState.belongsTo(db.match);

db.user.hasMany(db.matchUser, {
  as: "matchUsers"
})
db.matchUser.belongsTo(db.user)

db.matchState.hasMany(db.matchStateUser);
db.matchStateUser.belongsTo(db.matchState);
db.user.hasMany(db.matchStateUser, {
  as: "matchStateUsers"
})
db.matchStateUser.belongsTo(db.user);

export default db;
