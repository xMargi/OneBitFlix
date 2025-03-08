import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";

//relacionamento entre a tabela Course e a Category
Category.hasMany(Course)
Course.belongsTo(Category)

//relacionamento tabela de episodios com os cursos 1:n
Course.hasMany(Episode)
Episode.belongsTo(Course)

export {
    Category,
    Course,
    Episode,
    User
}