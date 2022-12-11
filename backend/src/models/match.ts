const userModel = (sequelize, Sequelize) => sequelize.define(
  "matches",
  {
    host_user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
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

export default userModel;
