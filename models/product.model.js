import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 150],
      },
    },
    description: {
      type: DataTypes.TEXT, // long text allowed
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // e.g. 99999999.99
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    stock: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
      userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  },
  {
    tableName: "products",
    timestamps: true, // createdAt, updatedAt
    indexes: [{ fields: ["title"] }],
  }
);

export default Product;
