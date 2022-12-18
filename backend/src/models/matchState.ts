const matchStateModel = (sequelize, Sequelize) => sequelize.define(
  "matchState",
  {
    currentMoveUserId: {
      type: Sequelize.INTEGER
    },
    boardCards: {
      type: Sequelize.ARRAY(Sequelize.STRING)      ,
    },
  }
);

export default matchStateModel;
