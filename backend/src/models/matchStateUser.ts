const matchStateUserModel = (sequelize, Sequelize) => sequelize.define(
  "matchStateUser",
  {
    cards: Sequelize.ARRAY(Sequelize.STRING)
  }
);

export default matchStateUserModel;
