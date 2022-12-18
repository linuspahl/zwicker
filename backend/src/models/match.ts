const matchModel = (sequelize, Sequelize) => sequelize.define(
  "matches",
  {
    hostUserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM('lobby', 'running', 'ended')
    }
  }
);

export default matchModel;
