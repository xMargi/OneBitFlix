import { DataTypes, Model, Optional } from "sequelize";
import { database } from "../database";

export interface Category {
    id: number,
    name: string,
    position: number
}

export interface CategoryCreationAttributes extends Optional<Category, 'id'> { }

export interface CategoryInstace extends Model<Category, CategoryCreationAttributes>, Category { }

export const Category = database.define<CategoryInstace, Category>('Category', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      position: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
})