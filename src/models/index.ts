import { Category } from "./Category";
import { Course } from "./Course";

//relacionamento entre a tabela Course e a Category
Category.hasMany(Course)

Course.belongsTo(Category)

export {
    Category,
    Course
}