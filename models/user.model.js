import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  userRole: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  timestamps: true,  // createdAt & updatedAt
  tableName: "users" // MySQL table name
});

export default User;
