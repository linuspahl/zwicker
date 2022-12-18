const matchUserModel = (sequelize, Sequelize) => sequelize.define(
  "matchUser",
  {
    position: Sequelize.INTEGER
  }
);

export default matchUserModel;
