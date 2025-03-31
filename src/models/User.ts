import { DataTypes, Model, Optional } from "sequelize";
import { database } from "../database";
import bcrypt from "bcrypt";
import { EpisodeInstance } from "./Episode";

// Interface que define a estrutura de um usuário
export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  birth: Date;
  email: string;
  password: string;
  role: "admin" | "user";
}

type CheckPasswordCallback = (err: Error | undefined, isSame: boolean) => void;

export interface UserCreationAttributes extends Optional<IUser, "id"> { }

export interface UserInstance
  extends Model<IUser, UserCreationAttributes>,
  IUser {
    Episodes?: EpisodeInstance[]
    checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void;
}


const UserBase = database.define<UserInstance, UserCreationAttributes>(
  "User",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    birth: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isIn: [["admin", "user"]],
      },
    },
  },
  {
    hooks: {
      beforeSave: async (user) => {
        if (user.isNewRecord || user.changed("password")) {
          user.password = await bcrypt.hash(user.password.toString(), 10);
        }
      },
    },
  }
) as typeof Model & {
  new(): UserInstance;
  prototype: UserInstance;
};


export const User = UserBase;


(User.prototype as UserInstance).checkPassword = function (
  password: string,
  callbackfn: CheckPasswordCallback
) {
  bcrypt.compare(password, this.password, (err, isSame) => {
    if (err) {
      callbackfn(err, false);
    } else {
      callbackfn(err, isSame);
    }
  });
};