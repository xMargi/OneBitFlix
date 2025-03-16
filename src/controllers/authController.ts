import { Request, Response } from "express";
import { userService } from "../services/userService";

export const authController = {
    //POST /auth/register
    register: async (req: Request, res: Response) => {
        const { firstName, lastName, phone, birth, email, password } = req.body

        try {
            const userAlreadyExists = await userService.findUserByEmail(email)

            if (userAlreadyExists) {
                throw new Error('Este e-mail já está cadastrado.')
            }

            const user = await userService.createNewUser({
                firstName,
                lastName,
                phone,
                birth,
                email,
                password,
                role: "user"
            })

            return res.status(201).json(user)

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }

    }
}