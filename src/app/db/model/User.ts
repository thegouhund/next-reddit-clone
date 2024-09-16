import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection"

class User extends Model { username: string | undefined; }

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user',
    },
);


export default User;