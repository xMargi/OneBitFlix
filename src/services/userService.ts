import { User } from "../models"
import { UserCreationAttributes } from "../models/User"

export const userService = {
    findUserByEmail: async (email: string) => {
        const user = User.findOne({
            where: {email}
        })

        return user
    },

    createNewUser: async(attributes: UserCreationAttributes) => {
        const user = await User.create(attributes)
        return user
    }
}