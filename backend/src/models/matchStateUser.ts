const matchStateUserModel = (sequelize, Sequelize) => sequelize.define(
  "matchStateUser",
  {
    cards: Sequelize.ARRAY(Sequelize.JSONB)
  }
);

export default matchStateUserModel;
