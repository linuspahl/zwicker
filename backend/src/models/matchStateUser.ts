const matchStateUserModel = (sequelize, Sequelize) => sequelize.define(
  "matchStateUser",
  {
    cards: Sequelize.ARRAY(Sequelize.INTEGER)
  }
);

export default matchStateUserModel;
