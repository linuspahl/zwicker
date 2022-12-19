const matchStateModel = (sequelize, Sequelize) => sequelize.define(
  "matchState",
  {
    currentMoveUserId: {
      type: Sequelize.INTEGER
    },
    unplayedCards: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    boardCards: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
  }
);

export default matchStateModel;
