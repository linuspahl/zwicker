const userModel = (sequelize, Sequelize) => sequelize.define(
  "users",
  {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  }
);

export default userModel;
