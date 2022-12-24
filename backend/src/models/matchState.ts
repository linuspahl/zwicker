const matchStateModel = (sequelize, Sequelize) => sequelize.define(
  "matchState",
  {
    currentMoveUserId: {
      type: Sequelize.INTEGER
    },
    lastPickUserId: {
      type: Sequelize.INTEGER
    },
    unplayedCards: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    boardCards: {
      type: Sequelize.ARRAY(Sequelize.JSONB),
    },
  }
);

export default matchStateModel;
