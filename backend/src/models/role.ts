const RoleModel = (sequelize, Sequelize) => sequelize.define(
  "roles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  }
);

export default RoleModel;
